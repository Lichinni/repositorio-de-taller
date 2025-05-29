import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-secreto',
  imports: [],
  templateUrl: './secreto.component.html',
  styleUrl: './secreto.component.css'
})

export class SecretoComponent implements AfterViewInit{
  @ViewChild('miLienzo', { static: false }) lienzo!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.lienzo.nativeElement.getContext('2d');
    if (ctx) {

      ctx.fillStyle = 'red';
      ctx.fillRect(10, 10, 100, 50);
    } else {
      console.error('No se pudo obtener el contexto 2D del canvas.');
    }
  }
}
