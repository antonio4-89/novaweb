import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "@angular/fire/auth";

export interface User {
    email: string;
    password: string;
  }

@Injectable({ providedIn: 'root' })

export class AuthService{

    constructor( private auth: Auth ){}

    signIn(user: User){
        return signInWithEmailAndPassword(this.auth, user.email, user.password)
      }
    signUp(user: User){
        return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      }

      async resetPassword(email: string): Promise<void> {
        try {
          await sendPasswordResetEmail(this.auth, email);
          console.log('Correo de restablecimiento enviado.');
        } catch (error) {
          console.error('Error al enviar el correo:', error);
          throw error; // Puedes manejar el error en el componente.
        }
      }

}