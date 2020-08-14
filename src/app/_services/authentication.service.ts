import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models';
import {FirstTokenInfo} from '../_models/firstTokenInfo.model';
import {B2cResponse} from '../_models/b2cResponse.model';
import {Roles} from '../_models/roles.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentTokenResponse: Observable<FirstTokenInfo>;
    public currentB2cResponse: Observable<B2cResponse>;
    tokenResponse = new FirstTokenInfo();
    b2cResponse = new B2cResponse();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:4000/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('tokenResponse', JSON.stringify(user));

                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    linkingLogin() {

        // let headers = new HttpHeaders();
        // headers = headers
        //     .set('Access-Control-Allow-Origin', '*');
        //
        // // this.tokenResponse.Key = '5f33f596e34806431a7843e5';
        // this.tokenResponse.Secret = 'NWYzM2Y1OTZlMzQ4MDY0MzFhNzg0M2U0';
            const body = {
            // 'key': this.tokenResponse.Key,
            // 'secret': this.tokenResponse.Secret
                "UserId": "424f2262-1ef9-4f40-83e6-126ebbb0e909",
                "Password": ""
                // '__RequestVerificationToken': 'CfDJ8CpCa4gtrGNHkDQi53lIBLj3lW9LIkGphmRrRiGvqoLszuAnW0BywbWGAFWCwsYlPYT_bkBPuloaMzX9sPBU5xeqraeJomYL46L27cEoXrjuuYUdMuDsJg3bjGZDRfd8yyDBGGmM6RtyOHeqwchXcRk'
                // '__RequestVerificationToken': ''
        };
        return this.http.post<any>(`https://60fe65f86d13.ngrok.io/account/login`, body)
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                // if (response && response.access_token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     // localStorage.setItem('currentUser', JSON.stringify(user));
                //     localStorage.setItem('currentB2cResponse', JSON.stringify(response));
                //     // this.currentUserSubject.next(user);
                // }
                // return user;
                // this.queryForCreds(user);
                // this.tokenResponse. = response;
                // this.b2cResponse = response;
                this.b2cResponse.access_token = 'eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…VgRfrXU7HIAO-DU6G-NTrlzb2TqBVr8TQn57XK__5YlPIC9VA';
                this.b2cResponse.refresh_token = 'Azzn43hlotlVLQPHsewUt8cMY8ME+y5+TK2QZtV1PvE=';
                return this.b2cResponse;

            }));
    }

    getRoles() {
            return this.http.get<Roles>(`https://9bc8690153ec.ngrok.io/`)
                .pipe(
                    // catchError(this.errorHandler.handleError)
                    (map(response => {
                        if (response && response.tenantId) {
                            console.log(response);
                        }
                    })));

    }

    queryForCreds(response: B2cResponse) {

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json, charset=utf8, odata=verbose')
    .set('Accept', 'application/json, odata=verbose, charset=utf-8');

        const body = {
            'refresh_token': response.refresh_token,
            'access_token': response.access_token
        };

        // const body = {
        //     "access_token": "eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1cm46ZG1zOnN5c3RlbTphcGljbGllbnQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMzNmNTk2ZTM0ODA2NDMxYTc4NDNlNSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJGcm9udGVuZEFwcENsaWVudCIsIm5iZiI6MTU5NzI5NjIyOCwiZXhwIjoxNTk3Mjk5ODI4fQ.c_LTJ7G3alKVZc917ompMfDbmTB2WtNUa4bWUfo9POSu0XVMfC5O0D7-QIFavsu0a-_QYW6s7dz6bBzQldtWxIYwXBj20tdwhiGUBq3leR9qc6omafEvjdGAQywUKRRrzDCgMJrdx3UqkHGLF6c0R9KYGf5Ah6VZoFxsMNbCy-YYXO_lL8VWxE2jcS0T4-NUHMz5X9U3PdE3y0cDD_fbi5PJlGT_CO0gAYfTTycEBB2MS_qmFJGTFKZEt86zMBVNzE7QngABC3qnRmXOnfPyv2KbALS9rYOEFBnjppBKnhuIFIVDiXaBu6U-R2_sGy9EgoaAL70iXLaFO8eaKhA2-Q",
        //     "refresh_token": "2P8V55jOUKsLiMQGB1KsQDY+bXwJkkr2YiOb4aSRKSk="
        // }
        // console.log('body');
        // console.log(body);
        return this.http.post<any>(`https://60fe65f86d13.ngrok.io/Token/Refresh`, body )
            .pipe(map(x => {
                console.log('next step');
                console.log(x);
                // login successful if there's a jwt token in the response
                // if (user && user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     // localStorage.setItem('currentUser', JSON.stringify(user));
                //     localStorage.setItem('tokenResponse', JSON.stringify(user));
                //     this.currentUserSubject.next(user);
                // }
                // return user;

            }));

    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
