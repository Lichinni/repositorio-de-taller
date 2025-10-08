import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { DeseadosService } from '../../servicios/deseados.service';

@Component({
  selector: 'app-ofertas',
  imports: [CommonModule, RouterModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

  Productos: Producto[]=[
    {
    id: 1,
    nombre: 'Gato pan',
    precio:120,
    descripcion:'Es un menso, se transformó en un pan por tontin.',
    disponibilidad:true,
    imagen:'https://th.bing.com/th/id/R.2b2358aaf9d1b8787eea0f36b84e866a?rik=PkNRDLylKTQHow&riu=http%3a%2f%2fimages3.memedroid.com%2fimages%2fUPLOADED479%2f63896b9f713bf.jpeg&ehk=E0tXQqHSNI9%2bOB%2fpH%2b423sMgBeCJXkmjkZohsrDeGWg%3d&risl=&pid=ImgRaw&r=0',
    categoria:'',
    marca:''
    },
    {
    id: 2,
    nombre: 'Gato jokeis',
    precio:250,
    descripcion:'Gato que sabe preparar jokeis.',
    disponibilidad:true,
    imagen:'https://th.bing.com/th/id/OIP.vKfHqOm-16bRDg9vonY7qwHaHU?rs=1&pid=ImgDetMain',
    categoria:'',
    marca:''
    },
    {
    id: 3,
    nombre: 'Gato pronto',
    precio:250,
    descripcion:'pronto.',
    disponibilidad:true,
    imagen:'',
    categoria:'',
    marca:''
    },
    {
    id: 4,
    nombre: 'Gato pronto',
    precio:250,
    descripcion:'pronto.',
    disponibilidad:true,
    imagen:'',
    categoria:'',
    marca:''
    },
    {
    id: 5,
    nombre: 'Gato pronto',
    precio:250,
    descripcion:'pronto.',
    disponibilidad:true,
    imagen:'',
    categoria:'',
    marca:''
    }
  ]
 
  constructor (private CarritoService: CarritoService, private DeseadosService:DeseadosService){};
    
    
  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('Producto en el carrito (◕‿◕)')
  };

  agregarDeseados(producto:Producto){
    this.DeseadosService.agregarEnDeseados(producto)
  }
}
