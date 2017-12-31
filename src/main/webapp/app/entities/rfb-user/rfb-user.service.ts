import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { User } from './rfb-user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserService {

    private resourceUrl = SERVER_API_URL + 'api/rfb-users';

    constructor(private http: Http) { }

    create(rfbUser: User): Observable<User> {
        const copy = this.convert(rfbUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rfbUser: User): Observable<User> {
        const copy = this.convert(rfbUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<User> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     */
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        return entity;
    }

    /**
     * Convert a User to a JSON which can be sent to the server.
     */
    private convert(rfbUser: User): User {
        const copy: User = Object.assign({}, rfbUser);
        return copy;
    }
}
