import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { TooltipComponent } from '../tooltip/tooltip.component';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // This is how your date will be parsed from input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // This is how your date will be displayed in the input
    monthYearLabel: 'MMMM YYYY', // Optional: Customize month and year label
    dateA11yLabel: 'LL', // Optional: Customize accessibility label
    monthYearA11yLabel: 'MMMM YYYY', // Optional: Customize accessibility label for month and year
  },
};

@Component({
  selector: 'app-custom-input',
  standalone: true,
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  imports: [
    MatInputModule,
    TooltipComponent,
    MatDatepickerModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerToggle,
    CommonModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class CustomInputComponent implements OnInit, OnChanges {
  @Input() value: string | number | Date = '';
  @Input() name: string = '';
  @Input() hint: string = '';
  @Input() placeholder: string = '';
  @Input() isMultiline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'text' | 'date' | 'dropdown' | 'number' = 'text';
  @Input() values: string[] = [];
  @Output() dataChange = new EventEmitter<string | number | Date>();
  displayDate: Date | null = null;

  ngOnInit(): void {
    if (this.value && this.type == 'date') {
      this.displayDate = this.value as Date;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.value && this.type == 'date') {
      this.displayDate = this.value as Date;
    } else {
      this.displayDate = null;
    }
  }

  onChange(event: any): void {
    if (this.type == 'dropdown') {
      this.value = event.value;
    } else if (this.type == 'date') {
      this.value = event.value;
    } else {
      this.value = event.target.value;
    }
    this.dataChange.emit(this.value);
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    this.value = newValue + '';
    inputElement.value = this.value;
    this.dataChange.emit(this.value);
  }

  onDateChange(event: any, input: HTMLInputElement): void {
    this.value = input.value;
    this.displayDate = event.value;
    this.dataChange.emit(event.value);
  }
}
