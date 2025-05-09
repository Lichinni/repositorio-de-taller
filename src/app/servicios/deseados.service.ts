import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto.models';

@Injectable({
  providedIn: 'root'
})
export class DeseadosService {

  private deseadosSubject = new BehaviorSubject <{ producto: Producto }[]>([]);
  deseados$ = this.deseadosSubject.asObservable();

  agregarEnDeseados(producto: Producto){
    const deseados = this.deseadosSubject.getValue();
    const encontrado = deseados.find(p => p.producto.id === producto.id);

    if(! encontrado){
      this.deseadosSubject.next([...deseados,{producto}])
    }
  }

  eliminarDeDeseados(productoId:number){
    const productos = this.deseadosSubject.getValue().filter(p => p.producto.id !== productoId)
    this.deseadosSubject.next(productos)
  }


  constructor() { }
}
