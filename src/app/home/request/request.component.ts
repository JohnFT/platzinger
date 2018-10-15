import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.pug',
    styleUrls: ['./request.component.scss']
})
export class RequestComponent {

    public friendEmail: FormControl;
    constructor(public dialogRef: MatDialogRef<RequestComponent>) {
        this.friendEmail = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
    }
    public sendRequest() {

        if (this.friendEmail.invalid) {
            return;
        }

        this.dialogRef.close(this.friendEmail.value);
    }
}
