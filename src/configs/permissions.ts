// Trimmed for the auth-only port. The source file defined ~80 permission
// key constants (one per feature verticals: employees, departments,
// designations, attendance*, leave*, locations*, holidays, roles, audit
// logs, company settings) plus a PERMISSION_KEY_TO_FLAG map and a
// PermissionFlags interface with one boolean per key. None of those
// features were ported, and routePermissions.ts (the only other consumer
// of the PERM_* constants) was dropped along with the private layout's
// permission gating (see src/app/[lang]/(private)/layout.tsx).
//
// What's kept is the generic shape PermissionContext needs: an open
// dictionary of permission-key -> boolean, built from whatever flat
// `permissions` array the backend returns on login/profile. Since the
// ported backend has no role/permission module, that array is always
// empty in practice — this just keeps PermissionContext (a structural
// dependency of the root layout) working without needing to know about
// any specific feature's permission keys.

export type PermissionFlags = Record<string, boolean>;

export function buildPermissionFlags(keys: string[]): PermissionFlags {
  const flags: PermissionFlags = {};
  for (const key of keys) flags[key] = true;
  return flags;
}
