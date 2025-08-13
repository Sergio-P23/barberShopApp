import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { addIcons } from 'ionicons';
import { menuOutline, logOutOutline, calendarOutline } from 'ionicons/icons';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { ReservaService } from 'src/app/services/reservas/reserva.service';

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
    SideMenuComponent
  ]
})
export class ReservasPage implements OnInit {

  // 🆕 Las reservas ahora son de tipo 'any[]' y se inicializan vacías
  reservas: any[] = [];
  reservasFiltradas: any[] = [];

  // variables control de estado
  mostrarModalBorrar = false;
  reservaSeleccionada: any;
  mostrarModalFecha = false;
  fechaTemporal: string = '';
  fechaFiltro: string = '';

  // rangos calendario
  minDate: string = '2020-01-01';
  maxDate: string = '2030-12-31';

  // 🆕 Inyectamos el servicio en el constructor
  constructor(private reservaService: ReservaService) {
    addIcons({
      menuOutline,
      logOutOutline,
      calendarOutline
    });
  }

  // 🆕 En vez de usar datos de prueba, llamamos a la API
  ngOnInit() {
    this.cargarReservas();
  }

  // 🆕 Método para cargar las reservas desde la API
  cargarReservas(fecha?: string) {
    this.reservaService.GetAllBookings(fecha).subscribe({
      next: (data) => {
        // Asignamos las reservas obtenidas y las copiamos para el filtro
        this.reservas = data;
        this.reservasFiltradas = [...this.reservas];
        console.log('Reservas cargadas:', this.reservas);
      },
      error: (e) => {
        console.error('Error al cargar reservas:', e);
        // Opcionalmente, puedes mostrar un mensaje al usuario
      }
    });
  }

  // 🆕 El método para cancelar ahora usa el servicio para eliminar en el backend
  confirmarCancelacion(reserva: any) {
    this.reservaSeleccionada = reserva;
    this.mostrarModalBorrar = true;
  }

  // 🆕 Modificado para usar el servicio de borrado
  cancelar() {
    if (this.reservaSeleccionada && this.reservaSeleccionada.id) {
      this.reservaService.DeleteBooking(this.reservaSeleccionada.id).subscribe({
        next: () => {
          console.log('Reserva eliminada exitosamente');
          // Volvemos a cargar las reservas para actualizar la lista
          this.cargarReservas();
          this.mostrarModalBorrar = false;
        },
        error: (e) => {
          console.error('Error al eliminar la reserva:', e);
          // Opcionalmente, mostrar un mensaje de error
        }
      });
    }
  }

  abrirModalFecha() {
    this.mostrarModalFecha = true;
  }

  cerrarModalFecha() {
    this.mostrarModalFecha = false;
  }

  // 🆕 Modificado para usar el servicio con el filtro por fecha
  aplicarFiltro() {
    if (this.fechaTemporal) {
      const fechaSeleccionada = new Date(this.fechaTemporal);
      this.fechaFiltro = fechaSeleccionada.toISOString().split('T')[0];
      // 🆕 Llamamos al método de cargar con la fecha filtrada
      this.cargarReservas(this.fechaFiltro);
    }
    this.cerrarModalFecha();
  }

  // 🆕 Modificado para quitar el filtro llamando al método de cargar sin fecha
  quitarFiltro() {
    this.fechaFiltro = '';
    this.fechaTemporal = '';
    // 🆕 Cargamos todas las reservas de nuevo
    this.cargarReservas();
  }

  // Se mantiene esta lógica de filtrado en el cliente para mostrar el mes
  // Pero la API ya puede filtrar por fecha exacta. La mantenemos por si quieres
  // usarla para el caso donde la API no devuelva resultados
  filtrarPorFechaAvanzado(fecha: Date) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    const filtroCompleto = `${año}-${mes}-${dia}`;
    const filtroMes = `${año}-${mes}`;

    const reservasDelDia = this.reservas.filter(r => r.fecha === filtroCompleto);
    if (reservasDelDia.length > 0) {
      this.reservasFiltradas = reservasDelDia;
    } else {
      this.reservasFiltradas = this.reservas.filter(r => r.fecha.startsWith(filtroMes));
    }
  }
}