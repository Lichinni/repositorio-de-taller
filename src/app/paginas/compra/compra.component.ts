import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { jsPDF } from 'jspdf'
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-compra',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  //decclaracion del formulario reactivo para la compraa
  formularioCompra! : FormGroup

  //variable parav almacenar el total de la compra
  total! : number

  //costo fijo de envio
  envio = 5000

  //indicador paara saber si la factura ya fue generada
  facturaGenerada=false

  //objeto que contine la informacion de la factura generada.
  factura:any

  //controla la visibilidad del modal que muestra el pdf.
  mostrarModal=false

  //fuente segura para mostrar el ppdf generado en el iframe (un url sanitizado).
  pdfSrc: SafeResourceUrl | undefined

  constructor(
    private fb:FormBuilder, //formbuilder para crear un formulario activo.
    private carritoService:CarritoService, //servicio para manejar y obtener productos.
    private sanitizer:DomSanitizer //para sanitizar la url del pdf y que angular lo permita mostrar.
  ){}


  //metodo que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    //formulario con los campos requeridos y validadores.
    this.formularioCompra = this.fb.group({
      nombre:['',Validators.required],
      direccion:['',Validators.required],
      correo:['',[Validators.required, Validators.email]],
      telefono:['',Validators.required],
      codigoPostal:['',Validators.required],
      ciudad:['',Validators.required],
      provincia:['',Validators.required],
      metodoPago:['',Validators.required]
    })
  }

  //calcula el total de la compra sumando el subtotal y el costo de envio.
  calcularTotal():number{
    const subtotal = this.carritoService.obtenerTotal(); //obtener subtotal del carrito.
    this.total = subtotal + this.envio;
    return this.total;
  }

  //prepara lafactura para los datos productos, totales y fecha.
  emitirFactura():void{
    const datosCliente = this.formularioCompra.value; //datos ingresados del formulario.
    const productos = this.carritoService.obtenerProductos(); //productos del carrito.
    const totalFinal = this.calcularTotal(); //total calculado con envio.

    //construye el objeto facturqa con toda la info necesaria.
    this.factura = {
      cliente:datosCliente,
      productos:productos,
      envio:this.envio,
      total:totalFinal,
      fecha:new Date()
    };

    //marca que la factura fue generada.
    this.facturaGenerada = true;
  }

  //metodo que se ejecuta al finalizar la compra (click al boton).
  //verifica vaalides del formulario, genera facturas y muestra el pdf.
  finalizarCompra():void{
    if(this.formularioCompra.valid){
      this.emitirFactura(); //crear la factura.
      this.generarPdfModal(); //genera y muestra el pdf modal.
    }else{
      this.formularioCompra.markAllAsTouched(); //marca todos los campos como tocados para marcar errores.
    }
  }


  //genera el pdf con jsPdf y crea la url para mostrar el iframe dentro del modal.
  generarPdfModal():void{
    if(!this.factura){
      return; //si no hay factura, que no haga nada.
    }

    const dot = new jsPDF(); //crea la instancia de jsPdf.

    //agrega titulo y fecha al pdf.
    dot.setFontSize(18)
    dot.text("Factura de compra", 14,20)

    dot.setFontSize(12)
    dot.text(`Fecha: ${this.factura.fecha.toLocaleString()}`,14,30)

    //informacion del cliente.
    dot.text(`Cliente:`,14,40)
    const c = this.factura.cliente
    dot.text(`Nombre: ${c.nombre}`,20,50);
    dot.text(`Dirección: ${c.direccion}`,20,60);
    dot.text(`Correo: ${c.correo}`,20,70);
    dot.text(`Teléfono: ${c.telefono}`,20,80);
    dot.text(`Ciudad: ${c.ciudad}`,20,90);
    dot.text(`Provincia: ${c.provincia}`,20,100);
    dot.text(`Código Postal: ${c.codigoPostal}`,20,110);

    //Listado de productos con cantidad, precio y subtotal.
    let y = 120
    dot.text("Productos:",14,y);

    this.factura.productos.forEach((item:any, index:number) => {
      y += 10
      dot.text(
        `${index+1}, ${item.producto.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.producto.precio.toFixed(2)} - Subtotal: $${(item.producto.precio * item.cantidad).toFixed(2)}`,14,y
      )
    })

    //Costos finales.
    y += 10;
    dot.text(`Costo de envio: ${this.factura.envio.toFixed(2)}`,14,y);
    y += 10;
    dot.text(`Total a pagar: $${this.factura.total.toFixed(2)}`,14,y);

    //Convierte el pdf y genera una URL segura para angular.
    const pdfBlob = dot.output('blob');
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob))

    //Abre el modal que contiene el pdf.
    this.mostrarModal = true;
  }

  //Metodo para cerrar el modal y liberar la url para.
  cerrarModal():void{
    this.mostrarModal = false;
    if(this.pdfSrc){
      //Se renueva la url para liberar recursos.
      URL.revokeObjectURL((this.pdfSrc as any).changinThisBreakApplicationSecurity);
      this.pdfSrc = undefined;
    }
  }
  //Metodo para imprimir el pdf que ersta cargado dentro deliframe visto.
  imprimirPDF():void{
    //Obtener la referencia al elemento del iframe del pdf modificado del id 'pdfIframe'.
    const iframe:HTMLIFrameElement | null = document.getElementById('pdfIframe') as HTMLIFrameElement

    //Verifica que el Iframe exista y tenga un objeto contenWindow valido.
    if(iframe && iframe.contentWindow){
      //Le da foco al iframe para asegurarse que la ventana correcta esta activa para imprimir.
      iframe.contentWindow.focus();
      
      //Llama al metodo print() de la ventana del iframe para abrir la ventana de impresion del navegador.
      iframe.contentWindow.print();
    }
  }
}