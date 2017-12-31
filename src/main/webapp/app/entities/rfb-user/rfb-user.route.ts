import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserComponent } from './rfb-user.component';
import { UserDetailComponent } from './rfb-user-detail.component';
import { UserPopupComponent } from './rfb-user-dialog.component';
import { UserDeletePopupComponent } from './rfb-user-delete-dialog.component';

export const rfbUserRoute: Routes = [
    {
        path: 'rfb-user',
        component: UserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rfb-user/:id',
        component: UserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rfbUserPopupRoute: Routes = [
    {
        path: 'rfb-user-new',
        component: UserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rfb-user/:id/edit',
        component: UserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rfb-user/:id/delete',
        component: UserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
