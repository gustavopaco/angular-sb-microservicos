import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem("token") !== null) {
      const token = `Bearer ${localStorage.getItem("token")}`

      const cloned = request.clone({
      headers : request.headers.set("Authorization", token)
        // .set("Access-Control-Allow-Origin","*").set("Access-Control-Allow-Headers","*").set("Access-Control-Allow-Methods", "*") /* Habilitar em caso de necessidade*/
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
