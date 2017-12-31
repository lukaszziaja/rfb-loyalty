import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { User } from './rfb-user.model';
import { UserService } from './rfb-user.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rfb-user',
    templateUrl: './rfb-user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
rfbUsers: User[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rfbUserService: UserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rfbUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rfbUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: User) {
        return item.id;
    }
    registerChangeInUsers() {
        this.eventSubscriber = this.eventManager.subscribe('rfbUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
