import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { email } from 'src/app/interfaces/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public loginErrorMessage: string;
  private urlAPI= environment.apiURL

  constructor( private http: HttpClient ) { }

  sendContactEmail(formData: email){

    let url = this.urlAPI + "send-email"
    return this.http
    .post<any>(url, formData)
    .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      this.loginErrorMessage = error.error.errors[0];
    }

    // Return an observable with a user-facing error message.
    return throwError(this.loginErrorMessage);
  }
}

