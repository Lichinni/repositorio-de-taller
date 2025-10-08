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
      imagen:'https://i.pinimg.com/originals/3d/ed/44/3ded444e76c612c78ec36e6a176d00cb.jpg',
      categoria:'',
      marca:'a'
    },

    {
      id: 2,
      nombre: 'Gato mago',
      precio:250,
      descripcion:'Gato con acceso al conocimiento de los grimorios mas antiguos y arcanos.',
      disponibilidad:true,
      imagen:'https://s3.ifanr.com/wp-content/uploads/2024/10/cat4.jpg',
      categoria:'',
      marca:'a'
    },

    {
      id: 3,
      nombre: 'Gato de batalla',
      precio:50,
      descripcion:'Gato basico.',
      disponibilidad:true,
      imagen:'https://www.thebattlecats.com/wp-content/uploads/2021/03/Cat2.jpg',
      categoria:'',
      marca:'a'
    },

    {
      id: 4,
      nombre: 'Gato alien',
      precio:666,
      disponibilidad:true,
      descripcion:'⏃⌰⟟⟒⋏ ☊⏃⏁, ⎎⍀⍜⋔ ⏃⋏ ⏃⌰⟟⟒⋏ ⌿⌰⏃⋏⟒⏁ ⍙⟟⏁⊑ ⏃⌰⟟⟒⋏ ⌿⟒⍜⌿⌰⟒',
      imagen:'https://th.bing.com/th/id/R.3f599f21902e6e62bcf16e95584d73d9?rik=CgE7jGWuMAzXWw&riu=http%3a%2f%2fimages3.memedroid.com%2fimages%2fUPLOADED847%2f647a974b01cfb.jpeg&ehk=lIrLxhASvYJvZMovsIFgFJJC7QC%2fHgAtiHDekItEXYI%3d&risl=&pid=ImgRaw&r=0',
      categoria:'',
      marca:'a'
    },

    {
      id: 5,
      nombre: 'Gato nojao',
      precio:50,
      descripcion:'ta nojao',
      disponibilidad:true,
      imagen:'https://i.pinimg.com/originals/b6/be/1f/b6be1f7dde9692dd57419a5ea89a9faa.jpg',
      categoria:'',
      marca:'a'
    },

    {
      id: 6,
      nombre: 'Gato expandido',
      precio:750,
      descripcion:'Parece mas una alfombra que un gato',
      disponibilidad:true,
      imagen:'https://steamuserimages-a.akamaihd.net/ugc/1683744853793346621/DE2EA2E616967103C2406687CCF3D98E1F234CA8/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
      categoria:'',
      marca:'a'
    },

    {
      id: 7,
      nombre: 'Gato tipico',
      precio:11,
      descripcion:'Me mintieron la imagen no era un .png',
      disponibilidad:true,
      imagen:'https://w7.pngwing.com/pngs/614/838/png-transparent-cat-kitty-creative-cat-cat.png',
      categoria:'',
      marca:'a'
    },

    {
      id: 8,
      nombre: 'Gato',
      precio:750,
      descripcion:'',
      disponibilidad:true,
      imagen:'',
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