import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
