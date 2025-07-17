import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonMenuButton, IonModal, IonTitle, IonSelect, IonSelectOption, IonItem, IonInput, IonIcon, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone'; // Importa nuevos componentes Ionic

import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons'; // Importa addIcons
// Importa los iconos necesarios para los botones del header y los inputs del modal
import { personOutline, callOutline, mailOutline, lockClosedOutline, chevronBackOutline, menuOutline } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, 
    IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterModule,
    IonButtons, IonButton, IonMenuButton, IonModal, IonTitle, IonSelect, IonSelectOption, IonItem, IonInput, IonIcon // Añade los componentes importados
  ]
})
export class HomePage implements OnInit {

  isLoggedIn: boolean = false; // Variable booleana para controlar el estado de login

  // Variables para controlar la visibilidad de los modales
  isBarberModalOpen: boolean = false;
  isDateTimeModalOpen: boolean = false;
  isInfoModalOpen: boolean = false;

  // Variables para almacenar selecciones (ejemplo básico, en un caso real usarías más lógica)
  selectedBarber: string | null = null;
  // selectedDate: string | null = null;
  // selectedTime: string | null = null;


  constructor() {
    // Añade los iconos que se usarán en esta página
    addIcons({
      menuOutline, // Icono de hamburguesa
      personOutline,
      callOutline,
      mailOutline,
      lockClosedOutline,
      chevronBackOutline
    });
  }

  ngOnInit() {
    // Aquí puedes simular si el usuario está logeado.
    // En una aplicación real, esto vendría de un servicio de autenticación.
    // Por ahora, lo dejamos en 'false' para ver el comportamiento por defecto.
    // this.isLoggedIn = true; // Descomenta para probar el estado logeado
  }

  // Métodos para manejar los modales

  openBookingModal() {
    if (this.isLoggedIn) {
      this.isBarberModalOpen = true; // Abre el primer modal (selección de barbero)
    } else {
      // Si el usuario no está logeado, podrías redirigirlo a la página de login
      // o mostrar un mensaje. Por ahora, solo alertamos.
      alert('Para agendar una cita, por favor inicia sesión o regístrate.');
      // O redirigir: this.router.navigateByUrl('/auth/login');
    }
  }

  // --- Lógica del Modal de Barbero ---
  selectBarber(barberName: string) {
    // Aquí puedes añadir lógica para resaltar el barbero seleccionado si lo deseas
    // Por ejemplo, usando una variable 'selectedBarber' y aplicando una clase 'selected' en el HTML
    this.selectedBarber = barberName;
    console.log('Barbero seleccionado:', this.selectedBarber);

    // Para aplicar la clase 'selected' dinámicamente en el HTML, puedes usar ngClass:
    // <div class="barber-card" [ngClass]="{'selected': selectedBarber === 'Pepe'}" (click)="selectBarber('Pepe')">
  }

  confirmBarberSelection() {
    if (this.selectedBarber) {
      this.isBarberModalOpen = false; // Cierra el modal de barbero
      this.isDateTimeModalOpen = true; // Abre el modal de fecha y hora
    } else {
      alert('Por favor, selecciona un barbero.');
    }
  }

  cancelBarberSelection() {
    this.isBarberModalOpen = false;
    this.selectedBarber = null; // Reinicia la selección
  }

  // --- Lógica del Modal de Fecha y Hora ---
  confirmDateTimeSelection() {
    // Aquí podrías validar que se hayan seleccionado año, mes, día y hora
    // if (this.selectedYear && this.selectedMonth && this.selectedDay && this.selectedHour) {
      this.isDateTimeModalOpen = false; // Cierra el modal de fecha/hora
      this.isInfoModalOpen = true; // Abre el modal de información final
    // } else {
    //   alert('Por favor, selecciona una fecha y hora válidas.');
    // }
  }

  cancelDateTimeSelection() {
    this.isDateTimeModalOpen = false;
    // Reiniciar selecciones de fecha/hora
  }

  // --- Lógica del Modal de Información y Reserva ---
  makeReservation() {
    // Aquí iría la lógica para enviar la reserva a tu backend
    alert('¡Cita reservada con éxito! Nos pondremos en contacto contigo.');
    this.isInfoModalOpen = false; // Cierra el último modal
    // Reiniciar todos los estados de los modales y selecciones
    this.resetBookingProcess();
  }

  cancelInfo() {
    this.isInfoModalOpen = false;
    this.resetBookingProcess(); // Reinicia todo el proceso
  }

  resetBookingProcess() {
    this.isBarberModalOpen = false;
    this.isDateTimeModalOpen = false;
    this.isInfoModalOpen = false;
    this.selectedBarber = null;
    // Reiniciar otras variables de selección si las tienes
  }
}