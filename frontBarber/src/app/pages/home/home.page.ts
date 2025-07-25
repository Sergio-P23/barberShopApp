import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonButtons, IonButton,
  IonModal, IonTitle, IonSelect, IonSelectOption, IonItem,
  IonInput, IonIcon, IonGrid, IonCol, IonRow
} from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, mailOutline, lockClosedOutline, chevronBackOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

// Definición de interfaces para mejor tipado (opcional, pero buena práctica)
interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
}

interface Barbero {
  id: number;
  nombre: string;
  foto: string;
}

interface Month {
  value: number;
  name: string;
}

interface Hour {
  value: string; // Ej: "09:00"
  display: string; // Ej: "9:00 AM"
}


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonRow, IonCol, IonGrid,
    IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterModule,
    IonButtons, IonButton, IonModal, IonTitle, IonSelect, IonSelectOption, IonItem, IonInput, IonIcon
  ]
})
export class HomePage implements OnInit {

  // Arreglo para almacenar la información de los servicios
  servicios: Servicio[] = [
    {
      id: 1,
      titulo: 'Corte Clásico',
      descripcion: 'Corte de cabello tradicional para hombre, estilo moderno o clásico.',
      precio: '$20.000 COP',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14SkoSDLCRkxAobxI8Z4YzO1Vis3ik9uwsg&s'
    },
    {
      id: 2,
      titulo: 'Arreglo de Barba',
      descripcion: 'Perfilado y afeitado profesional con toalla caliente y productos de alta calidad.',
      precio: '$15.000 COP',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mYPjDp5GOw3Lotl1LguEiYNN8z9SU2eXaw&s'
    },
    {
      id: 3,
      titulo: 'Tintura de Cabello',
      descripcion: 'Aplicación de color para cubrir canas o cambiar el look, según el estilo deseado.',
      precio: '$50.000 COP',
      imagen: 'https://i.pinimg.com/736x/e8/35/7b/e8357b776553cc13da123651309a83a7.jpg'
    },
    {
      id: 4,
      titulo: 'Diseño de Cejas',
      descripcion: 'Diseño y depilación de cejas para resaltar la mirada masculina.',
      precio: '$15.000 COP',
      imagen: 'https://i.pinimg.com/1200x/05/f0/27/05f0271b699f734621834da08fcf4f6b.jpg'
    },
  ];

  // Arreglo para almacenar la información de los barberos
  barberos: Barbero[] = [
    { id: 1, nombre: 'Pepe', foto: 'https://images.squarespace-cdn.com/content/v1/6221649741ec3a06ecd99f53/1646359598438-K4U2BJH9GLDZ9DO19NX9/_DSC1144+2.jpg?format=1000w' },
    { id: 2, nombre: 'María', foto: 'https://www.elespectador.com/resizer/RyHY-KnNENTkRpmat3fTYn8gHLc=/920x613/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/OMTV66O42RAMZILNY6MVVHCF7E.jpg' },
    { id: 3, nombre: 'Juan', foto: 'https://th.bing.com/th/id/R.133099d40cb1df5f2740591798752e32?rik=BKO6PxHI%2fCanuw&riu=http%3a%2f%2fbarberosbarberias.com%2fassets%2fimg%2fGaleria%2fdani_colombia.webp&ehk=gavSAr7Tg%2bDzCtmKupSpTZG8MtUDqvDjPfUnLluTZk0%3d&risl=&pid=ImgRaw&r=0' },
    { id: 4, nombre: 'Juan 2', foto: 'https://tse1.mm.bing.net/th/id/OIP.2GjjHEG8IvcAPJDx8SYcNwHaEz?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
    // Puedes añadir más barberos aquí
  ];

  // Arreglos para la selección de fecha y hora
  availableYears: number[] = [];
  availableMonths: Month[] = [];
  availableDays: number[] = [];
  availableHours: Hour[] = [];

  isBarberModalOpen: boolean = false;
  isDateTimeModalOpen: boolean = false;
  isInfoModalOpen: boolean = false;

  isAlertSelectBarberModalOpen: boolean = false;
  isAlertSelectDateModalOpen: boolean = false;
  isAlertInfoModalOpen: boolean = false;
  isAlertSuccesModalOpen: boolean = false;


  selectedService: Servicio | null = null;
  selectedBarber: Barbero | null = null; // selectedBarber ahora es un objeto Barbero
  selectedYear: number | null = null; // Cambiado a number para los años
  selectedMonth: number | null = null; // Cambiado a number para los meses
  selectedDay: number | null = null;
  selectedTime: string | null = null;
  customerPhone: string = '';
  customerName: string = '';


  constructor() {
    addIcons({
      personOutline,
      callOutline,
      mailOutline,
      lockClosedOutline,
      chevronBackOutline,
      alertCircleOutline,
      checkmarkCircleOutline
    });
  }

  ngOnInit() {
    this.populateDateTimeOptions();
  }

  // Método para llenar las opciones de años, meses, días y horas
  populateDateTimeOptions() {
    // Años: Actual + próximos 2 años
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.availableYears.push(currentYear + i);
    }

    // Meses
    this.availableMonths = [
      { value: 1, name: 'Enero' }, { value: 2, name: 'Febrero' }, { value: 3, name: 'Marzo' },
      { value: 4, name: 'Abril' }, { value: 5, name: 'Mayo' }, { value: 6, name: 'Junio' },
      { value: 7, name: 'Julio' }, { value: 8, name: 'Agosto' }, { value: 9, name: 'Septiembre' },
      { value: 10, name: 'Octubre' }, { value: 11, name: 'Noviembre' }, { value: 12, name: 'Diciembre' }
    ];

    // Días (por simplicidad, 1-31. En un sistema real se calcularía por mes/año)
    for (let i = 1; i <= 31; i++) {
      this.availableDays.push(i);
    }

    // Horas (ejemplo de 9 AM a 6 PM, cada hora)
    for (let i = 9; i <= 18; i++) {
      const hourValue = `${String(i).padStart(2, '0')}:00`;
      const displayHour = i > 12 ? `${i - 12}:00 PM` : `${i}:00 AM`;
      this.availableHours.push({ value: hourValue, display: displayHour });
    }
  }

  openBookingModal(servicio: Servicio) {
    this.selectedService = servicio;
    console.log('Servicio seleccionado para reservar:', this.selectedService);
    this.isBarberModalOpen = true;
  }

  // --- Lógica del Modal de Barbero ---
  selectBarber(barber: Barbero) { // Ahora recibe un objeto Barbero
    this.selectedBarber = barber;
    console.log('Barbero seleccionado:', this.selectedBarber.nombre);
  }

  confirmBarberSelection() {
    if (this.selectedBarber) {
      this.isBarberModalOpen = false;
      this.isDateTimeModalOpen = true;
    } else {
      this.isAlertSelectBarberModalOpen = true;
    }
  }

  cerrarModal() {
  this.isAlertSelectBarberModalOpen = false;
  this.isAlertSelectDateModalOpen = false;
  this.isAlertInfoModalOpen = false;
}

cerrarModalSucces() {
  this.isAlertSuccesModalOpen = false;
  this.resetBookingProcess(); // Solo limpiamos los datos aquí
}

  cancelBarberSelection() {
    this.isBarberModalOpen = false;
    this.selectedBarber = null;
    this.selectedService = null;
  }

  // --- Lógica del Modal de Fecha y Hora ---
  confirmDateTimeSelection() {
    if (this.selectedYear && this.selectedMonth && this.selectedDay && this.selectedTime) {
      this.isDateTimeModalOpen = false;
      this.isInfoModalOpen = true;
    } else {
      this.isAlertSelectDateModalOpen = true;
    }
  }

  cancelDateTimeSelection() {
    this.isDateTimeModalOpen = false;
    this.selectedYear = null;
    this.selectedMonth = null;
    this.selectedDay = null;
    this.selectedTime = null;
    this.resetBookingProcess();
  }

  // --- Lógica del Modal de Información y Reserva ---
  makeReservation() {
    if (this.customerPhone && this.customerName) {
        console.log('Reserva a enviar:', {
            service: this.selectedService?.titulo,
            barber: this.selectedBarber?.nombre, // Accede al nombre del barbero
            year: this.selectedYear,
            month: this.selectedMonth,
            day: this.selectedDay,
            time: this.selectedTime,
            phone: this.customerPhone,
            name: this.customerName
        });
        this.isAlertSuccesModalOpen = true;
        // alert(`¡Cita para ${this.selectedService?.titulo} con ${this.selectedBarber?.nombre} reservada con éxito! Nos pondremos en contacto contigo.`);
        this.isInfoModalOpen = false;
        // this.resetBookingProcess();
    } else {
        this.isAlertInfoModalOpen = true;
    }
  }

  cancelInfo() {
    this.isInfoModalOpen = false;
    this.resetBookingProcess();
  }

  resetBookingProcess() {
    this.isBarberModalOpen = false;
    this.isDateTimeModalOpen = false;
    this.isInfoModalOpen = false;
    this.selectedService = null;
    this.selectedBarber = null;
    this.selectedYear = null;
    this.selectedMonth = null;
    this.selectedDay = null;
    this.selectedTime = null;
    this.customerPhone = '';
    this.customerName = '';
  }
}