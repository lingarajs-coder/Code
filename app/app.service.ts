import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(public http: HttpClient) {}

    getProducts() {
        return this.http.get('https://ds-ecom.azurewebsites.net/products');
    }

    getMoreDetails(url) {
        return this.http.get(url);
    }   
}