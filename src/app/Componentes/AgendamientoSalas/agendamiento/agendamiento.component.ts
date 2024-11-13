import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule} from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';



@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [CommonModule, ScheduleModule],
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})
export class AgendamientoComponent { 

  public currentView: View = 'Month';
  public selectedDate: Date = new Date(2021, 7, 26);

  public data: DataManager = new DataManager({
    url: 'http://localhost:54738/Home/LoadData',
    crudUrl:'http://localhost:54738/Home/UpdateData',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  })

  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  }

}
