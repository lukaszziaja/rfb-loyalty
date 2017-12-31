import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from '../../shared';
import {
    UserService,
    UserPopupService,
    UserComponent,
    UserDetailComponent,
    UserDialogComponent,
    UserPopupComponent,
    UserDeletePopupComponent,
    UserDeleteDialogComponent,
    rfbUserRoute,
    rfbUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rfbUserRoute,
    ...rfbUserPopupRoute,
];

@NgModule({
    imports: [
        RfbloyaltySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserComponent,
        UserDetailComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserPopupComponent,
        UserDeletePopupComponent,
    ],
    entryComponents: [
        UserComponent,
        UserDialogComponent,
        UserPopupComponent,
        UserDeleteDialogComponent,
        UserDeletePopupComponent,
    ],
    providers: [
        UserService,
        UserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RfbloyaltyUserModule {}
