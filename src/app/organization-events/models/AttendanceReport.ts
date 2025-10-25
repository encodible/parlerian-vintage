/**
 * @author Kent Bull
 */
import {Attendee} from './Attendee';

export interface AttendanceReport {
    attendees: Attendee[],
    count: number,
    organizationEventId: number,
    eventName: string
}
