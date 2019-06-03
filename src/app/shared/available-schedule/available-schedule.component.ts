import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-schedule',
  templateUrl: './available-schedule.component.html',
  styleUrls: ['./available-schedule.component.css']
})
export class AvailableScheduleComponent implements OnInit {
  days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];
  hours = [];
  maxHours = 23;
  minutes = [];
  maxMinutes = 59;
  // split = false;
  constructor() {}

  ngOnInit() {
    this.setTimeRange(this.maxHours, this.hours);
    this.setTimeRange(this.maxMinutes, this.minutes);
  }

  setTimeRange(timeRange, time) {
    for (let i = 0; i <= timeRange; i++) {
      time.push(this.formatTime(i));
    }
  }
  formatTime(value) {
    return value < 10 ? '0' + value.toString() : value.toString();
  }

  // updateServiceTime(event) {
  //  this.split = event.checked;
  // }
}
