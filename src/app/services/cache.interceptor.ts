import { Injectable } from "@angular/core";
import { Observable, onErrorResumeNext, observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { RequestCacheService } from "./requestCache.service";

const TTL = 900;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor (private cache: RequestCacheService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cachedResponse = this.cache.get(req.url + req.params.toString());
        console.log(`cachedResponse`,cachedResponse);
        
        return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let res
        return next.handle(req).pipe(
            tap( event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(req.url + req.params.toString(), event, TTL);
                }
            } )
        );
    }
}