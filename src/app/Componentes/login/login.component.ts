import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.username,
        this.password
      );
      console.log('Login exitoso', userCredential.user);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error en login:', error);
      this.errorMessage = this.getFirebaseErrorMessage(error);
    }
  }

  private getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'El usuario no existe.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido.';
      default:
        return 'Error al iniciar sesión. Intente nuevamente.';
    }
  }
}