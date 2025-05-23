import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../modelos/producto.models';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

    private infoSubject = new BehaviorSubject <{ producto: Producto }[]>([]);
    info$ = this.infoSubject.asObservable();

    mostrarInfo(producto: Producto){
      const info = this.infoSubject.getValue();

      const encontrado = info.find(p => p.producto.id === producto.id);

      if(!encontrado){
        this.infoSubject.next([...info,{producto}])
      }
    }
}
