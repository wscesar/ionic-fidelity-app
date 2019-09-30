import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DBService } from '../services/db.service';
import { AuthService } from './auth.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
})
export class AuthPage implements OnInit {

    form: FormGroup;
    f: NgForm

    constructor(private dbService: DBService) {}

    ngOnInit() {
        this.form = new FormGroup({

            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),

            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })

        });
    }

    log(f: NgForm){
        console.log(f.value.email)
    }
    // onSubmit(email: string, password: string) {
    //     this.dbService.signUp(email, password)
    // }

    onSubmit() {
        this.dbService.signIn(
            this.form.value.email, 
            this.form.value.password
        )
        // .then(
        //     res => {
        //         console.log(res)
        //         // this.dbService.setToken(res.idToken)
        //     },
        //     err => console.log(err)
        // );
    }

}
