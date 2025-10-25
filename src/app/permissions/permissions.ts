export interface SystemPermission {
    rolename: string
}
export interface OrganizationPermission {
    roleName: string
}

export interface SuborganizationPermission {
    rolename: string,
    suborganizationId: number,
    suborganizationName: string,
}
export interface Permissions {
    systemPermissions: SystemPermission[],
    organizationPermissions: String[],
    organizationPermissionList: OrganizationPermission[],
    suborganizationPermissions: SuborganizationPermission[]
}

export enum OrgRoleNames {
    ORGANIZATION_ADMINISTRATOR = 'ORGANIZATION_ADMINISTRATOR'
}
