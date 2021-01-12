import { HttpClient } from '@angular/common/http';

export class HttpService{

    protected host: string = 'http://localhost/api/v2';

    constructor(protected http: HttpClient){
    }

}
