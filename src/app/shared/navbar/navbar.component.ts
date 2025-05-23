import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { Producto } from '../../modelos/producto.models';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  cantidadProductos: number = 0;
  constructor(private CarritoService: CarritoService){}

  ngOnInit(): void {
    this.CarritoService.carrito$.subscribe((productos: {producto:Producto, cantidad:number}[])=>{
      this.cantidadProductos = productos.reduce((total,item)=>total + item.cantidad,0)
    }) 
  };

  onCarritoClick(){
    console.log("carrito clicked")
  };
}