import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule,
  ]
})
export class BarberosPage implements OnInit {

  constructor(private fb: FormBuilder,) {
    this.inicializarFormulario();
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
      foto: 'https://www.giomrbarber.com/wp-content/uploads/2022/11/giovanny-hernandez.jpg'
    },
    {
      id: 2,
      nombre: 'Luis Pérez',
      foto: 'https://thumbs.dreamstime.com/b/barberos-de-edad-p…zados-en-la-peluquer%C3%ADa-moderna-231500500.jpg'
    }
  ];

  mostrarModalBorrar = false;
  barberoSeleccionado: any = null;

   // Variables para el modal y formulario
  mostrarModalEditar = false;
  editarForm!: FormGroup;
  fotoPreview: string | null = null;
  fotoFile: File | null = null;
  barberoActual: any = null;
  guardando = false;

  confirmarBorrado(barbero: any) {
    this.barberoSeleccionado = barbero;
    this.mostrarModalBorrar = true;
  }

  borrar() {
    this.barberos = this.barberos.filter(b => b.id !== this.barberoSeleccionado.id);
    this.mostrarModalBorrar = false;
  }

  crear() {
    const nuevoId = Math.max(...this.barberos.map(b => b.id)) + 1;
    const nuevoBarbero = {
      id: nuevoId,
      nombre: 'Nuevo Barbero',
      foto: 'https://tse3.mm.bing.net/th/id/OIP.YbjJkPQmvm-LdJniAhJ78gHaG8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    };
    this.barberos.push(nuevoBarbero);
  }

  //////////


  // Inicializar el formulario reactivo
  inicializarFormulario() {
    this.editarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Abrir modal para editar un servicio específico
  abrirModalEditar(barbero: any) {
    this.barberoActual = { ...barbero }; // Copia del barbero actual
    
    // Cargar datos en el formulario carga datos
    this.editarForm.patchValue({
      nombre: barbero.nombre,
    });
    
    // Resetear foto
    this.fotoPreview = barbero.foto || null;
    this.fotoFile = null;
    
    this.mostrarModalEditar = true;
  }

  // Manejar selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        // Mostrar toast de error
        console.error('Por favor selecciona una foto válida');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.error('La foto no puede superar los 5MB');
        return;
      }

      this.fotoFile = file;
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar imagen seleccionada
  eliminarImagen() {
    this.fotoPreview = null;
    this.fotoFile = null;
    
    // Resetear el input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Guardar cambios
  guardarCambios() {
    if (this.editarForm.valid) {
    this.guardando = true;

    // Extraer datos del formulario
    const datosEditados = this.editarForm.value;

    // Actualizar servicio directamente en el array
    const index = this.barberos.findIndex(s => s.id === this.barberoActual.id);
    if (index !== -1) {
      this.barberos[index] = {
        ...this.barberos[index],
        ...datosEditados,
        foto: this.fotoPreview || this.barberos[index].foto
      };
    }

    // Cerrar modal y limpiar
    this.mostrarModalEditar = false;
    this.barberoActual = null;
    this.fotoPreview = null;
    this.fotoFile = null;
    this.editarForm.reset();
    this.guardando = false;
  } else {
    Object.keys(this.editarForm.controls).forEach(key => {
      this.editarForm.get(key)?.markAsTouched();
    });
  }
  }

  // Cancelar edición
  cancelarEdicion() {
    this.mostrarModalEditar = false;
    this.editarForm.reset();
    this.fotoPreview = null;
    this.fotoFile = null;
    this.barberoActual = null;
  }

}
