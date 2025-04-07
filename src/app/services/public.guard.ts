import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  private checkAuthStatus(): Observable<boolean> {
    return authState(this.auth).pipe(
      take(1), // Toma el primer estado y completa la suscripción
      tap(user => {
        if (user) {
          this.router.navigate(['/ventas']); // Redirige a ruta privada si está autenticado
        }
      }),
      map(user => !user) // Devuelve `true` si NO hay usuario (acceso permitido)
    );
  }

  canMatch(): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }

  canActivate(): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }
}