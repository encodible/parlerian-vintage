/**
 * @author Kent Bull
 */
export interface PositionAssignment {
    personId: number,
    positionId: number,
    positionAssignmentId: number,
    positionName: string,
    assignedSuborganization: string,
    assignedSuborganizationId: number,
    organizationId: number,
    lastName: string,
    firstName: string,
    middleName: string,
    congressional: number,
    stateSenate: number,
    stateHouse: number,
    countyCouncil: number,
    precinct: string,
    startDateTime: string,
    endDateTime: string
    phone: string,
    email: string,
    address: string
}
