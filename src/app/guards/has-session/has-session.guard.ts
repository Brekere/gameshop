import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasSessionGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

      const isLogged = localStorage.getItem('isLogged');
      console.log(isLogged);

      if(isLogged) {
        return true;
      } else {
        this.router.navigate(['/', 'module-auth', 'login']);
        return false;
      }
      
  }
}

