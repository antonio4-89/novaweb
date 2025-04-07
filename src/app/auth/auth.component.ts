import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Cambiado de username a email
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa el formulario correctamente';
      return;
    }

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.signIn({ email, password });
      this.router.navigateByUrl('/'); // Redirige a la página principal
    } catch (error: any) {
      console.error('Error de autenticación:', error);
      
      // Manejo específico de errores de Firebase
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'El formato del email es incorrecto';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.errorMessage = 'Email o contraseña incorrectos';
          break;
        case 'auth/too-many-requests':
          this.errorMessage = 'Demasiados intentos. Cuenta temporalmente bloqueada';
          break;
        default:
          this.errorMessage = 'Error al iniciar sesión. Intenta nuevamente';
      }
    }
  }
}