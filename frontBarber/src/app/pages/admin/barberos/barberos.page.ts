import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
// Iconos específicos para esta página
import {
  menuOutline, logOutOutline, createOutline, trashOutline, add, saveOutline, closeOutline
} from 'ionicons/icons';



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
    FormsModule,
  
  ]
})
export class BarberosPage implements OnInit {

  constructor(private fb: FormBuilder) {
    this.inicializarFormulario();
    addIcons({
      menuOutline,
      logOutOutline,
      createOutline,
      trashOutline,
      add, // Icono para el FAB
      saveOutline,
      closeOutline
    });
  }

  ngOnInit() { }

  barberos = [
    {
      id: 1,
      nombre: 'Carlos Sánchez',
      foto: 'https://images.squarespace-cdn.com/content/v1/6221649741ec3a06ecd99f53/1646359598438-K4U2BJH9GLDZ9DO19NX9/_DSC1144+2.jpg?format=1000w',
      correo: 'carlossanchez@gmail.com' ,
      contraseña: '123' 
    },
    {
      id: 2,
      nombre: 'Luis Pérez',
      foto: 'https://th.bing.com/th/id/R.133099d40cb1df5f2740591798752e32?rik=BKO6PxHI%2fCanuw&riu=http%3a%2f%2fbarberosbarberias.com%2fassets%2fimg%2fGaleria%2fdani_colombia.webp&ehk=gavSAr7Tg%2bDzCtmKupSpTZG8MtUDqvDjPfUnLluTZk0%3d&risl=&pid=ImgRaw&r=0',
      correo: 'luisperez@gmail.com' ,
      contraseña: '456'  
    },
    {
      id: 3,
      nombre: 'Sofía Ramirez',
      foto: 'https://www.elespectador.com/resizer/RyHY-KnNENTkRpmat3fTYn8gHLc=/920x613/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/OMTV66O42RAMZILNY6MVVHCF7E.jpg',
      correo: 'sofiaramirez@gmail.com' ,
      contraseña: '789' 
    },
    {
      id: 4,
      nombre: 'Juan David',
      foto: 'https://tse1.mm.bing.net/th/id/OIP.2GjjHEG8IvcAPJDx8SYcNwHaEz?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      correo: 'juandavid@gmail.com' ,
      contraseña: '1011' 
    },
  ];

  mostrarModalBorrar = false;
  barberoSeleccionado: any = null;

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
    this.barberoSeleccionado = null;
  }

  // Inicializar el formulario reactivo
  inicializarFormulario() {
    this.editarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Abrir modal para editar un barbero específico
  abrirModalEditar(barbero: any) {
    this.barberoActual = { ...barbero };
    this.editarForm.patchValue({
      nombre: barbero.nombre,
      correo: barbero.correo,
      contraseña: barbero.contraseña
    });
    this.fotoPreview = barbero.foto || null;
    this.fotoFile = null;
    this.mostrarModalEditar = true;
  }

  // Manejar selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Por favor selecciona una foto válida');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.error('La foto no puede superar los 5MB');
        return;
      }
      this.fotoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar foto seleccionada
  eliminarImagen() {
    this.fotoPreview = null;
    this.fotoFile = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Guardar cambios o crear nuevo barbero
  guardarCambios() {
    if (this.editarForm.valid) {
      this.guardando = true;
      const datosEditados = this.editarForm.value;

      // Si barberoActual tiene ID, estamos editando
      if (this.barberoActual && this.barberoActual.id) {
        const index = this.barberos.findIndex(b => b.id === this.barberoActual.id);
        if (index !== -1) {
          this.barberos[index] = {
            ...this.barberos[index],
            ...datosEditados,
            foto: this.fotoPreview || this.barberos[index].foto
          };
        }
      } else { // Si barberoActual es null o no tiene ID, estamos creando uno nuevo
        const nuevoId = Math.max(...this.barberos.map(b => b.id)) + 1;
        const barberoAñadido = {
          id: nuevoId,
          nombre: datosEditados.nombre,
          correo: datosEditados.correo,
          contraseña: datosEditados.contraseña,
          foto: this.fotoPreview || 'https://via.placeholder.com/150' // Foto por defecto
          
        };
        this.barberos.push(barberoAñadido);
      }

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

  // Abrir modal para crear un nuevo barbero
  crear() {
    this.barberoActual = null; // Indica que es un nuevo barbero
    this.fotoPreview = null;
    this.fotoFile = null;
    this.inicializarFormulario(); // Reinicia el formulario para un nuevo barbero
    this.mostrarModalEditar = true;
  }
}