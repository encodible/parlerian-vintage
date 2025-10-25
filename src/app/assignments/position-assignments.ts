export interface PositionAssignmentForm {
    positionId: number,
    positionName: string,
    assigneeVoterId: number,
    assigneePersonId: number,
    suborganizationId: number
    suborganizationName: string,
    assigningPositionAssignmentId: number
    firstName: string,
    middleName: string,
    lastName: string,
    address: string,
    phone: string,
    emailAddress: string,
    notify: boolean
}

export interface PositionAssignmentResult {
    positionId: number,
    positionName: string,
    personId: number,
    firstName: string,
    lastName: string,
    suborganizationId: number,
    suborganizationName: string,
    organizationId: number,
    assignmentStartTimestamp: string,
    assignmentEndTimestamp: string,
    createdBy: string
}

export interface PositionAssignmentUpdate {
    positionAssignmentId: number,
    positionName: string,
    stateVoterId: number,
    suborganizationName: string,
    organizationId: number,
    firstName: string,
    lastName: string,
    address: string,
    houseNumber: number,
    city: string,
    state: string,
    zip: string,
    phone: string,
    email: string,
    stateHouse: number,
    stateSenate: number,
    congressional: number
}
