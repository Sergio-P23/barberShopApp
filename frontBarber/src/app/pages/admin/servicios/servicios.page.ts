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

  constructor(private fb: FormBuilder) {
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

  ngOnInit() { }

  servicios = [
    {
      id: 1,
      titulo: 'Corte Clásico',
      descripcion: 'Corte de cabello tradicional para hombre, estilo moderno o clásico.',
      precio: '$20.000 COP',
      imagen: 'https://images.unsplash.com/photo-1596434311145-c4199c08006e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      titulo: 'Arreglo de Barba',
      descripcion: 'Perfilado y afeitado profesional con toalla caliente y productos de alta calidad.',
      precio: '$15.000 COP',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mYPjDp5GOw3Lotl1LguEiYNN8z9SU2eXaw&s'
    },
    {
      id: 3,
      titulo: 'Tintura de Cabello',
      descripcion: 'Aplicación de color para cubrir canas o cambiar el look, según el estilo deseado.',
      precio: '$50.000 COP',
      imagen: 'https://i.pinimg.com/736x/e8/35/7b/e8357b776553cc13da123651309a83a7.jpg'
    },
    {
      id: 4,
      titulo: 'Diseño de Cejas',
      descripcion: 'Diseño y depilación de cejas para resaltar la mirada masculina.',
      precio: '$15.000 COP',
      imagen: 'https://i.pinimg.com/1200x/05/f0/27/05f0271b699f734621834da08fcf4f6b.jpg'
    },
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
      precio: parseFloat(servicio.precio.replace('$', '').replace(' COP', '').replace('.', '')) // Limpiar formato para el input numérico
    });
    this.imagenPreview = servicio.imagen || null;
    this.imagenFile = null;
    this.mostrarModalEditar = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Por favor selecciona una imagen válida');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.error('La imagen no puede superar los 5MB');
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
      const precioFormateado = `$${precioNumerico.toLocaleString('es-CO')} COP`;

      // Si servicioActual tiene ID, estamos editando
      if (this.servicioActual && this.servicioActual.id) {
        const index = this.servicios.findIndex(s => s.id === this.servicioActual.id);
        if (index !== -1) {
          this.servicios[index] = {
            ...this.servicios[index],
            ...datosEditados,
            precio: precioFormateado,
            imagen: this.imagenPreview || this.servicios[index].imagen
          };
        }
      } else { // Si servicioActual es null o no tiene ID, estamos creando uno nuevo
        const nuevoId = Math.max(...this.servicios.map(s => s.id)) + 1; // Generar nuevo ID
        const servicioAñadido = {
          id: nuevoId,
          titulo: datosEditados.titulo,
          descripcion: datosEditados.descripcion,
          precio: precioFormateado,
          imagen: this.imagenPreview || 'https://via.placeholder.com/150' // Imagen por defecto si no se carga una
        };
        this.servicios.push(servicioAñadido);
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

  borrar() {
    this.servicios = this.servicios.filter(s => s.id !== this.servicioSeleccionado.id);
    this.mostrarModalBorrar = false;
    this.servicioSeleccionado = null;
  }

  // Ahora el botón FAB "Agregar Servicio" usa este método 'crear()' para abrir el modal de edición
  crear() {
    this.servicioActual = null; // Esto indica que se va a crear un nuevo servicio
    this.imagenPreview = null;
    this.imagenFile = null;
    this.inicializarFormulario(); // Reinicia el formulario para un nuevo servicio
    this.mostrarModalEditar = true;
  }
}