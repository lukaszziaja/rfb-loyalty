import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { User } from './rfb-user.model';
import { UserService } from './rfb-user.service';

@Component({
    selector: 'jhi-rfb-user-detail',
    templateUrl: './rfb-user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnDestroy {

    rfbUser: User;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rfbUserService: UserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsers();
    }

    load(id) {
        this.rfbUserService.find(id).subscribe((rfbUser) => {
            this.rfbUser = rfbUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rfbUserListModification',
            (response) => this.load(this.rfbUser.id)
        );
    }
}
