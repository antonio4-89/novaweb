import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, User, user } from '@angular/fire/auth';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return user(this.auth).pipe(
      take(1), // Toma el primer valor y completa la suscripción
      map((user: User | null) => {
        if (user) {
          console.log('Acceso permitido: usuario autenticado');
          return true;
        } else {
          console.log('Acceso denegado: redirigiendo a /sign-in');
          this.router.navigate(['/sign-in']);
          return false;
        }
      })
    );
  }
}