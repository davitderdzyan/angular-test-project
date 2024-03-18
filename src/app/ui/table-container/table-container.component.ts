import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Field } from '../main/main.component';
type Sorting = {
  fieldName: string;
  direction: 1 | 2;
};

@Component({
  selector: 'app-table-container',
  standalone: true,
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.css',
  imports: [TooltipComponent, CommonModule, DragDropModule],
  providers: [DatePipe], // Add DatePipe to providers array
})
export class TableContainerComponent {
  @Input() fieldNames: Field[] = [];
  @Input() displayData: any[] = [];
  @Input() data: any[] = [];
  @Input() itemsPerPage: number = 0;
  @Input() iteration: number = 1;
  @Input() isFormOpen: boolean = false;
  @Input() formData: any;

  @Output() viewModeClicked: EventEmitter<any> = new EventEmitter<any>();

  currentSorting: Sorting = { fieldName: 'id', direction: 1 };

  constructor(private datePipe: DatePipe) {
    this.datePipe = new DatePipe('en-US');
  }

  sort(fieldName: string): void {
    if (this.currentSorting.fieldName !== fieldName) {
      this.currentSorting.direction = 1;
    } else {
      this.currentSorting.direction =
        this.currentSorting.direction === 1 ? 2 : 1;
    }

    this.currentSorting.fieldName = fieldName;

    this.displayData.sort((item1, item2) => {
      const value1 = item1[this.currentSorting.fieldName];
      const value2 = item2[this.currentSorting.fieldName];

      return this.compareValues(value1, value2);
    });
  }

  private compareValues(value1: any, value2: any): number {
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return this.currentSorting.direction === 1
        ? value1.localeCompare(value2)
        : value2.localeCompare(value1);
    }
    return this.currentSorting.direction === 1
      ? value1 - value2
      : value2 - value1;
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.displayData, event.previousIndex, event.currentIndex);
  }

  onViewModeClick(item: any): void {
    this.viewModeClicked.emit(item);
  }

  formatDate(value: any, type: string): string {
    if (type === 'date') {
      return this.datePipe.transform(value as Date, 'dd/MM/YYYY') ?? '';
    }
    return value;
  }
}
