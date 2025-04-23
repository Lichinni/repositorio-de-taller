import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './paginas/quienes-somos/quienes-somos.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { OfertasComponent } from './paginas/ofertas/ofertas.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';

export const routes: Routes = [
    {path:'', redirectTo:'/inicio', pathMatch:'full'},

    {path:'inicio', component:InicioComponent},
    {path:'contacto', component:ContactoComponent},
    {path:'quiene-somo', component:QuienesSomosComponent},
    {path:'ofertas',component:OfertasComponent},
    {path:'carrito',component:CarritoComponent}

];
