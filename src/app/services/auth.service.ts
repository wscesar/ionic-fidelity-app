import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UiManagerService } from './ui-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private uiManager: UiManagerService) { }

    logout() {
        this.afAuth.auth.signOut();
    }

    loginWithGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    loginWithEmail(email: string, password: string) {
        this.afAuth.auth
                .signInWithEmailAndPassword(email, password)
                .then( () => {
                    this.uiManager.navigateTo('/')                        
                })
                .catch(res => {
                    console.log(res.code)
                })

    } 
    
    createUser(email: string, password: string) {
        this.afAuth.auth
                .createUserWithEmailAndPassword(email, password)
                .then( () => {
                    this.uiManager.navigateTo('/')                        
                })
                .catch(res => {
                    console.log(res.code)
                })
    }
}
