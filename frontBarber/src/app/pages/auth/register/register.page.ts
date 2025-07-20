import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
// ¡Importa los nuevos iconos y el de retroceso si aún no lo tienes!
import { personOutline, callOutline, mailOutline, lockClosedOutline, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButtons, IonToolbar, IonBackButton, IonHeader, IonContent, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonIcon, RouterModule] // Asegúrate de que todos los componentes Ionic estén aquí
})
export class RegisterPage implements OnInit {

  constructor() {
    addIcons({
      personOutline,      // Nuevo icono para Nombre
      callOutline,        // Nuevo icono para Celular
      mailOutline,
      lockClosedOutline,
      chevronBackOutline  // Icono para el botón de retroceso
    });
  }

  ngOnInit() {
  }

}