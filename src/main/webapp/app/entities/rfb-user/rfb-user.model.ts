import { BaseEntity } from './../../shared';

export class User implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public homeLocationId?: number,
        public rfbEventAttendances?: BaseEntity[],
    ) {
    }
}
