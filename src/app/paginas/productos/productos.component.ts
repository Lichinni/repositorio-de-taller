import { Component } from '@angular/core';
import { Producto } from '../../modelos/producto.models';
import { CarritoService } from '../../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeseadosService } from '../../servicios/deseados.service';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  Productos: Producto[]=[
    {
      id: 1,
      nombre: 'Gato naranja',
      precio:10,
      descripcion:'Gato naranja. Riesgo de ser naranja',
      disponibilidad:true,
      imagen:'https://i.pinimg.com/originals/3d/ed/44/3ded444e76c612c78ec36e6a176d00cb.jpg'
    },

    {
      id: 2,
      nombre: 'Gato mago',
      precio:250,
      descripcion:'Gato con acceso al conocimiento de los grimorios mas antiguos y arcanos.',
      disponibilidad:true,
      imagen:'https://s3.ifanr.com/wp-content/uploads/2024/10/cat4.jpg'
    },

    {
      id: 3,
      nombre: 'Gato de batalla',
      precio:50,
      descripcion:'Gato basico.',
      disponibilidad:true,
      imagen:'https://www.thebattlecats.com/wp-content/uploads/2021/03/Cat2.jpg'
    },

    {
      id: 4,
      nombre: 'Gato alien',
      precio:666,
      disponibilidad:true,
      descripcion:'Gato alien',
      imagen:'https://th.bing.com/th/id/R.3f599f21902e6e62bcf16e95584d73d9?rik=CgE7jGWuMAzXWw&riu=http%3a%2f%2fimages3.memedroid.com%2fimages%2fUPLOADED847%2f647a974b01cfb.jpeg&ehk=lIrLxhASvYJvZMovsIFgFJJC7QC%2fHgAtiHDekItEXYI%3d&risl=&pid=ImgRaw&r=0'
    },

    {
      id: 5,
      nombre: 'Gato iracundo',
      precio:50,
      descripcion:'En el instante en que el destello de la cámara ilumina la habitación, el gato, que hasta ese momento se encontraba en una postura relajada, se transforma. Su cuerpo, antes flexible y ágil, se tensa como una cuerda a punto de romperse. La cola, erizada y rígida, se agita con furia contenida, mientras sus orejas se aplastan contra su cabeza en una clara señal de irritación. Los ojos, normalmente tranquilos, se abren desmesuradamente, revelando pupilas dilatadas que reflejan una mezcla de sorpresa y desdén. El felino emite un bufido bajo, casi imperceptible, pero cargado de amenaza. Es su manera de advertir que no está dispuesto a tolerar la invasión de su espacio personal. Su postura se vuelve defensiva; el cuerpo se arquea ligeramente, las patas se flexionan, preparándose para un posible salto o huida. Cada músculo está en alerta máxima, listo para reaccionar ante cualquier movimiento. La atmósfera se carga de tensión. El gato, con su mirada fija en el objetivo, parece desafiar al fotógrafo, como si dijera: "¿Acaso no sabes que soy el dueño de este lugar?" Cada clic de la cámara es percibido como una provocación, una intrusión en su mundo. La incomodidad se convierte en enojo, y el enojo en una furia contenida que solo espera el momento adecuado para estallar. Es en este preciso instante cuando el gato decide actuar. Con un movimiento rápido y preciso, se aleja del foco de atención, buscando refugio en un lugar donde la luz no lo alcance, donde su privacidad no sea vulnerada. Su mensaje es claro: No me subestimes. Soy más que una imagen; soy un ser con voluntad propia.',
      disponibilidad:true,
      imagen:'https://i.pinimg.com/originals/b6/be/1f/b6be1f7dde9692dd57419a5ea89a9faa.jpg'
    }
  ]

  constructor (private CarritoService: CarritoService, private DeseadosService:DeseadosService){};


  agregar(producto:Producto){
    this.CarritoService.agregarAlCarrito(producto)
    alert('producto en el carrito (◕‿◕)')
  };

  agregarDeseados(producto:Producto){
    this.DeseadosService.agregarEnDeseados(producto)
  }
}
