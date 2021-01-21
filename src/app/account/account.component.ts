import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
/**TODO:
 * auth interceptor toevoegen
 * order service toevoegen api
 * order service toevoegen front end
 * /order maken of gewoon dat is /account
 * simpele ui maken
 * error handling for verkeerde gegevens schrijven bij inloggen
 */
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
