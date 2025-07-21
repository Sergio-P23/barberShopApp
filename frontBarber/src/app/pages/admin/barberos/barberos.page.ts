import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic
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

import { addIcons } from 'ionicons'; // Importa addIcons
import { menuOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-barberos',
  templateUrl: './barberos.page.html',
  styleUrls: ['./barberos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class BarberosPage implements OnInit {

  constructor() {
    addIcons({
      menuOutline, // Icono de hamburguesa
      logOutOutline
      
        });
   }

  ngOnInit() {
  }

  barberos = [
    {
      id: 1,
      nombre: 'Carlos Sánchez',
      foto: 'https://via.placeholder.com/100x100?text=Carlos'
    },
    {
      id: 2,
      nombre: 'Luis Pérez',
      foto: 'https://via.placeholder.com/100x100?text=Luis'
    }
  ];

  mostrarModalBorrar = false;
  barberoSeleccionado: any = null;

  confirmarBorrado(barbero: any) {
    this.barberoSeleccionado = barbero;
    this.mostrarModalBorrar = true;
  }

  borrar() {
    this.barberos = this.barberos.filter(b => b.id !== this.barberoSeleccionado.id);
    this.mostrarModalBorrar = false;
  }

  editar(barbero: any) {
    console.log('Editar barbero:', barbero);
    // Aquí podrías abrir un modal o formulario
  }

  crear() {
    const nuevoId = Math.max(...this.barberos.map(b => b.id)) + 1;
    const nuevoBarbero = {
      id: nuevoId,
      nombre: 'Nuevo Barbero',
      foto: 'https://via.placeholder.com/100x100?text=Nuevo'
    };
    this.barberos.push(nuevoBarbero);
  }

}
