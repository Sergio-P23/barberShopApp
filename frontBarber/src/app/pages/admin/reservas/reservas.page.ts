import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {  IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, } from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { addIcons } from 'ionicons'; // Importa addIcons
import { menuOutline, logOutOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,]
})
export class ReservasPage implements OnInit {

  constructor() {
    addIcons({
      menuOutline, // Icono de hamburguesa
      logOutOutline
        });
   }

  ngOnInit() {
  }

}
