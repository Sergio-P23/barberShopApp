import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { addIcons } from 'ionicons'; // Importa addIcons
// Importa todos los iconos que se usan en esta página
import {
  menuOutline, logOutOutline, cutOutline, personCircleOutline,
  calendarOutline, createOutline, trashOutline, add, // Icono para el FAB
  saveOutline, closeOutline
} from 'ionicons/icons';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicioService } from 'src/app/services/servicios/servicio.service';

interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
}


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule, // Mantén IonicModule si usas muchas cosas o no quieres importar individualmente
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    // Si prefieres imports individuales para standalone, puedes reemplazar IonicModule con:
    // IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle,
    // IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton, IonModal,
    // IonInput, IonTextarea, IonNote, IonFab, IonFabButton
  ]
})
export class ServiciosPage implements OnInit {

  constructor(private fb: FormBuilder, private servicioService: ServicioService) {
    this.inicializarFormulario();

    addIcons({
      menuOutline,
      logOutOutline,
      cutOutline,
      personCircleOutline,
      calendarOutline,
      createOutline,
      trashOutline,
      add, // Asegúrate de que este es el icono correcto para el FAB
      saveOutline,
      closeOutline
    });
  }

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
    this.servicioService.GetAllServices()
      .subscribe({
        next: res => {
          console.log('✅ servicios OK:', res);
          this.servicios = res;
        },
        error: err => {
          console.error('❌ Error de servicios:', err);
        }
      });
  }

  deleteService() {
    this.servicioService.DeleteService(this.servicioSeleccionado.id)
      .subscribe({
        next: res => {
          console.log('✅ servicios borrado', res);
          this.servicios = this.servicios.filter(s => s.id !== this.servicioSeleccionado.id);
          this.mostrarModalBorrar = false;
          this.servicioSeleccionado = null;
        },
        error: err => {
          console.error('❌ Error de borrar servicios:', err);
        }
      });
  }

  servicios: Servicio[] = [

  ];

  mostrarModalBorrar = false;
  servicioSeleccionado: any = null;

  mostrarModalEditar = false;
  editarForm!: FormGroup;
  imagenPreview: string | null = null;
  imagenFile: File | null = null;
  servicioActual: any = null;
  guardando = false;

  inicializarFormulario() {
    this.editarForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [null, [Validators.required, Validators.min(1)]]
    });
  }

  abrirModalEditar(servicio: any) {
    this.servicioActual = { ...servicio };
    this.editarForm.patchValue({
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      precio: parseFloat(servicio.precio) // Limpiar formato para el input numérico
    });
    this.imagenPreview = servicio.imagen || null;
    this.imagenFile = null;
    this.mostrarModalEditar = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      } console.log(file.size)
      if (file.size > 1000768) {
        alert('La imagen no puede superar los 100kb');
        return;
      }
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen() {
    this.imagenPreview = null;
    this.imagenFile = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  guardarCambios() {
    if (this.editarForm.valid) {
      this.guardando = true;
      const datosEditados = this.editarForm.value;

      const precioNumerico = parseFloat(datosEditados.precio);
      
      const imagenFinal = this.imagenPreview || 'https://static.entori.jp/media/et/sample_img1.png';


      // Si servicioActual tiene ID, estamos editando
      if (this.servicioActual && this.servicioActual.id) {

        //ID para que durante todo el proceso del llamado a la API exista
        const servicioId = this.servicioActual.id;

        this.servicioService.PutService(
          servicioId,
          datosEditados.titulo,
          datosEditados.descripcion,
          String(datosEditados.precio),
          imagenFinal
        ).subscribe({
          next: res => {
            console.log('✅ servicio actualizado', res);

            const index = this.servicios.findIndex(s => s.id === servicioId);
            if (index !== -1) {
              this.servicios[index] = {
                ...this.servicios[index],
                ...datosEditados,
                precio: String(datosEditados.precio),
                imagen: imagenFinal
              };
            }

            this.finalizarGuardado();
          },
          error: err => {
            console.error('❌ Error al actualizar servicio:', err);
            this.guardando = false;
          }
        });
        //CREAR SEVICIO
      } else {
        this.servicioService.PostServices(datosEditados.titulo, datosEditados.descripcion, String(datosEditados.precio), this.imagenPreview || 'https://static.entori.jp/media/et/sample_img1.png')
          .subscribe({
            next: res => {
              console.log('✅ servicio creado OK:', res);
              const servicioAñadido = {
                id: res.service.id,
                titulo: datosEditados.titulo,
                descripcion: datosEditados.descripcion,
                precio: String(datosEditados.precio),
                imagen: res.service.imagen || 'https://static.entori.jp/media/et/sample_img1.png' // Imagen por defecto si no se carga una
              };
              this.servicios.push(servicioAñadido);
            },
            error: err => {
              console.error('❌ Error de servicio creado:', err);
            }
          });
      }

      this.mostrarModalEditar = false;
      this.servicioActual = null;
      this.imagenPreview = null;
      this.imagenFile = null;
      this.editarForm.reset();
      this.guardando = false;
    } else {
      Object.keys(this.editarForm.controls).forEach(key => {
        this.editarForm.get(key)?.markAsTouched();
      });
    }
  }

  cancelarEdicion() {
    this.mostrarModalEditar = false;
    this.editarForm.reset();
    this.imagenPreview = null;
    this.imagenFile = null;
    this.servicioActual = null;
  }

  confirmarBorrado(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.mostrarModalBorrar = true;
  }

  // Ahora el botón FAB "Agregar Servicio" usa este método 'crear()' para abrir el modal de edición
  crear() {
    this.servicioActual = null; // Esto indica que se va a crear un nuevo servicio
    this.imagenPreview = null;
    this.imagenFile = null;
    this.inicializarFormulario(); // Reinicia el formulario para un nuevo servicio
    this.mostrarModalEditar = true;
  }

  private finalizarGuardado() {
    this.mostrarModalEditar = false;
    this.servicioActual = null;
    this.imagenPreview = null;
    this.imagenFile = null;
    this.editarForm.reset();
    this.guardando = false;
  }

}