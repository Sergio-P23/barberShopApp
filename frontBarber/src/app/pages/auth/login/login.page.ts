import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem,IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';


import { addIcons } from 'ionicons';
import { lockClosed, lockClosedOutline, mailOutline, logoGoogle, logoApple } from 'ionicons/icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem,IonInput, IonButton, IonIcon]
})
export class LoginPage implements OnInit {

  constructor() { 
    addIcons({
      mailOutline,
      lockClosedOutline,
      logoGoogle,
      logoApple

    })
  }

  ngOnInit() {
  }

}
