import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, RendererStyleFlags2 } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, AfterViewInit {

  public events: any[];
  public options: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      slotMinTime: "00:00:00",
      slotMaxTime: "24:00:00",
      slotDuration: "01:00:00",
      contentHeight: 1500,
      expandRows: true,
      locale: esLocale,
      dayHeaderFormat: { weekday: 'long', day: 'numeric' },//dayHeaderFormat: { day: 'numeric', weekday: 'short' }, //Solo tres letras
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      titleFormat: { year: 'numeric', month: 'long' }, // Personaliza el título de la vista de la semana
      editable: true,
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
      allDaySlot: false,  

    };

    this.events = [
      {
        title: "Laboratorio de quimica",
        start: new Date().setHours(8, 0, 0, 0),
        description: "Evento 1"
      },
      {
        title: "Laboratorio de quimica",
        start: new Date().setHours(4, 0, 0, 0),
        description: "Evento 1"
      },
      {
        title: "Sala de sistemas",
        start: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(6, 0, 0, 0),
        description: "Evento 2"
      },
      {
        title: "Metereologia",
        start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(3, 0, 0, 0),
        description: "Evento 3"
      },
      {
        title: "Ornamentación",
        start: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(4, 0, 0, 0),
        description: "Evento 3"
      },
    ];
    
    

  }
  
  
  

  handleEventClick(eventInfo: any) {
    const event = eventInfo.event;
    alert(`Evento: ${event.title}\nFecha de inicio: ${event.start}\nDescripción: ${event.extendedProps.description}`);
  }

  handleEventDrop(eventInfo: any) {
    const event = eventInfo.event;
    alert(`El evento "${event.title}" ha sido movido a ${event.start}`);
  }





  //para los estilos directamente en el dom
  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.fc-col-header-cell-cushion');
    elements.forEach((element: any) => {
      this.renderer.setStyle(element, 'color', 'rgb(30, 43, 55)');
      this.renderer.setStyle(element, 'font-weight', 'normal');
      this.renderer.setStyle(element, 'text-decoration', 'none');
    });
  }
}
