import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { addIcons } from 'ionicons';
import {
    menuOutline, logOutOutline, calendarOutline,
    // 🆕 Iconos para los toasts
    closeCircleOutline,
    alertCircleOutline
} from 'ionicons/icons';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { ReservaService } from 'src/app/services/reservas/reserva.service';

// 🆕 Importamos IonToast, ToastController, IonLoading, LoadingController
import { IonToast, ToastController, IonLoading, LoadingController } from '@ionic/angular/standalone';

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
        SideMenuComponent,
        // 🆕 Añadimos IonToast y IonLoading para que estén disponibles en el template
        IonToast,
        IonLoading
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

    // 🆕 Inyectamos el servicio en el constructor y los controladores de Toast y Loading
    constructor(
        private reservaService: ReservaService,
        private toastController: ToastController, // 🆕 Inyectamos ToastController
        private loadingController: LoadingController // 🆕 Inyectamos LoadingController
    ) {
        addIcons({
            menuOutline,
            logOutOutline,
            calendarOutline,
            closeCircleOutline, // 🆕 Añadimos icono para el toast
            alertCircleOutline // 🆕 Añadimos icono para el toast
        });
    }

    // 🆕 En vez de usar datos de prueba, llamamos a la API
    ngOnInit() {
        this.cargarReservas();
    }

    // 🆕 Método para mostrar el toast de error con texto blanco y en la parte superior
    async showErrorToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 4000,
            position: 'top',
            color: 'danger', // Define el color de fondo como rojo (color predefinido de Ionic)
            icon: 'alert-circle-outline',
            buttons: [
                {
                    text: 'Cerrar',
                    role: 'cancel',
                    icon: 'close-circle-outline'
                }
            ]
        });
        await toast.present();
    }

    // 🆕 Método para presentar el spinner de carga (loader)
    async presentLoading(message: string = 'Cargando...') {
        const loading = await this.loadingController.create({
            message: message,
        });
        await loading.present();
        return loading;
    }

    // 🆕 Método para cargar las reservas desde la API (ahora async para usar await con el loading)
    async cargarReservas(fecha?: string) {
        const loading = await this.presentLoading('Cargando reservas...'); // 🆕 Muestra el loader
        this.reservaService.GetAllBookings(fecha).subscribe({
            next: (data) => {
                loading.dismiss(); // 🆕 Oculta el loader si la llamada es exitosa
                // Asignamos las reservas obtenidas y las copiamos para el filtro
                this.reservas = data;
                this.reservasFiltradas = [...this.reservas];
                console.log('Reservas cargadas:', this.reservas);
            },
            error: (e) => {
                loading.dismiss(); // 🆕 Oculta el loader si hay un error
                console.error('Error al cargar reservas:', e);
                this.showErrorToast('Error al cargar las reservas. Intenta de nuevo.'); // 🆕 Muestra toast de error
            }
        });
    }

    // 🆕 El método para cancelar ahora usa el servicio para eliminar en el backend
    confirmarCancelacion(reserva: any) {
        this.reservaSeleccionada = reserva;
        this.mostrarModalBorrar = true;
    }

    // 🆕 Modificado para usar el servicio de borrado (ahora async para usar await con el loading)
    async cancelar() {
        if (this.reservaSeleccionada && this.reservaSeleccionada.id) {
            const loading = await this.presentLoading('Cancelando reserva...'); // 🆕 Muestra el loader
            this.reservaService.DeleteBooking(this.reservaSeleccionada.id).subscribe({
                next: () => {
                    loading.dismiss(); // 🆕 Oculta el loader si la llamada es exitosa
                    console.log('Reserva eliminada exitosamente');
                    // Volvemos a cargar las reservas para actualizar la lista
                    this.cargarReservas();
                    this.mostrarModalBorrar = false;
                },
                error: (e) => {
                    loading.dismiss(); // 🆕 Oculta el loader si hay un error
                    console.error('Error al eliminar la reserva:', e);
                    this.showErrorToast('Error al eliminar la reserva. Intenta de nuevo.'); // 🆕 Muestra toast de error
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

    // 🆕 Modificado para usar el servicio con el filtro por fecha (ahora async para usar await con el loading)
    async aplicarFiltro() {
        if (this.fechaTemporal) {
            const fechaSeleccionada = new Date(this.fechaTemporal);
            this.fechaFiltro = fechaSeleccionada.toISOString().split('T')[0];
            // 🆕 Llamamos al método de cargar con la fecha filtrada
            await this.cargarReservas(this.fechaFiltro); // 🆕 Usa await porque cargarReservas ahora es async
        }
        this.cerrarModalFecha();
    }

    // 🆕 Modificado para quitar el filtro llamando al método de cargar sin fecha (ahora async para usar await con el loading)
    async quitarFiltro() {
        this.fechaFiltro = '';
        this.fechaTemporal = '';
        // 🆕 Cargamos todas las reservas de nuevo
        await this.cargarReservas(); // 🆕 Usa await porque cargarReservas ahora es async
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
