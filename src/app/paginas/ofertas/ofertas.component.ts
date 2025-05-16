import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { DeseadosService } from '../../servicios/deseados.service';

@Component({
  selector: 'app-ofertas',
  imports: [CommonModule, RouterModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

  Productos: Producto[]=[
    {
    id: 2,
    nombre: 'Gato mago',
    precio:250,
    descripcion:'Gato con acceso al conocimiento de los grimorios mas antiguos y arcanos.',
    disponibilidad:true,
    imagen:'https://s3.ifanr.com/wp-content/uploads/2024/10/cat4.jpg'
    }
  ]
 
  constructor (private CarritoService: CarritoService, private DeseadosService:DeseadosService){};
    
    
  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('Producto en el carrito (◕‿◕)')
  };

  agregarDeseados(producto:Producto){
    this.DeseadosService.agregarEnDeseados(producto)
  }
}
