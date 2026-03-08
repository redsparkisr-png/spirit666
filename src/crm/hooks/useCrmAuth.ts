import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type CrmRole = "super_admin" | "lead_manager" | "admin";

const TIMEOUT_MS = 8000;
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export const useCrmAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<CrmRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const checkedRef = useRef(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      supabase.auth.signOut();
    }, INACTIVITY_TIMEOUT_MS);
  }, []);

  // Track user activity for auto-logout
  useEffect(() => {
    if (!user) return;
    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetInactivityTimer, { passive: true }));
    resetInactivityTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetInactivityTimer));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [user, resetInactivityTimer]);

  const checkRole = useCallback(async (u: User | null) => {
    if (!u) {
      setUser(null);
      setRole(null);
      setLoading(false);
      return;
    }
    setUser(u);
    try {
      // Check for CRM roles
      const { data: roles, error: rolesErr } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.id);

      if (rolesErr) throw rolesErr;

      const userRoles = roles?.map((r) => r.role) || [];
      if (userRoles.includes("super_admin")) {
        setRole("super_admin");
      } else if (userRoles.includes("lead_manager")) {
        setRole("lead_manager");
      } else if (userRoles.includes("admin")) {
        setRole("admin");
      } else {
        setRole(null);
      }
    } catch (e: any) {
      console.warn("CRM role check failed:", e?.message);
      setRole(null);
      setError("שגיאה באימות הרשאות. נסה שוב.");
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
        setError("הטעינה ארכה זמן רב. נסה שוב.");
      }
    }, TIMEOUT_MS);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (checkedRef.current) {
          checkRole(session?.user ?? null);
        }
      }
    );

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

  const hasCrmAccess = role === "super_admin" || role === "lead_manager" || role === "admin";
  const isSuperAdmin = role === "super_admin";

  return { user, role, hasCrmAccess, isSuperAdmin, loading, error, signOut, retry };
};
