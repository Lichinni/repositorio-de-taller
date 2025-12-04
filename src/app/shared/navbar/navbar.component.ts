import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { Producto } from '../../modelos/producto.models';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
//   cantidadProductos: number = 0;
//   constructor(private CarritoService: CarritoService){}

//   ngOnInit(): void {
//     this.CarritoService.carrito$.subscribe((productos: {producto:Producto, cantidad:number}[])=>{
//       this.cantidadProductos = productos.reduce((total,item)=>total + item.cantidad,0)
//     }) 
//   };

//   onCarritoClick(){
//     console.log("carrito clicked")
//   };
// }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLinkActive, RouterModule } from '@angular/router';
// import { CarritoService } from '../../servicios/carrito.service';
// import { AuthService } from '../../servicios/auth.service';

// @Component({
//   selector: 'app-nav',
//   standalone: true,
//   imports: [CommonModule, RouterModule, RouterLinkActive],
//   templateUrl: './nav.component.html',
//   styleUrls: ['./nav.component.css']
// })
// export class NavComponent implements OnInit {

  // Número total de productos que se muestran en el icono del carrito.
  // Se calcula dinámicamente sumando las cantidades de los ítems.
  cantidadProductos: number = 0;

  // Estado del modo oscuro, sincronizado con localStorage.
  modoOscuroActivado = false;

  // Información del usuario actualmente autenticado.
  usuario: any = null;

  constructor(
    // Servicio que maneja los datos del carrito y su estado reactivo.
    private carritoService: CarritoService,

    // Servicio de autenticación que permite saber si hay sesión activa,
    // obtener datos del usuario y escuchar eventos de login.
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    // Carga inicial del usuario desde localStorage (si está guardado allí).
    this.usuario = this.authService.getUsuario();

    // Si existe token válido, se carga el carrito desde el backend.
    if (this.authService.isLoggedIn()) {
      this.carritoService.obtenerProductos();
    }

    // Se suscribe al observable carrito$ para escuchar cambios del carrito.
    // Cada vez que cambia, recalcula la cantidad total de productos.
    this.carritoService.carrito$.subscribe({
      next: productos => {
        // Suma todas las cantidades de cada ítem,
        // usando 1 como fallback por si algún item no trae cantidad.
        this.cantidadProductos = productos.reduce(
          (acc, item) => acc + Number(item.cantidad || 1),
          0
        );
      }
    });

    // Si el usuario se loguea después de cargar el componente,
    // se vuelve a obtener el usuario y se recarga el carrito del backend.
    if (this.authService.loginEvent) {
      this.authService.loginEvent.subscribe(() => {
        this.usuario = this.authService.getUsuario();
        this.carritoService.obtenerProductos();
      });
    }
  }

  // Cierra sesión, limpia usuario y cantidad mostrada en el carrito.
  logout() {
    this.authService.logout();
    this.usuario = null;
    this.cantidadProductos = 0;
  }
}
