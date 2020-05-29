import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Config } from "../shared/config";
import { Dictionary } from "../shared/models/Dictionary";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpService { 
    cfg = Config.Instance.url;
    constructor ( private http: HttpClient ) {
    }
    Server: string = Config.Instance.url;

    public GetRequest(url: string, urlParams: Dictionary<string,string>, headers?: Dictionary<string, string>) {
        let Options = this.GetOptions(headers, urlParams);
        let res: Observable<any> = this.http.get(this.Server + url, Options).pipe(
            retry(3),
            catchError(this.handleError)
        );
        return res
    }

    private GetOptions(headers: Dictionary<string, string>, urlParams: Dictionary<string,string>) {
        let HttpParams: HttpParams = this.getHttpParams(urlParams);
        let Headers = new HttpHeaders({
        });
        if (headers) {
            headers.Foreach(function (key: string, value: string) {
                Headers.set(key, value);
            });
        }
        
        let HttpOptions: any = {};
        HttpOptions.headers = Headers;
        if (HttpParams) HttpOptions.params = HttpParams;
        return HttpOptions;
    }

    private getHttpParams(urlParams: Dictionary<string, string>) {
        if (urlParams && urlParams.Count() > 0) {
            let httpParams = new HttpParams();
            urlParams.Foreach(function (key: string, value: string) {
                httpParams = httpParams.append(key, value);
            });
            return httpParams;
        } else {
            return undefined
        }
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };

}