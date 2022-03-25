import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
  

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  private commerceURL: string = environment.commerceURL
  private commerceKey: string = environment.commerceKey

  constructor(private http: HttpClient) { }

  listProducts() {
     const options  = {
      headers: {
        "X-Authorization": this.commerceKey
      }
    }
    return this.http.get(this.commerceURL, options);
  }
}
