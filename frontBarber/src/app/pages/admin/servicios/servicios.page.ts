import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [CommonModule,
    IonicModule,
   ]
})
export class ServiciosPage implements OnInit {
    servicios = [
    {
      id: 1,
      titulo: 'Corte Clásico',
      descripcion: 'Corte de cabello tradicional para hombre.'
    },
    {
      id: 2,
      titulo: 'Barba',
      descripcion: 'Perfilado y afeitado profesional.'
    },
    {
      id: 3,
      titulo: 'Color',
      descripcion: 'Aplicación de color según el estilo deseado.'
    }
  ];

  mostrarAlerta = false;
  servicioSeleccionado: any = null;

  // ✅ Este arreglo será asignado dinámicamente antes de abrir el alerta
  botonesAlerta: any[] = [];

  confirmarBorrado(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.botonesAlerta = [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.mostrarAlerta = false;
        }
      },
      {
        text: 'Sí',
        handler: () => {
          this.borrar();
        }
      }
    ];
    this.mostrarAlerta = true;
  }

  borrar() {
    this.servicios = this.servicios.filter(s => s.id !== this.servicioSeleccionado.id);
    this.mostrarAlerta = false;
  }

  editar(servicio: any) {
    console.log('Editar servicio:', servicio);
  }

  crear() {
    const nuevoId = Math.max(...this.servicios.map(s => s.id)) + 1;
    const nuevoServicio = {
      id: nuevoId,
      titulo: 'Nuevo Servicio',
      descripcion: 'Descripción del nuevo servicio.'
    };
    this.servicios.push(nuevoServicio);
  }
  constructor() { }

  ngOnInit() {
  }

}
