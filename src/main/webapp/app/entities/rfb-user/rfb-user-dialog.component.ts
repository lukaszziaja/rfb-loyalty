import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { User } from './rfb-user.model';
import { UserPopupService } from './rfb-user-popup.service';
import { UserService } from './rfb-user.service';
import { RfbLocation, RfbLocationService } from '../rfb-location';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rfb-user-dialog',
    templateUrl: './rfb-user-dialog.component.html'
})
export class UserDialogComponent implements OnInit {

    rfbUser: User;
    isSaving: boolean;

    homelocations: RfbLocation[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rfbUserService: UserService,
        private rfbLocationService: RfbLocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rfbLocationService
            .query({filter: 'buser-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rfbUser.homeLocationId) {
                    this.homelocations = res.json;
                } else {
                    this.rfbLocationService
                        .find(this.rfbUser.homeLocationId)
                        .subscribe((subRes: RfbLocation) => {
                            this.homelocations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rfbUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rfbUserService.update(this.rfbUser));
        } else {
            this.subscribeToSaveResponse(
                this.rfbUserService.create(this.rfbUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<User>) {
        result.subscribe((res: User) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: User) {
        this.eventManager.broadcast({ name: 'rfbUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRfbLocationById(index: number, item: RfbLocation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rfb-user-popup',
    template: ''
})
export class UserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbUserPopupService: UserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rfbUserPopupService
                    .open(UserDialogComponent as Component, params['id']);
            } else {
                this.rfbUserPopupService
                    .open(UserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
