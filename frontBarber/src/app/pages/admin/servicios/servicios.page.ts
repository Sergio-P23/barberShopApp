import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ServiciosPage implements OnInit {
   servicios = [
    { id: 1, titulo: 'Corte Clásico', descripcion: 'Corte de cabello tradicional.' },
    { id: 2, titulo: 'Corte con Diseño', descripcion: 'Incluye diseño personalizado.' }
  ];

  servicioSeleccionado: any;
  mostrarAlerta = false;

  confirmarBorrado(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.mostrarAlerta = true;
  }

  borrar() {
    this.servicios = this.servicios.filter(s => s !== this.servicioSeleccionado);
    this.mostrarAlerta = false;
  }

  editar(servicio: any) {
    // Lógica de edición
    console.log('Editar', servicio);
  }

  crear() {
    // Lógica de creación
    console.log('Crear servicio');
  }

  constructor() { }

  ngOnInit() {
  }

}
