import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [NgIf, NgClass],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  productos = [
    { nombre: "Producto 1", precio: 100 },
    { nombre: "Producto 1", precio: 150 },
    { nombre: "Producto 1", precio: 200 }
  ]

  usuario = {
    nombre: "jorge",
    activo: true 
  }
}
