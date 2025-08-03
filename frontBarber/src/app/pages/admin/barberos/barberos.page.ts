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

import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { BarberoService } from 'src/app/services/barberos/barbero.service';

interface Barbero {
  id: number;
  nombre: string;
  correo: string;
  celular: string;
  foto: string;
  rol: string;
  contraseña: string;
}


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

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private barberoService: BarberoService) {
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

  ngOnInit() {
    this.getAllBarbers()
  }

  barberos: Barbero[] = [];

  mostrarModalBorrar = false;
  barberoSeleccionado: any = null;

  mostrarModalEditar = false;
  editarForm!: FormGroup;
  fotoPreview: string | null = null;
  fotoFile: File | null = null;
  barberoActual: any = null;
  guardando = false;

  getAllBarbers() {
    this.barberoService.GetAllBarbers()
      .subscribe({
        next: res => {
          console.log('✅ barberos del back:', res);
          // Mapear los datos a tu estructura esperada
          this.barberos = res.map((b: any) => ({
            id: b.id,
            nombre: b.nombre,
            correo: b.correo_usuario,
            celular: b.celular_usuario,
            foto: b.foto,
            rol: 'barbero', // Asignación por defecto
            contraseña: '' // No viene del backend
          }));
          this.barberos = res;
        },
        error: err => {
          console.error('❌ Error traer barberos:', err);
        }
      });
  }

  deleteBarber(){
    this.barberoService.DeleteBarber(this.barberoSeleccionado.id)
    .subscribe({
       next: res => {
          console.log('✅ barbero borrado', res);
          this.barberos = this.barberos.filter(s => s.id !== this.barberoSeleccionado.id);
          this.mostrarModalBorrar = false;
          this.barberoSeleccionado = null;
        },
        error: err => {
          console.error('❌ Error de borrar servicios:', err);
        }
    });
  }

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
      celular: ['', [Validators.required, Validators.minLength(10)]],
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

        const nuevoBarbero = {
          nombre: datosEditados.nombre,
          correo: datosEditados.correo,
          celular: datosEditados.celular,
          password: datosEditados.contraseña,
          foto: this.fotoPreview || 'https://img.freepik.com/iconos-gratis/seguidor_318-745495.jpg', // Foto por defecto
          rol: 'barbero'
        };

        this.usuarioService.crearUsuario(nuevoBarbero)
          .subscribe({
            next: (res) => {
              console.log('✅ Barbero creado en backend:', res);
              
              const barberoAñadido = {
                id: res.service.id,
                nombre: nuevoBarbero.nombre,
                correo: nuevoBarbero.correo,
                celular: nuevoBarbero.celular,
                contraseña: datosEditados.contraseña,
                foto: nuevoBarbero.foto,
                rol: 'barbero'
              };

              this.barberos.push(barberoAñadido);
            },
            error: (err) => {
              console.error('❌ Error al crear barbero:', err);
              this.guardando = false;
            }
          })
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