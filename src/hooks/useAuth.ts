import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const TIMEOUT_MS = 8000;
const isDev = import.meta.env.DEV;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const checkedRef = useRef(false);

  const checkRole = useCallback(async (u: User | null) => {
    if (!u) {
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    setUser(u);
    try {
      // Check for admin OR super_admin role
      const results = await Promise.all([
        supabase.rpc("has_role", { _user_id: u.id, _role: "admin" }),
        supabase.rpc("has_role", { _user_id: u.id, _role: "super_admin" }),
      ]);
      const hasAdmin = results.some(r => !!r.data);
      const hasError = results.find(r => r.error);
      if (hasError?.error) throw hasError.error;
      setIsAdmin(hasAdmin);
    } catch (e: any) {
      if (isDev) console.warn("Role check failed:", e?.message);
      setIsAdmin(false);
      setError("Failed to verify admin role. Please retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    checkedRef.current = false;
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkRole(session?.user ?? null);
    });
  }, [checkRole]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Loading timed out. Please retry.");
      }
    }, TIMEOUT_MS);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (checkedRef.current) {
          // Only handle subsequent auth changes (sign in/out)
          checkRole(session?.user ?? null);
        }
      }
    );

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkedRef.current = true;
      checkRole(session?.user ?? null);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [checkRole, loading]);

  const signOut = () => supabase.auth.signOut();

  return { user, isAdmin, loading, error, signOut, retry };
};
