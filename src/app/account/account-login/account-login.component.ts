import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Account } from 'src/app/models/account.interface';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    } else {
      // this.authService.login(form.value.email, form.value.password);
      console.log('yes!');
    }
  }
}
