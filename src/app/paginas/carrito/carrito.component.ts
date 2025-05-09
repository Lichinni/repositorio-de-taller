import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  productoEnCarrito:{producto:Producto; cantidad:number}[] = [];

  constructor (private carritoService: CarritoService){}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productoEnCarrito = productos
    })
  };

  agregarCantidad(index:number){
    this.productoEnCarrito [index].cantidad++;
  };

  quitarCantidad(index:number){
    if(this.productoEnCarrito[index].cantidad > 1){
        this.productoEnCarrito [index].cantidad--;
    }
  };

  eliminarProducto(productoId:number){
    this.carritoService.eliminarDelCarrito(productoId)
  };


  vaciarCarrito(){
    this.carritoService.vaciarCarrito()
  };

  realizarCompra(){
    alert("COMPRA REALIZADA YYIPIEE")
    this.vaciarCarrito
  };

}
