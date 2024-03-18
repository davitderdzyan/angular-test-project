import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const fieldNames = [
  'provider_name',
  'provider_type',
  'expected_cost',
  'actual_cost',
  'expected_start_time',
  'expeced_end_time',
  'actual_end_time',
  'actual_start_time',
  'provided_product',
  'expected_result',
  'note',
];

// interface Item {
//    [key: string]: string | number | Date | undefined,
//   'provider_name': string | null,
//   'provider_type':string | null,
//   'expected_cost':number | null,
//   'actual_cost':number | null,
//   'expected_start_time':Date | null,
//   'expeced_end_time':Date | null,
//   'actual_end_time':Date | null,
//   'actual_start_time':Date | null,
//   'provided_product': string | null,
//   'expected_result':string | null,
//   'note':string | null
// }

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [
    MatInputModule,
    TooltipComponent,
    CustomInputComponent,
    FormsModule,
    CommonModule,
  ],
})
export class FormComponent {
  @Input() data: any = {};
  @Input() isViewMode: boolean = true;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  providedProducts: string[] = ['Provided Product 1', 'Provided Product 2'];
  products: string[] = ['Product 1', 'Product 2'];

  onChange(
    fieldName: string,
    value: string | number | Date,
    type: 'text' | 'date' | 'number'
  ): void {
    this.data[fieldName] =
      type == 'text' ? value : type == 'date' ? value : +value;
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.save.emit(this.data);
  }
}
