"use client";

import { createContext, useContext, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  buildPermissionFlags,
  type PermissionFlags,
} from "@/configs/permissions";

// ---------------------------------------------------------------------------
// Types
// Permission keys would normally come from the backend login response or
// GET /app/permissions. NOTE: the ported backend does not include a
// role/permission module (see ../../saas-hrms-backend), so `state.auth
// .permissions` will always be an empty array here and every can()/canAny()
// check below resolves to false. This context is kept because it's a cheap,
// structural dependency of the root layout — not because permission-gated
// UI is part of this auth-only port.
// ---------------------------------------------------------------------------
interface PermissionContextValue {
  permissions: string[];
  flags: PermissionFlags;
  can: (key: string) => boolean;
  canAny: (keys: string[]) => boolean;
  canAll: (keys: string[]) => boolean;
}

const PermissionContext = createContext<PermissionContextValue>({
  permissions: [],
  flags: buildPermissionFlags([]),
  can: () => false,
  canAny: () => false,
  canAll: () => false,
});

export function PermissionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const permissions = useSelector(
    (state: RootState) => (state.auth.permissions as string[]) ?? [],
  );

  const permSet = useMemo(() => new Set(permissions), [permissions]);
  const flags = useMemo(() => buildPermissionFlags(permissions), [permissions]);

  const can = useCallback((key: string) => permSet.has(key), [permSet]);

  const canAny = useCallback(
    (keys: string[]) => keys.some((k) => permSet.has(k)),
    [permSet],
  );

  const canAll = useCallback(
    (keys: string[]) => keys.every((k) => permSet.has(k)),
    [permSet],
  );

  return (
    <PermissionContext.Provider
      value={{ permissions, flags, can, canAny, canAll }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  const ctx = useContext(PermissionContext);
  if (!ctx) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return ctx;
}
