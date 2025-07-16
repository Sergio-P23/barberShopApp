import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem,IonInput, IonInputPasswordToggle, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';


import { addIcons } from 'ionicons';
import { lockClosed, lockClosedOutline, mailOutline } from 'ionicons/icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem,IonInput, IonInputPasswordToggle, IonButton, IonButtons, IonIcon]
})
export class LoginPage implements OnInit {

  constructor() { 
    addIcons({
      mailOutline,
      lockClosedOutline
    })
  }

  ngOnInit() {
  }

}
