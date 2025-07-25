import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonHeader, IonBackButton, IonToolbar, IonButtons } from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
// ¡Importa chevronBackOutline aquí!
import { lockClosed, lockClosedOutline, mailOutline, chevronBackOutline } from 'ionicons/icons'; // 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButtons, IonToolbar, IonBackButton, IonHeader, IonContent, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonIcon, IonToolbar, IonButtons, RouterModule]
})
export class LoginPage implements OnInit {

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      chevronBackOutline // ¡Añádelo aquí para que Ionic pueda usarlo! 
    });
  }

  ngOnInit() {
  }

}