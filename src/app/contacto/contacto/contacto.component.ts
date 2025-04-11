import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms'

@Component({
  selector: 'app-contacto',
  imports: [FormsModule,FormControl,FormGroup],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  usuario = {
    nombre: ''
  }

  miFormulario = new FormGroup{(
    email = new FormControl('')
  )}
}
