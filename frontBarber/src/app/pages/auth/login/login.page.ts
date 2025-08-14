import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent, IonItem, IonInput, IonButton, IonIcon,
    IonHeader, IonBackButton, IonToolbar, IonButtons,
    IonToast, ToastController,
    // 🆕 Importamos IonLoading y LoadingController
    IonLoading, LoadingController
} from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { lockClosed, lockClosedOutline, mailOutline, chevronBackOutline } from 'ionicons/icons';

//API
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [
        IonButtons, IonToolbar, IonBackButton, IonHeader,
        IonContent, CommonModule, FormsModule, IonItem,
        IonInput, IonButton, IonIcon, RouterModule,
        SideMenuComponent,
        IonToast,
        // 🆕 Añadimos IonLoading
        IonLoading
    ]
})
export class LoginPage implements OnInit {
    correo: string = '';
    password: string = '';

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private toastController: ToastController,
        // 🆕 Inyectamos LoadingController
        private loadingController: LoadingController
    ) {
        addIcons({
            mailOutline,
            lockClosedOutline,
            chevronBackOutline
        });
    }

    ngOnInit() {
    }

    async login() { // 🆕 Hacemos la función asíncrona para poder usar await
        console.log(this.correo, this.password);

        // 🆕 Presentamos el spinner de carga
        const loading = await this.loadingController.create({
            message: 'Iniciando sesión...',
        });
        await loading.present();

        this.usuarioService.loginUsuario(this.correo, this.password)
            .subscribe({
                next: res => {
                    loading.dismiss(); // 🆕 Cerramos el spinner
                    console.log('✅ Login OK:', res);
                    this.usuarioService.user = res.user;
                    localStorage.setItem('user', JSON.stringify(res.user));
                    localStorage.setItem("token", res.access_token)

                    if (res.user?.rol == 'administrador') {
                        this.router.navigate(['/admin/servicios']);
                    } else {
                        this.router.navigate(['/admin/reservas']);
                    }
                },
                error: err => {
                    loading.dismiss(); // 🆕 Cerramos el spinner en caso de error
                    console.error('❌ Error de login:', err);
                    this.showErrorToast('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
                }
            });
    }

    async showErrorToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            position: 'top',
            color: 'danger',
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
}