import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, RendererStyleFlags2 } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservacionService } from '../../services/reservacion.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { SalaService } from '../../services/sala.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, AfterViewInit {

  public events: any[];
  public usuarios: any[];
  public laboratorios: any[];
  public options: any;

  public reservaForm: FormGroup;
  public mostrarModal = false;
  public fechaSeleccionada: string = '';

  public usuarioSeleccionado: any = {};
  public laboratorioSeleccionado: any = {};


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private reservacionService: ReservacionService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private usuarioService: UsuarioService,
    private laboratorioService: SalaService
  ) {
    // Definir el formulario
    this.reservaForm = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      horaInicio: ['', [Validators.required,this.validarFechaPasada]],
      horaFinal: ['', [Validators.required, this.validarHoraFinal.bind(this)]],
      usuario: ['', Validators.required], // Cambiado para coincidir con formControlName
      laboratorio: ['', Validators.required], // Cambiado para coincidir con formControlName
      description:  ['',[Validators.required, Validators.minLength(10),Validators.maxLength(500)]],
      cantidadEstudiantes: [, [Validators.required, Validators.min(1)]],
      semestre: ['', [Validators.required,Validators.min(1)]],
      grupo: ['', [Validators.required,Validators.min(1)]],
      estadoReservacion: ['PENDIENTE'] //valor por defecto
    });
  }

  ngOnInit() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      slotMinTime: "00:00:00",
      slotMaxTime: "24:00:00",
      slotDuration: "01:00:00",
      contentHeight: 1500,
      locale: esLocale,
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.editarReserva.bind(this), // Añadir manejador de clic en evento
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      expandRows: true,
      dayHeaderFormat: { weekday: 'long', day: 'numeric' },
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      },
      allDaySlot: false,
    };

    this.cargarEventos();

    this.cargarUsuarios();
    this.cargarLaboratorios();

  }

  cargarUsuarios() {
    this.usuarioService.obtenerListaDeUsuarios().subscribe(response => {
      if (response.data && Array.isArray(response.data)) {
        this.usuarios = response.data.map(usuario => ({
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          email: usuario.email,
          id: usuario.id,
          cargo: usuario.cargoEmpleado ? usuario.cargoEmpleado.cargo : 'Sin cargo'
        }));
      } else {
        this.events = [];
      }
    });
  }

  cargarLaboratorios() {
    this.laboratorioService.obtenerListaDeSalas().subscribe(response => {
      if (response.data && Array.isArray(response.data)) {
        this.laboratorios = response.data.map(laboratorio => ({
          nombre: laboratorio.laboratorio,
          descripcion: laboratorio.descripcion,
          ubicacion: laboratorio.ubicacion,
          id: laboratorio.id,
        }));
      } else {
        this.events = [];
      }
    });
  }



  cargarEventos() {
    this.reservacionService.obtenerListaDeReservaciones().subscribe(response => {
      if (response.data && Array.isArray(response.data)) {
        this.events = response.data.map(reserva => {
          let color = '';

          switch (reserva.estadoReservacion) {
            case 'APROBADA':
              color = '#28a745'; // verde
              break;
            case 'RECHAZADA':
              color = '#EDBE07'; // rojo
              break;
            default: // PENDIENTE u otros
              color = '#5C636A'; // azul
              break;
          }

          return {
            id: reserva.id,
            title: `${reserva.titulo}`,
            start: reserva.horaInicio,
            end: reserva.horaFinal,
            color: color,
            extendedProps: {
              usuario: reserva.usuario,
              laboratorio: reserva.laboratorio,
              description: reserva.description,
              cantidadEstudiantes: reserva.cantidadEstudiantes,
              semestre: reserva.semestre,
              grupo: reserva.grupo,
              estadoReservacion: reserva.estadoReservacion
            }
          };
        });
      } else {
        this.events = [];
      }
    });
  }





  abrirFormularioReserva(event: any) {

    // Resetea el formulario antes de asignar valores
    this.reservaForm.reset();
    this.reservaForm.markAsPristine();
    this.reservaForm.markAsUntouched();

    const fechaSeleccionada = new Date(event.date);
    const fechaFormateada = fechaSeleccionada.toISOString().slice(0, 16);

    this.fechaSeleccionada = fechaFormateada;
    this.mostrarModal = true;
    this.reservaForm.patchValue({
      horaInicio: fechaFormateada,
      horaFinal: fechaFormateada
    });

    this.cdRef.detectChanges();
  }





  guardarReserva() {
    if (this.reservaForm.valid) {
      const horaInicio = new Date(this.reservaForm.get('horaInicio')?.value);
      const now = new Date();

      if (horaInicio < now) {
        Swal.fire({
          icon: 'error',
          title: 'Fecha inválida',
          text: 'La hora de inicio no puede ser anterior a la fecha y hora actual.',
        });
        return;
      }


      const { cantidadEstudiantes, semestre, grupo } = this.reservaForm.value;

    if (cantidadEstudiantes <= 0 || semestre <= 0 || grupo <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Número inválido',
        text: 'Los valores numéricos deben ser mayores que cero.',
      });
      return;
    }

      const reservaId = this.reservaForm.get('id')?.value;
      const laboratorioId = Number(this.reservaForm.get('laboratorio')?.value);
      const laboratorioIdSeleccionado = this.laboratorios.find(laboratorio => laboratorio.id === laboratorioId);

      if (!laboratorioIdSeleccionado) {
        alert("Laboratorio no válido.");
        return;
      }
      const usuarioId = Number(this.reservaForm.get('usuario')?.value);
      // Buscar el usuario en la lista
      const usuarioSeleccionado = this.usuarios.find(user => user.id === usuarioId);

      if (!usuarioSeleccionado) {
        alert("Usuario no válido.");
        return;
      }


      const reserva = {
        ...this.reservaForm.value,
        usuario: usuarioSeleccionado, // Enviar el objeto completo
        laboratorio: laboratorioIdSeleccionado,
        estadoReservacion: "PENDIENTE"
      }

      if (reservaId) {
        // **Actualizar Reserva Existente**
        this.reservacionService.actualizarReservacion(reservaId, reserva).subscribe(() => {
          this.cargarEventos();
          this.mostrarModal = false;
          this.reservaForm.reset();
          this.cdRef.detectChanges();
        });
      } else {
        // **Crear Nueva Reserva**
        this.reservacionService.registrarReservacion(reserva).subscribe(() => {
          this.cargarEventos();
          this.mostrarModal = false;
          this.reservaForm.reset();
          this.cdRef.detectChanges();
        });
      }
    } else {
      alert("Por favor, complete todos los campos obligatorios.");
    }

  }




  editarReserva(info: any) {
    // Buscar la reserva original en la lista de eventos
    const idReservaSeleccionada = info.event._def.publicId;

    const reservaSeleccionada = this.events.find(event => event.id == idReservaSeleccionada);

    if (!reservaSeleccionada) {
      return;
    }

    // Llenar el formulario con los datos de la reserva
    this.reservaForm.patchValue({
      id: reservaSeleccionada.id,
      titulo: reservaSeleccionada.title, // FullCalendar usa "title" en vez de "titulo"
      horaInicio: reservaSeleccionada.start,
      horaFinal: reservaSeleccionada.end,
      usuario: reservaSeleccionada.extendedProps.usuario?.id || '',
      laboratorio: reservaSeleccionada.extendedProps.laboratorio?.id || '',
      description: reservaSeleccionada.extendedProps.description || '',
      cantidadEstudiantes: reservaSeleccionada.extendedProps.cantidadEstudiantes || '',
      semestre: reservaSeleccionada.extendedProps.semestre || '',
      grupo: reservaSeleccionada.extendedProps.grupo || '',
      estadoReservacion: reservaSeleccionada.extendedProps.estadoReservacion || 'PENDIENTE'
    });


    // Mostrar el modal con los datos cargados
    this.mostrarModal = true;
    this.cdRef.detectChanges();
  }

  eliminarReserva() {
    const reservaId = this.reservaForm.get('id')?.value;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas cancelar esta reserva!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservacionService.eliminarReservacion(reservaId).subscribe(() => {
          Swal.fire(
            'Reserva cancelada',
            'La reserva ha sido eliminada con éxito',
            'success'
          );
          // Cerrar el modal y resetear el formulario
          this.mostrarModal = false;
          this.reservaForm.reset();
          this.cdRef.detectChanges();

          // Recargar los eventos en el calendario
          this.cargarEventos();
        });
      }
    });
  }




  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.fc-col-header-cell-cushion');
    elements.forEach((element: any) => {
      this.renderer.setStyle(element, 'color', 'rgb(30, 43, 55)');
      this.renderer.setStyle(element, 'font-weight', 'normal');
      this.renderer.setStyle(element, 'text-decoration', 'none');
    });
  }

  cerrarModal() {
    this.reservaForm.reset();
    this.reservaForm.markAsPristine();
    this.reservaForm.markAsUntouched();

    this.mostrarModal = false;
    this.cdRef.detectChanges();
  }


  //Ajustes fecha de inicio y fin por defecto
  handleDateClick(arg: any) {

    const clickedDate = new Date(arg.date);
    const now = new Date();


    // Validar si la fecha es anterior al momento actual
    if (clickedDate < now) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha inválida',
        text: 'No puedes crear reservas en una fecha y hora pasadas.',
      });
      return; // No abrir modal
    }

    const localDateString = clickedDate.toLocaleString("en-US", { timeZone: "America/Bogota" });
    const localDate = new Date(localDateString);

    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const hours = localDate.getHours();

    const startDate = new Date(year, month - 1, day, hours, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const formatDate = (date: Date) => {
      const pad = (num: number) => num.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    this.reservaForm.patchValue({
      horaInicio: formatDate(startDate),
      horaFinal: formatDate(endDate)
    });

    this.mostrarModal = true;
    this.cdRef.detectChanges();
  }



  validarHoraFinal(control: AbstractControl) {
    const horaInicio = this.reservaForm?.get('horaInicio')?.value;
    const horaFinal = control.value;

    if (horaInicio && horaFinal && new Date(horaFinal) <= new Date(horaInicio)) {
      return { horaInvalida: true }; // Retorna error si la hora final es menor o igual a la de inicio
    }
    return null;
  }



  validarFechaPasada(control: AbstractControl) {
    if (!control.value) return null; // si no hay valor, no valida nada
  
    const fechaSeleccionada = new Date(control.value);
    const ahora = new Date();
  
    if (fechaSeleccionada < ahora) {
      return { fechaPasada: true };
    }
    return null;
  }
  



}
