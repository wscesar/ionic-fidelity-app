import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DBService } from '../services/db.service';

import { UiManagerService } from '../services/ui-manager.service';
import { AuthService } from '../services/auth.service';



@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
})
export class AuthPage implements OnInit {

    form: FormGroup;
    authMode = 'login';
    authMode02 = "criar conta"

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.form = new FormGroup({

            email: new FormControl('bbi@bbi.com', {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

            password: new FormControl('combbifood', {
                updateOn: 'blur',
                validators: [Validators.required]
            })

        });
    }

    
    onChangeMode() {
        if ( this.authMode === 'login' ) {
            this.authMode = 'criar conta'
            this.authMode02 = 'login'
        } else {
            this.authMode = 'login'
            this.authMode02 = 'criar conta'
        }
    }
    
    
    onSubmit() {
        let email = this.form.value.email;
        let password = this.form.value.password;

        if ( this.authMode === 'login' ) {
            this.authService.loginWithEmail(email, password)
        } else {
            this.authService.createUser(email, password)
        }
    }

}
