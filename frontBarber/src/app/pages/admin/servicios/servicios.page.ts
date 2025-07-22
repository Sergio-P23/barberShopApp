import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Este importa TODO lo de Ionic

import { addIcons } from 'ionicons'; // Importa addIcons
import { menuOutline, logOutOutline } from 'ionicons/icons';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RouterModule } from '@angular/router';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
   ]
})
export class ServiciosPage implements OnInit {

  constructor( private fb: FormBuilder,){
    this.inicializarFormulario();

    addIcons({
      menuOutline, // Icono de hamburguesa
      logOutOutline
      
        });
  }

  ngOnInit() {
  }  


    servicios = [
    {
      id: 1,
      titulo: 'Corte Clásico',
      descripcion: 'Corte de cabello tradicional para hombre.',
      precio: '$20',
      imagen: 'https://th.bing.com/th/id/R.10379729687f51cf2b43adc088c4dadc?rik=bzNUkteTgNJV3g&pid=ImgRaw&r=0'
    },
    {
      id: 2,
      titulo: 'Barba',
      descripcion: 'Perfilado y afeitado profesional.',
      precio: '$15',
      imagen: 'https://imagenes.expreso.ec/files/image_700_402/uploads/2020/01/15/5e1f8483e1727.jpeg'
    },
    {
      id: 3,
      titulo: 'Color',
      descripcion: 'Aplicación de color según el estilo deseado.',
      precio: '$20',
      imagen: 'https://i.pinimg.com/736x/e8/35/7b/e8357b776553cc13da123651309a83a7.jpg'
    },
  ];

  mostrarModalBorrar = false;
  servicioSeleccionado: any = null;


  // Variables para el modal y formulario
  mostrarModalEditar = false;
  editarForm!: FormGroup;
  imagenPreview: string | null = null;
  imagenFile: File | null = null;
  servicioActual: any = null;
  guardando = false;

  // Inicializar el formulario reactivo
  inicializarFormulario() {
    this.editarForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // Abrir modal para editar un servicio específico
  abrirModalEditar(servicio: any) {
    this.servicioActual = { ...servicio }; // Copia del servicio
    
    // Cargar datos en el formulario carga datos
    this.editarForm.patchValue({
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      precio: servicio.precio
    });
    
    // Resetear imagen
    this.imagenPreview = servicio.imagen || null;
    this.imagenFile = null;
    
    this.mostrarModalEditar = true;
  }

  // Manejar selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        // Mostrar toast de error
        console.error('Por favor selecciona una imagen válida');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.error('La imagen no puede superar los 5MB');
        return;
      }

      this.imagenFile = file;
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar imagen seleccionada
  eliminarImagen() {
    this.imagenPreview = null;
    this.imagenFile = null;
    
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
    const index = this.servicios.findIndex(s => s.id === this.servicioActual.id);
    if (index !== -1) {
      this.servicios[index] = {
        ...this.servicios[index],
        ...datosEditados,
        imagen: this.imagenPreview || this.servicios[index].imagen
      };
    }

    // Cerrar modal y limpiar
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

  // Cancelar edición
  cancelarEdicion() {
    this.mostrarModalEditar = false;
    this.editarForm.reset();
    this.imagenPreview = null;
    this.imagenFile = null;
    this.servicioActual = null;
  }

//////////////////////////////

  confirmarBorrado(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.mostrarModalBorrar = true;
  }

  borrar() {
    this.servicios = this.servicios.filter(s => s.id !== this.servicioSeleccionado.id);
    this.mostrarModalBorrar = false;
    this.servicioSeleccionado = null;
  }

  crear() {
    const nuevoId = Math.max(...this.servicios.map(s => s.id)) + 1;
    const nuevoServicio = {
      id: nuevoId,
      titulo: 'Nuevo Servicio',
      descripcion: 'Descripción del nuevo servicio.',
      precio: '$0',
      imagen: 'https://tse3.mm.bing.net/th/id/OIP.YbjJkPQmvm-LdJniAhJ78gHaG8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    };
    this.servicios.push(nuevoServicio);
  }


  

}
