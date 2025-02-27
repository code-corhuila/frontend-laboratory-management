import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, RendererStyleFlags2 } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservacionService } from '../../Services/reservacion.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, AfterViewInit {

  public events: any[];
  public options: any;

  public reservaForm: FormGroup;
  public mostrarModal = false;
  public fechaSeleccionada: string = '';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private reservacionService: ReservacionService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { 
     // Definir el formulario
     this.reservaForm = this.fb.group({
      titulo: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_final: ['', [Validators.required, this.validarHoraFinal.bind(this)]],
      descripcion: [''],
      cantidad_estudiantes: [1, [Validators.required, Validators.min(1)]],
      semestre: ['', Validators.required],
      grupo: ['', Validators.required]
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
      //dateClick: (event) => this.abrirFormularioReserva(event),
      dateClick: this.handleDateClick.bind(this),
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
  }



  cargarEventos() {
    this.reservacionService.obtenerListaDeReservaciones().subscribe(response => {
      if (response.data && Array.isArray(response.data)) {
        
        this.events = response.data.map(reserva => ({
          title: reserva.titulo,
          start: reserva.hora_inicio,
          end: reserva.hora_final
        }));
      } else {
        console.error("El backend no devolvió un array esperado:", response);
        this.events = [];
      }
    });
  }




  abrirFormularioReserva(event: any) {
    console.log("Evento clickeado en el calendario:", event);
    
    const fechaSeleccionada = new Date(event.date);
    const fechaFormateada = fechaSeleccionada.toISOString().slice(0, 16);
  
    this.fechaSeleccionada = fechaFormateada;
    this.mostrarModal = true;  
    this.reservaForm.patchValue({
      hora_inicio: fechaFormateada,
      hora_final: fechaFormateada
    });
  
    this.cdRef.detectChanges();
  }
  
  
  


  guardarReserva() {
    if (this.reservaForm.valid) {
      const nuevaReserva = this.reservaForm.value;

      this.reservacionService.registrarReservacion(nuevaReserva).subscribe(() => {
        this.cargarEventos();
        this.mostrarModal = false;
        this.reservaForm.reset();
        this.cdRef.detectChanges();// Asegurar que el modal desaparezca después de guardar
      });
    } else {
      alert("Por favor, complete todos los campos obligatorios.");
    }
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
    this.mostrarModal = false;
    this.cdRef.detectChanges();
  }


  //Ajustes fecha de inicio y fin por defecto
  handleDateClick(arg: any) {
    const clickedDate = new Date(arg.date);
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
      hora_inicio: formatDate(startDate),
      hora_final: formatDate(endDate)
    });
  
    console.log("Valores aplicados al formulario:", this.reservaForm.value);
  
    this.mostrarModal = true;
    this.cdRef.detectChanges();
  }
  
  
  
  
  

  validarHoraFinal(control: AbstractControl) {
    const horaInicio = this.reservaForm?.get('hora_inicio')?.value;
    const horaFinal = control.value;
  
    if (horaInicio && horaFinal && new Date(horaFinal) <= new Date(horaInicio)) {
      return { horaInvalida: true }; // Retorna error si la hora final es menor o igual a la de inicio
    }
    return null;
  }
  
  

}
