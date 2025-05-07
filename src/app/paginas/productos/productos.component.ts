import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos=[]

  Productos: Producto[]=[
    {
      id: 1, 
      nombre: 'Gatete chambeando',
       precio:100, 
       descripcion:'Aún trabajando en la pagina.',
        disponibilidad:true, 
        imagen:'https://thumbs.dreamstime.com/z/retrato-de-um-gato-do-construtor-com-as-ferramentas-nas-patas-na-parede-tijolo-fundo-139925202.jpg',}
  ]

  constructor (private CarritoService: CarritoService){}

  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito :D')
  };
}
