

export interface Attendee {
    personId: number,
    firstName: string,
    lastName: string,
    state: string,
    congressional: number,
    stateHouse: number,
    stateSenate: number,
    countyCouncil: number,
    precinct: string
}


export interface AttendeeList {
    attendees: Attendee[]
}
