import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './paginas/quienes-somos/quienes-somos.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { OfertasComponent } from './paginas/ofertas/ofertas.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { DeseadosComponent } from './paginas/deseados/deseados.component';
import { InfoComponent } from './paginas/info/info.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {path:'', redirectTo:'/inicio', pathMatch:'full'},

    {path:'inicio', component:InicioComponent},
    {path:'contacto', component:ContactoComponent},
    {path:'productos', component:ProductosComponent},
    {path:'quienes-somos', component:QuienesSomosComponent},
    {path:'ofertas',component:OfertasComponent},
    {path:'carrito',component:CarritoComponent},
    {path:'deseados',component:DeseadosComponent},
    {path:'info',component:InfoComponent},
    {path:'compra',component:CompraComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
];