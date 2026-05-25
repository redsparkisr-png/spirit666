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
      // Query user_roles directly — single request, policy allows users to read own roles
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.id);
      if (error) throw error;
      const roles = (data ?? []).map((r) => r.role);
      setIsAdmin(roles.includes("admin") || roles.includes("super_admin"));
    } catch (e: any) {
      console.warn("Role check failed:", e?.message ?? e);
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
      setLoading((cur) => {
        if (cur) setError("Loading timed out. Please retry.");
        return false;
      });
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
  }, [checkRole]);

  const signOut = () => supabase.auth.signOut();

  return { user, isAdmin, loading, error, signOut, retry };
};
