import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class  RegisterComponent {

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: ''
  };

  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar(): void {

    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    this.authService.register(this.nuevoUsuario).subscribe({

      next: () => {
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error('Error en el registro', err);
        this.error = 'Error al registrar el usuario.';
      }
    });
  }
}