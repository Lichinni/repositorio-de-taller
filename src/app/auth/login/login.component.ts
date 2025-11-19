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

export class LoginComponent {
  //datos capturados desde el formulario de login
  usuario = {email:'', password:''};

  ///variables paara mostrar mensajes de error y estado de carga
  error: string | null = null;
  cargando = false;

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  //envia las credenciales al backend e inicia sesion si son validos
  iniciarSesion(){
    this.error = null;
    this.cargando = true;
    this.authService.login(this.usuario).subscribe({
      //se ejecuta cuandop el servidor devuelve una respuesta exitosa
      next : (response : any) => {
        //el backend debe devolver: id, nombre, email, rol y token
        if (response?.token && response?.rol) {
          //guarda el token y rol en el local register
          this.authService.guardarSesion(response.token, response.rol)

          //guarda tambien los datos completos  del usuario
          localStorage.setItem('usuario', JSON. stringify(response));

          //restringe sgun el rool devuelto por el backend
          this.router.navigate([
            response.rol === 'admin' ? '/admin' : '/inicio'
          ])

        } else if (response?.mensaje) { //si el backend devuelve un mensaje de error controlado
          this.error = response.mensaje;

        } else { //si la respuesta no tiene formato esperado
          this.error = 'Respuesta Inesperada del servidor'
        }

        this.cargando = false;
      },

      error : (err : any) => {
        console.error('Error al iniciar sesión:', {
          status: err.status,
          statusText : err.statusText,
          error : err.error,
          url : err.url
        });

        this.error = err.error?.mensaje || 'Credenciales incorrectas o error en el servidor.';
        this.cargando = false;
      }
    })
  }
}
