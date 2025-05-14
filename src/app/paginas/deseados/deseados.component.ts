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
  
  productosEnDeseados:{producto:Producto}[] = [];

  ngOnInit(): void {
    this.DeseadosService.deseados$.subscribe((producto) => {
      this.productosEnDeseados = producto
    })
  };
  
  agregar(producto:Producto, productoId:number){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito (◕‿◕)')
    this.DeseadosService.eliminarDeDeseados(productoId)    
  };
  
  quitarDeseados(productoId:number){
    this.DeseadosService.eliminarDeDeseados(productoId)
    alert('Eliminado de su lista de deseados (◕‿◕)')
  };
}