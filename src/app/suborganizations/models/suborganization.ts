/**
 * @author Kent Bull
 */
export interface Suborganization {
    id: number,
    commonName: string,
    categoryName: string,
    description: string,
    organizationId: number
}

export interface SuborganizationAuthorization {
    id: number,
    commonName: string,
    roleName: string,
    categoryName: string,
    description: string,
    organizationName: number,
    organizationId: number
}

export function suborgAuthzToSuborg(auth: SuborganizationAuthorization): Suborganization {
    return {
        id: auth.id,
        categoryName: auth.categoryName,
        commonName: auth.commonName,
        description: auth.description,
        organizationId: auth.organizationId
    }
}