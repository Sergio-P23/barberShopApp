import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonHeader, IonBackButton, IonToolbar, IonButtons } from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
// ¡Importa chevronBackOutline aquí!
import { lockClosed, lockClosedOutline, mailOutline, chevronBackOutline } from 'ionicons/icons'; // 

//API
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButtons, IonToolbar, IonBackButton, IonHeader, IonContent, CommonModule, FormsModule, IonItem, IonInput, IonButton, IonIcon, IonToolbar, IonButtons, RouterModule, SideMenuComponent]
})
export class LoginPage implements OnInit {
correo: string = '';
  password: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {
    addIcons({
      mailOutline,
      lockClosedOutline,
      chevronBackOutline // ¡Añádelo aquí para que Ionic pueda usarlo! 
    });
  }

  ngOnInit(){
  }

  login() {
    console.log(this.correo, this.password)
    this.usuarioService.loginUsuario(this.correo, this.password)
      .subscribe({
        next: res => {
          console.log('✅ Login OK:', res);
          this.usuarioService.user=res.user;
          localStorage.setItem("token", res.access_token)

          if (res.user?.rol == 'administrador') {
            this.router.navigate(['/admin/servicios']);
          }else{
            this.router.navigate(['/admin/reservas']);
          }
          
        
        },
        error: err => {
          console.error('❌ Error de login:', err);
        }
      });
  }


}