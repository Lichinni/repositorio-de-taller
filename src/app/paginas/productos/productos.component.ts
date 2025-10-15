import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeseadosService } from '../../servicios/deseados.service';
import { InfoService } from '../../servicios/info.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  constructor (private CarritoService: CarritoService, private DeseadosService:DeseadosService, private InfoService: InfoService){};

  
  Productos: Producto[]=[
    {
      id: 1,
      nombre: 'Gato naranja',
      precio:10,
      descripcion:'Gato naranja. Riesgo de ser naranja',
      disponibilidad:true,
      imagen:'gatonaranja.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 2,
      nombre: 'Gato mago',
      precio:250,
      descripcion:'Gato con acceso al conocimiento de los grimorios mas antiguos y arcanos.',
      disponibilidad:true,
      imagen:'gatomago.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 3,
      nombre: 'Gato de batalla',
      precio:50,
      descripcion:'Gato basico.',
      disponibilidad:true,
      imagen:'gatodebatalla.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 4,
      nombre: 'Gato alien',
      precio:666,
      disponibilidad:true,
      descripcion:'⏃⌰⟟⟒⋏ ☊⏃⏁, ⎎⍀⍜⋔ ⏃⋏ ⏃⌰⟟⟒⋏ ⌿⌰⏃⋏⟒⏁ ⍙⟟⏁⊑ ⏃⌰⟟⟒⋏ ⌿⟒⍜⌿⌰⟒',
      imagen:'gatoalien.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 5,
      nombre: 'Gato nojao',
      precio:50,
      descripcion:'ta nojao',
      disponibilidad:true,
      imagen:'fatonojao.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 6,
      nombre: 'Gato aspiradora',
      precio:750,
      descripcion:'Perfecto para limpieza en el hogar.',
      disponibilidad:true,
      imagen:'gatoaspiradora.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 7,
      nombre: 'Gato tipico',
      precio:11,
      descripcion:'Me mintieron la imagen no era un png',
      disponibilidad:true,
      imagen:'gato.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 8,
      nombre: 'Gato',
      precio:750,
      descripcion:'',
      disponibilidad:true,
      imagen:'gatoegipcio.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 9,
      nombre: 'Gato',
      precio:750,
      descripcion:'',
      disponibilidad:true,
      imagen:'',
      categoria:'',
      marca:'a'
    },
  ]

  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito (◕‿◕)')
  };

  agregarDeseados(producto:Producto){
    this.DeseadosService.agregarEnDeseados(producto)
  }

  info(producto:Producto){
    this.InfoService.mostrarInfo(producto)
  }

  searchTerm: string = '';

  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrecio: number | null = null;
  maxPrecio: number | null = null;

  get categories(): string[]{
    return [...new Set(this.Productos.map(p => p.categoria))];
  }

    get marca(): string[]{
    return [...new Set(this.Productos.map(p => p.marca))];
  }

  OnSearch(event:Event): void{
    event.preventDefault();
  }

  resetFilters():void{
    this.searchTerm='';
    this.selectedCategory='';
    this.selectedBrand='';
    this.minPrecio=null;
    this.maxPrecio=null;
  }

  get filteredProducts(): Producto[]{
    return this.Productos.filter(p =>
      (this.searchTerm === '' || p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedCategory === '' || p.categoria === this.selectedCategory) &&
      (this.selectedBrand === '' || p.marca === this.selectedBrand) &&
      (this.minPrecio === null || p.precio >= this.minPrecio) &&
      (this.maxPrecio === null || p.precio <= this.maxPrecio)
    )
  }
}