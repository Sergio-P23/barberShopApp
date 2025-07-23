import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, } from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { addIcons } from 'ionicons'; // Importa addIcons
import { menuOutline, logOutOutline, calendarOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  SideMenuComponent]
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
    },
    {
      titulo: 'Corte simple',
      fecha: '2025-09-10',
      nombre: 'Juan Triana',
      telefono: '3001234567',
      barbero: 'Carlos',
      precio: 5000
    },
    {
      titulo: 'Cejas + Depilación',
      fecha: '2025-09-01',
      nombre: 'Sofia Gómez',
      telefono: '3123456789',
      barbero: 'Juan',
      precio: 10000
    },
    {
      titulo: 'Corte + colorizado',
      fecha: '2025-10-03',
      nombre: 'darwin Torres',
      telefono: '3012345678',
      barbero: 'Carlos',
      precio: 35000
    },
    {
      titulo: 'Color + barba',
      fecha: '2025-11-04',
      nombre: 'Julián rodriguez',
      telefono: '3045678910',
      barbero: 'Juan',
      precio: 45000
    }
  ];

  reservasFiltradas = [...this.reservas]; //copia de reservas para filtrar
  //variables control de estado
  mostrarModalBorrar = false;
  reservaSeleccionada: any; //almacena la reserva seleccionada para borrar
  mostrarModalFecha = false;
  fechaTemporal: string = ''; //almacena la fecha seleccionada en el modal de fecha aun sin aplicar filtro
  fechaFiltro: string = ''; //almacena la fecha definitiva para filtrar 

  //rangos calendario
  minDate: string = '2020-01-01'; // Fecha mínima
  maxDate: string = '2030-12-31'; // Fecha máxima


  confirmarCancelacion(reserva: any) {
    this.reservaSeleccionada = reserva;
    this.mostrarModalBorrar = true;
  }

  cancelar() {
    this.reservas = this.reservas.filter(r => r !== this.reservaSeleccionada);

    // 🔁 Vuelve a aplicar el filtro actual
    if (this.fechaFiltro) {
      const fecha = new Date(this.fechaFiltro);
      this.filtrarPorFechaAvanzado(fecha);
    } else {
      this.reservasFiltradas = [...this.reservas]; // si no hay filtro, muestra todas
    }

    this.mostrarModalBorrar = false;
  }

  abrirModalFecha() {
    this.mostrarModalFecha = true;
  }

  cerrarModalFecha() {
    this.mostrarModalFecha = false;
  }

  aplicarFiltro() {
    if (this.fechaTemporal) {
      const fechaSeleccionada = new Date(this.fechaTemporal);
      this.fechaFiltro = fechaSeleccionada.toISOString().split('T')[0];
      this.filtrarPorFechaAvanzado(fechaSeleccionada);
    }
    this.cerrarModalFecha();
  }

  quitarFiltro() {
    this.fechaFiltro = '';
    this.fechaTemporal = '';
    this.reservasFiltradas = [...this.reservas];
  }

  filtrarPorFechaAvanzado(fecha: Date) {
    //extraer datos de fecha: Date
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); //meses en JS van de 0 a 11. padStart asegura que tenga dos dígitos (08 y no 8)
    const dia = String(fecha.getDate()).padStart(2, '0');

    const filtroCompleto = `${año}-${mes}-${dia}`; //filtro completo con año, mes y día
    const filtroMes = `${año}-${mes}`; //filtro solo con año y mes

    const reservasDelDia = this.reservas.filter(r => r.fecha === filtroCompleto);
    if (reservasDelDia.length > 0) {
      this.reservasFiltradas = reservasDelDia;
    } else {
      // Mostrar todas del mes
      this.reservasFiltradas = this.reservas.filter(r => r.fecha.startsWith(filtroMes));
    }
  }



}
