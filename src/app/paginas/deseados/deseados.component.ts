import { Component } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { DeseadosService } from '../../servicios/deseados.service';
import { Producto } from '../../modelos/producto.models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deseados',
  imports: [CommonModule, RouterModule],
  templateUrl: './deseados.component.html',
  styleUrl: './deseados.component.css'
})
export class DeseadosComponent {

  constructor (private CarritoService: CarritoService, private DeseadosService:DeseadosService){};
  
  productosEnDeseados:{producto:Producto; cantidad:number}[] = [];

  Productos: Producto[]=[]
  
  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito (◕‿◕)')
  };
  
  quitarDeseados(productoId:number){
    this.DeseadosService.eliminarDeDeseados(productoId)
    alert('Guardado en su lista de deseados (◕‿◕)')
  };
}