import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { response } from 'express';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

// export class LoginComponent {
//   //datos capturados desde el formulario de login
//   usuario = {email:'', password:''};

//   ///variables paara mostrar mensajes de error y estado de carga
//   error: string | null = null;
//   cargando = false;

//   constructor(
//     private authService : AuthService,
//     private router : Router
//   ){}

//   //envia las credenciales al backend e inicia sesion si son validos
//   iniciarSesion(){
//     this.error = null;
//     this.cargando = true;
//     this.authService.login(this.usuario).subscribe({
//       //se ejecuta cuando el servidor devuelve una respuesta exitosa
//       next : (response : any) => {
//         //el backend debe devolver: id, nombre, email, rol y token
//         if (response?.token && response?.rol) {
//           //guarda el token y rol en el local register
//           this.authService.guardarSesion(response.token, response.rol)

//           //guarda tambien los datos completos  del usuario
//           localStorage.setItem('usuario', JSON. stringify(response));

//           //restringe segun el rol devuelto por el backend
//           this.router.navigate([
//             response.rol === 'admin' ? '/admin' : '/inicio'
//           ])

//         } else if (response?.mensaje) { //si el backend devuelve un mensaje de error controlado
//           this.error = response.mensaje;

//         } else { //si la respuesta no tiene formato esperado
//           this.error = 'Respuesta Inesperada del servidor'
//         }

//         this.cargando = false;
//       },

//       error : (err : any) => {
//         console.error('Error al iniciar sesión:', {
//           status: err.status,
//           statusText : err.statusText,
//           error : err.error,
//           url : err.url
//         });

//         this.error = err.error?.mensaje || 'Credenciales incorrectas o error en el servidor.';
//         this.cargando = false;
//       }
//     })
//   }
// }


export class LoginComponent {

  // Objeto que almacena las credenciales que el usuario ingresará en el formulario.
  // Se enlaza con ngModel en la plantilla.
  usuario = {
    email: '',
    password: ''
  };

  // Variable para mostrar mensajes de error en la vista.
  error: string = '';

  constructor(
    // Servicio encargado de manejar autenticación y comunicación con el backend.
    private userService: AuthService,

    // Router para redireccionar luego de iniciar sesión.
    private router: Router
  ) {}

  // Método llamado al enviar el formulario de inicio de sesión.
  iniciarSesion(): void {

    // Validación básica: ambos campos deben estar completos.
    if (!this.usuario.email || !this.usuario.password) {
      this.error = 'Por favor ingrese sus credenciales.';
      return;
    }

    // Llama al servicio de autenticación y espera la respuesta del backend.
    this.userService.login(this.usuario).subscribe({

      // Si la petición es exitosa:
      next: (res) => {
        // Limpiamos posibles errores previos.
        this.error = '';

        // Aviso rápido para el usuario (puede reemplazarse por un toast).
        alert('Inicio de sesión exitoso');

        // Redirige a la página de productos.
        this.router.navigate(['/productos']);
      },

      // Si ocurre un error (credenciales incorrectas o fallo del servidor):
      error: (err) => {
        console.error('Error al iniciar sesión', err);

        // Mensaje destinado a mostrarse en la interfaz.
        this.error = 'Credenciales incorrectas o error en el servidor.';
      }
    });
  }
}