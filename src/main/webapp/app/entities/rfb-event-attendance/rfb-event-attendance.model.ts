import {BaseEntity} from '../../shared';
import {RfbEvent} from '../rfb-event';
import {User} from '../../shared';

export class RfbEventAttendance implements BaseEntity {
    constructor(
        public id?: number,
        public attendanceDate?: any,
        public rfbEventDTO?: RfbEvent,
        public userDTO?: User
    ) {
    }
}
