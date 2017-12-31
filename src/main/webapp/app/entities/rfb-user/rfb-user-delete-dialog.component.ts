import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User } from './rfb-user.model';
import { UserPopupService } from './rfb-user-popup.service';
import { UserService } from './rfb-user.service';

@Component({
    selector: 'jhi-rfb-user-delete-dialog',
    templateUrl: './rfb-user-delete-dialog.component.html'
})
export class UserDeleteDialogComponent {

    rfbUser: User;

    constructor(
        private rfbUserService: UserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rfbUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rfbUserListModification',
                content: 'Deleted an rfbUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rfb-user-delete-popup',
    template: ''
})
export class UserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbUserPopupService: UserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rfbUserPopupService
                .open(UserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
