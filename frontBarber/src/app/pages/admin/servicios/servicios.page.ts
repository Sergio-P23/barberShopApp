import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { addIcons } from 'ionicons'; // Importa addIcons
import { menuOutline, logOutOutline } from 'ionicons/icons';

import { RouterModule } from '@angular/router';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
   ]
})
export class ServiciosPage implements OnInit {
    servicios = [
    {
      id: 1,
      titulo: 'Corte Clásico',
      descripcion: 'Corte de cabello tradicional para hombre.',
      precio: '$20',
      imagen: 'https://th.bing.com/th/id/R.10379729687f51cf2b43adc088c4dadc?rik=bzNUkteTgNJV3g&pid=ImgRaw&r=0'
    },
    {
      id: 2,
      titulo: 'Barba',
      descripcion: 'Perfilado y afeitado profesional.',
      precio: '$15',
      imagen: 'https://imagenes.expreso.ec/files/image_700_402/uploads/2020/01/15/5e1f8483e1727.jpeg'
    },
    {
      id: 3,
      titulo: 'Color',
      descripcion: 'Aplicación de color según el estilo deseado.',
      precio: '$20',
      imagen: 'https://i.pinimg.com/736x/e8/35/7b/e8357b776553cc13da123651309a83a7.jpg'
    },
  ];

  mostrarModalBorrar = false;
  mostrarModalEditar = false;
  servicioSeleccionado: any = null;

  confirmarBorrado(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.mostrarModalBorrar = true;
  }

  borrar() {
    this.servicios = this.servicios.filter(s => s.id !== this.servicioSeleccionado.id);
    this.mostrarModalBorrar = false;
    this.servicioSeleccionado = null;
  }

  editar(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.mostrarModalEditar = true;
  }

  crear() {
    const nuevoId = Math.max(...this.servicios.map(s => s.id)) + 1;
    const nuevoServicio = {
      id: nuevoId,
      titulo: 'Nuevo Servicio',
      descripcion: 'Descripción del nuevo servicio.',
      precio: '$0',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.YbjJkPQmvm-LdJniAhJ78gHaG8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    };
    this.servicios.push(nuevoServicio);
  }


  constructor(){
    addIcons({
      menuOutline, // Icono de hamburguesa
      logOutOutline
      
        });
   }

  ngOnInit() {
  }

}
