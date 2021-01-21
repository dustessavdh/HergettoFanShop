import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-signup',
  templateUrl: './account-signup.component.html',
  styleUrls: ['./account-signup.component.css']
})
export class AccountSignupComponent implements OnInit {
  errorMessage = '';
  selectedCountry: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm): void {
    const customer = form.value;
    customer.country = this.selectedCountry

    if(customer.invalid) {
      return;
    } else {
      this.authService.createUser(customer);
    }
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country.name
  }
}
