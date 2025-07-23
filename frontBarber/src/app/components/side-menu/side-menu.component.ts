import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  logOutOutline, cutOutline, personCircleOutline, calendarOutline
} from 'ionicons/icons';

import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonIcon, IonLabel, IonFooter, IonButton
} from '@ionic/angular/standalone';

// Importa MenuController para una forma alternativa de controlar el menú si es necesario
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonIcon, IonLabel, IonFooter, IonButton
  ]
})
export class SideMenuComponent implements OnInit {

  // Opcional: inyectar MenuController para control más general del menú
  constructor(private menuCtrl: MenuController) {
    addIcons({
      logOutOutline,
      cutOutline,
      personCircleOutline,
      calendarOutline
    });
  }

  ngOnInit() {
  }


  async closeMenu(menu: IonMenu) {
    await menu.close();
  }


}