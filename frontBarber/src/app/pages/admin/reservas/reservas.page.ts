import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, } from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { addIcons } from 'ionicons'; // Importa addIcons
import { menuOutline, logOutOutline, calendarOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,]
})
export class ReservasPage implements OnInit {

  constructor() {
    addIcons({
      menuOutline, // Icono de hamburguesa
      logOutOutline,
      calendarOutline
    });
  }

  ngOnInit() {
  }

  reservas = [
    {
      titulo: 'Corte Clásico',
      fecha: '2025-07-01',
      nombre: 'Pedro Gómez',
      telefono: '3001234567',
      barbero: 'Carlos',
      precio: 25000
    },
    {
      titulo: 'Cejas',
      fecha: '2025-08-01',
      nombre: 'Laura Ríos',
      telefono: '3123456789',
      barbero: 'Juan',
      precio: 10000
    },
    {
      titulo: 'Corte + Barba',
      fecha: '2025-08-03',
      nombre: 'David Torres',
      telefono: '3012345678',
      barbero: 'Carlos',
      precio: 35000
    },
    {
      titulo: 'Color',
      fecha: '2025-08-04',
      nombre: 'Julián Ortega',
      telefono: '3045678910',
      barbero: 'Juan',
      precio: 45000
    }
  ];

  reservasFiltradas = [...this.reservas]; // inicializa con todas
  // fechaFiltro: string = '';
  mostrarModalBorrar = false;
  reservaSeleccionada: any;

  minDate: string = '2020-01-01'; // Fecha mínima
  maxDate: string = '2030-12-31'; // Fecha máxima


   confirmarCancelacion(reserva: any) {
    this.reservaSeleccionada = reserva;
    this.mostrarModalBorrar = true;
  }

  cancelar() {
    this.reservas = this.reservas.filter(r => r !== this.reservaSeleccionada);
    this.filtrarPorFecha(); // volver a aplicar el filtro
    this.mostrarModalBorrar = false;
  }

  // filtrarPorFecha() {
  //   console.log('Fecha seleccionada:', this.fechaFiltro); // Para debug

  //   if (this.fechaFiltro) {
  //     const fechaSeleccionada = new Date(this.fechaFiltro);
  //     const fechaStr = fechaSeleccionada.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  //     this.reservasFiltradas = this.reservas.filter(r => r.fecha === fechaStr);
  //   } else {
  //     this.reservasFiltradas = [...this.reservas];
  //   }
  // }



  mostrarModalFecha = false;
fechaTemporal: string = '';
fechaFiltro: string = '';

abrirModalFecha() {
  this.mostrarModalFecha = true;
}

cerrarModalFecha() {
  this.mostrarModalFecha = false;
}

aplicarFiltro() {
  this.fechaFiltro = this.fechaTemporal;
  this.filtrarPorFecha();
  this.cerrarModalFecha();
}

filtrarPorFecha() {
  if (this.fechaFiltro) {
    const fechaStr = new Date(this.fechaFiltro).toISOString().split('T')[0];
    this.reservasFiltradas = this.reservas.filter(r => r.fecha === fechaStr);
  } else {
    this.reservasFiltradas = [...this.reservas];
  }
}

 

}
