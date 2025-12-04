import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeseadosService } from '../../servicios/deseados.service';
import { InfoService } from '../../servicios/info.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../servicios/product.service';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})

export class ProductosComponent {
  // Lista de productos obtenidos desde el backend.
  productos: Producto[] = [];

  // Estado para mostrar un spinner o mensaje de carga.
  cargando = true;

  // Texto para mostrar un error en la interfaz si algo falla.
  error = '';

  constructor(
    // Servicio encargado de obtener productos desde el backend.
    private productService: ProductService,

    // Servicio responsable de agregar productos al carrito y manejar su estado.
    private carritoService: CarritoService,

    // Servicio encargado de gestionar los productos favoritos del usuario.
    private deseadosService: DeseadosService
  ) {}

  // Método del ciclo de vida, se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.cargarProductos(); // Carga inicial de productos.
  }

  // Solicita al backend la lista completa de productos.
  cargarProductos(): void {
    this.productService.getProducts().subscribe({

      // Si la petición es exitosa:
      next: (res: any) => {
        this.productos = res;    // Se asigna la lista recibida.
        this.cargando = false;   // Finaliza el estado de carga.
      },

      // Si ocurre un error:
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.'; // Mensaje visible al usuario.
        this.cargando = false;
      }
    });
  }

  agregar(producto:Producto){
    this.carritoService.agregarAlCarrito(producto)
    alert('producto en el carrito (◕‿◕)')
  };

  agregarDeseados(producto:Producto){
    this.deseadosService.agregarEnDeseados(producto)
  }

  searchTerm: string = '';

  selectedCategory: string = '';
  selectedBrand: string = '';
  minPrecio: number | null = null;
  maxPrecio: number | null = null;

  get categories(): string[]{
    return [...new Set(this.productos.map(p => p.categoria))];
  }

    get marca(): string[]{
    return [...new Set(this.productos.map(p => p.marca))];
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
    return this.productos.filter(p =>
      (this.searchTerm === '' || p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedCategory === '' || p.categoria === this.selectedCategory) &&
      (this.selectedBrand === '' || p.marca === this.selectedBrand) &&
      (this.minPrecio === null || p.precio >= this.minPrecio) &&
      (this.maxPrecio === null || p.precio <= this.maxPrecio)
    )
  }
}