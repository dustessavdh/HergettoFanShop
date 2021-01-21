import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Account } from 'src/app/models/account.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    } else {
      this.authService.login(form.value.email, form.value.password);
    }
  }
}
