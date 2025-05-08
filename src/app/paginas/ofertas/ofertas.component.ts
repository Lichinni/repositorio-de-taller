import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-ofertas',
  imports: [CommonModule, RouterModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

  Producto: Producto[]=[
    {
      id: 0,
      nombre: 'Gatete chambeando',
      precio:0.01,
      descripcion:'Aún trabajando en la pagina.',
      disponibilidad:true,
      imagen:'https://thumbs.dreamstime.com/z/retrato-de-um-gato-do-construtor-com-as-ferramentas-nas-patas-na-parede-tijolo-fundo-139925202.jpg'
    }
  ]
    
  constructor (private CarritoService: CarritoService){}
    
  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito :D')
  };
}
