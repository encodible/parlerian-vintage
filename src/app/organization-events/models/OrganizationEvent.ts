/**
 * @author Kent Bull
 */
export interface OrganizationEvent {
    id: number,
    name: string,
    description: string,
    start: string,
    end: string
}

export interface EventCreationForm {
    name: string,
    description: string,
    startTime: string,
    endTime: string
}

export interface EventCreationResponse {
    error: string,
    errorMessage: string,
    data: {
        id: number,
        organizationId: number,
        name: string,
        startTime: string,
        endTime: string,
        description: string,
        state: string,
        attendanceCount: number
    }
}


export interface EventList {
    eventList: OrganizationEvent[]
}


export interface EventInfo {
    id: number,
    organizationId: number,
    name: string,
    startTime: string,
    endTime: string,
    description: string,
    state: string,
    attendanceCount: number
}

