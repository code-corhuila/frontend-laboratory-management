import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
//import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';



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
    private afAuth: AngularFireAuth,
    //private afAuth: Auth,
    private firestore: AngularFirestore
  ) {}

  async login() {
    try {
      //1. Autenticar al usuario
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.username,
        this.password
      );
      // const userCredential = await signInWithEmailAndPassword(
      //   this.afAuth,    // Pasas el objeto `Auth`
      //   this.username,  // email
      //   this.password   // password
      // );
      
      // 2. Obtener información del usuario desde Firestore
      const userDoc = await this.firestore.collection('users')
        .doc(userCredential.user?.uid)
        .get()
        .toPromise();

      if (userDoc?.exists) {
        const userData: any = userDoc.data();
        
        // 3. Almacenar datos en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', this.username);
        localStorage.setItem('userRole', userData.role || 'client'); // Valor por defecto si no tiene rol
        
        this.router.navigate(['/dashboard']);
        
        // Puedes mostrar un mensaje de éxito o actualizar la UI aquí
        this.errorMessage = ''; // Limpiar mensajes de error previos
        
      } else {
        throw new Error('Usuario no encontrado en la base de datos');
      }
      
    } catch (error) {
      console.error('Error en login:', error);
      this.errorMessage = this.getFirebaseErrorMessage(error);
      
      // Limpiar localStorage en caso de error
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
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