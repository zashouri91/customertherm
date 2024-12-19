export type Role = 'Admin' | 'Manager' | 'User';

export const roles: Role[] = ['Admin', 'Manager', 'User'];

export const rolePermissions = {
  Admin: {
    canManageUsers: true,
    canGenerateSignatures: true,
    canManageSettings: true,
  },
  Manager: {
    canManageUsers: true,
    canGenerateSignatures: true,
    canManageSettings: false,
  },
  User: {
    canManageUsers: false,
    canGenerateSignatures: true,
    canManageSettings: false,
  },
};
