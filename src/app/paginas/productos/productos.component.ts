import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeseadosService } from '../../servicios/deseados.service';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  Productos: Producto[]=[
    {
      id: 1,
      nombre: 'Gato naranja',
      precio:10,
      descripcion:'Gato naranja. Riesgo de ser naranja',
      disponibilidad:true,
      imagen:'https://i.pinimg.com/originals/3d/ed/44/3ded444e76c612c78ec36e6a176d00cb.jpg'
    },

    {
      id: 2,
      nombre: 'Gato mago',
      precio:250,
      descripcion:'Gato con acceso al conocimiento de los grimorios mas antiguos y arcanos.',
      disponibilidad:true,
      imagen:'https://s3.ifanr.com/wp-content/uploads/2024/10/cat4.jpg'
    },

    {
      id: 3,
      nombre: 'Gato de batalla',
      precio:50,
      descripcion:'Gato basico.',
      disponibilidad:true,
      imagen:'https://www.thebattlecats.com/wp-content/uploads/2021/03/Cat2.jpg'
    },

    {
      id: 4,
      nombre: 'Gato alien',
      precio:666,
      descripcion:'Gato alien.',
      disponibilidad:true,
      imagen:'https://th.bing.com/th/id/R.3f599f21902e6e62bcf16e95584d73d9?rik=CgE7jGWuMAzXWw&riu=http%3a%2f%2fimages3.memedroid.com%2fimages%2fUPLOADED847%2f647a974b01cfb.jpeg&ehk=lIrLxhASvYJvZMovsIFgFJJC7QC%2fHgAtiHDekItEXYI%3d&risl=&pid=ImgRaw&r=0'
    }
  ]

  constructor (private CarritoService: CarritoService, private DeseadosService:DeseadosService){};


  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito (◕‿◕)')
  };

  agregarDeseados(producto:Producto){
    this.DeseadosService.agregarEnDeseados(producto)
    alert('Guardado en su lista de deseados (◕‿◕)')
  }
}
