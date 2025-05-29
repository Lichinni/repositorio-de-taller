import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto.models';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoSubject = new BehaviorSubject <{ producto: Producto; cantidad: number}[]>([]);

  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(producto: Producto){
    const productos = this.carritoSubject.getValue();
    const encontrado = productos.find(p => p.producto.id === producto.id);

    if(encontrado){
      encontrado.cantidad++;
    }else{
      this.carritoSubject.next([...productos,{producto,cantidad:1}])
    }
  }

  eliminarDelCarrito(productoId:number){
    const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId)
    this.carritoSubject.next(productos)
  }

  eliminarTodoElCarrito(){
    this.carritoSubject.next([])
  }

  // metodo para actualizar la cantidad de productos.
  actualizarCantidad(productoId:number, nuevaCantidad:number){
    const productos = this.carritoSubject.getValue().map(item => {
      if(item.producto.id === productoId){
        //retornamos una copia del producto con la nueva cantidad.
        return{...item,cantidad:nuevaCantidad}
      }

      return item

    })

    //emitimos el nuevo estado del carrito.
    this.carritoSubject.next(productos)
  }

  //para obtener los productos del carrito con el arreglo.
  obtenerProductos():{producto:Producto; cantidad:number}[]{
    return this.carritoSubject.getValue();
  }

  //metodo para calcular el totala pagar (precio x cantidad de cada producto).
  obtenerTotal():number{
    const productos = this.carritoSubject.getValue();
    //usamos el "use" para sumar los subtotales de cada producto.
    return productos.reduce((total,item)=> total + item.producto.precio*item.cantidad, 0)
  }

  constructor() { }
}