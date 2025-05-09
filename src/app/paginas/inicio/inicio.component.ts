import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [NgFor],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  producto = [
    { nombre: "gato cara e tonto", precio: 100, info: "esto es un gato tontin", img: "https://thumbs.dreamstime.com/z/mentira-del-gato-39794060.jpg" },
    { nombre: "otro gatotonto", precio: 150, info: "otro gato muy tontin", img: "https://thumbs.dreamstime.com/z/gato-tonto-75110971.jpg" },
    { nombre: "le chat", precio: 200, info: "un francais chat", img: "https://i.redd.it/j1ub9qzg1bb91.png" }
  ]

  usuario = {
    nombre: "jorge",
    activo: true 
  }
}