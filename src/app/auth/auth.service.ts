import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP3Zn7rkATaRdv_oIan2JHcS8YtDfJecc'
    private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP3Zn7rkATaRdv_oIan2JHcS8YtDfJecc'

    constructor ( private http: HttpClient ) {
    }

    signIn( email: string, password: string ) {
        return this.http.post( this.signInUrl, { email, password } )
    }
    
    signUp( email: string, password: string ) {
        // return this.http.post( this.signUpUrl, { email, password } )
        console.log(email, password)
    }
    
}