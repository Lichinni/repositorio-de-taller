import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { privateDecrypt } from 'crypto';
import jspdf from 'jspdf'
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
  }
}
