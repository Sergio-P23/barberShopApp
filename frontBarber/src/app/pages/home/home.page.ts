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

import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { ReservaService } from 'src/app/services/reservas/reserva.service';
import { BarberoService } from '../../services/barberos/barbero.service';



// Definición de interfaces para mejor tipado
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

  // Arreglo para almacenar la información de los servicios (se carga de API)
  servicios: Servicio[] = [];

  // 🆕 Arreglo para almacenar la información de los barberos (se carga de API)
  barberos: Barbero[] = [];

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
  selectedBarber: Barbero | null = null;
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  selectedDay: number | null = null;
  selectedTime: string | null = null;
  customerPhone: string = '';
  customerName: string = '';


  // 🆕 Inyectamos ReservaService
  constructor(
    private servicioService: ServicioService,
    private reservaService: ReservaService,
    private barberoService: BarberoService 
  ) {
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
    this.getAllServices();
    this.getAllBarbers(); // 🆕 Llamamos al método para cargar los barberos al iniciar
  }

  getAllServices() {
    this.servicioService.GetAllServices()
      .subscribe({
        next: res => {
          console.log('✅ servicios OK:', res);
          this.servicios = res;
        },
        error: err => {
          console.error('❌ Error de servicios:', err);
        }
      });
  }

  // 🆕 Nuevo método para cargar los barberos desde la API
  getAllBarbers() {
    this.barberoService.GetAllBarbers()
      .subscribe({
        next: (barbers) => {
          console.log('✅ Barberos cargados OK:', barbers);
          this.barberos = barbers;
        },
        error: (err) => {
          console.error('❌ Error al cargar barberos:', err);
          // Opcionalmente, mantener los barberos de prueba si hay un error
          this.barberos = [
            { id: 1, nombre: 'Pepe', foto: 'https://images.squarespace-cdn.com/content/v1/6221649741ec3a06ecd99f53/1646359598438-K4U2BJH9GLDZ9DO19NX1/_DSC1144+2.jpg?format=1000w' },
            { id: 2, nombre: 'María', foto: 'https://www.elespectador.com/resizer/RyHY-KnNENTkRpmat3fTYn8gHLc=/920x613/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/OMTV66O42RAMZILNY6MVVHCF7E.jpg' },
            { id: 3, nombre: 'Juan', foto: 'https://th.bing.com/th/id/R.133099d40cb1df5f2740591798752e32?rik=BKO6PxHI%2fCanuw&riu=http%3a%2f%2fbarberosbarberias.com%2fassets%2fimg%2fGaleria%2fdani_colombia.webp&ehk=gavSAr7Tg%2bDzCtmKupSpTZG8MtUDqvDjPfUnLluTZk0%3d&risl=&pid=ImgRaw&r=0' },
            { id: 4, nombre: 'Juan 2', foto: 'https://tse1.mm.bing.net/th/id/OIP.2GjjHEG8IvcAPJDx8SYcNwHaEz?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
          ];
        }
      });
  }


  // Método para llenar las opciones de años, meses, días y horas
  populateDateTimeOptions() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.availableYears.push(currentYear + i);
    }

    this.availableMonths = [
      { value: 1, name: 'Enero' }, { value: 2, name: 'Febrero' }, { value: 3, name: 'Marzo' },
      { value: 4, name: 'Abril' }, { value: 5, name: 'Mayo' }, { value: 6, name: 'Junio' },
      { value: 7, name: 'Julio' }, { value: 8, name: 'Agosto' }, { value: 9, name: 'Septiembre' },
      { value: 10, name: 'Octubre' }, { value: 11, name: 'Noviembre' }, { value: 12, name: 'Diciembre' }
    ];

    for (let i = 1; i <= 31; i++) {
      this.availableDays.push(i);
    }

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
  selectBarber(barber: Barbero) {
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

  // 🆕 Modificado para usar el servicio de creación de reservas
  makeReservation() {
    if (this.customerPhone && this.customerName && this.selectedService && this.selectedBarber && this.selectedYear && this.selectedMonth && this.selectedDay && this.selectedTime) {
      const fechaReserva = `${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-${String(this.selectedDay).padStart(2, '0')}`;
      const horaReserva = this.selectedTime;

      const bookingData = {
        nombre_cliente: this.customerName,
        telefono_cliente: this.customerPhone,
        barbero_id: this.selectedBarber.id,
        servicio_id: this.selectedService.id,
        fecha_reserva: fechaReserva,
        hora_reserva: horaReserva
      };

      console.log('Reserva a enviar:', bookingData);

      this.reservaService.CreateBooking(bookingData).subscribe({
        next: (response) => {
          console.log('✅ Reserva creada exitosamente:', response);
          this.isAlertSuccesModalOpen = true;
          this.isInfoModalOpen = false;
          // La limpieza de datos se hace en cerrarModalSucces()
        },
        error: (err) => {
          console.error('❌ Error al crear reserva:', err);
          // Puedes añadir un modal de error aquí si lo deseas
          // alert('Error al crear la reserva. Por favor, inténtalo de nuevo.');
        }
      });
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