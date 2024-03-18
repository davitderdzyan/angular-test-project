import { Component } from '@angular/core';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { FilterComponent } from '../filter/filter.component';
import { TableContainerComponent } from '../table-container/table-container.component';

export type Field = {
  displayName: string;
  systemName: string;
  type: 'string' | 'number' | 'date';
};

export type Item = {
  id: string | null;
  provider_name: string | null;
  provider_type: string | null;
  expected_cost: number | null;
  actual_cost: number | null;
  expected_start_time: Date | null;
  expeced_end_time: Date | null;
  actual_end_time: Date | null;
  actual_start_time: Date | null;
  provided_product: string | null;
  expected_result: string | null;
  note: string | null;
};

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [
    TooltipComponent,
    CommonModule,
    FormComponent,
    FormsModule,
    PaginationComponent,
    FilterComponent,
    TableContainerComponent,
  ],
})
export class MainComponent {
  itemsPerPage = 50;
  iteration = 0;
  isFormOpen: boolean = false;
  search: string = '';
  isViewMode = false;
  data: any[] = [];
  formData: Item = {
    id: null,
    provider_name: null,
    provider_type: null,
    expected_cost: null,
    actual_cost: null,
    expected_start_time: null,
    expeced_end_time: null,
    actual_end_time: null,
    actual_start_time: null,
    provided_product: null,
    expected_result: null,
    note: null,
  };
  displayData: Item[] = [];

  fieldNames: Field[] = [
    {
      displayName: 'Provider name',
      systemName: 'provider_name',
      type: 'string',
    },
    {
      displayName: 'Provider type',
      systemName: 'provider_type',
      type: 'string',
    },
    {
      displayName: 'Expected cost',
      systemName: 'expected_cost',
      type: 'number',
    },
    { displayName: 'Actual cost', systemName: 'actual_cost', type: 'number' },
    {
      displayName: 'Expected start time',
      systemName: 'expected_start_time',
      type: 'date',
    },
    {
      displayName: 'Actual end time',
      systemName: 'actual_end_time',
      type: 'date',
    },
    {
      displayName: 'Expected end time',
      systemName: 'expected_end_time',
      type: 'date',
    },
    {
      displayName: 'Actual start time',
      systemName: 'actual_start_time',
      type: 'date',
    },
    {
      displayName: 'Provided product',
      systemName: 'provided_product',
      type: 'string',
    },
    {
      displayName: 'Expected result',
      systemName: 'expected_result',
      type: 'string',
    },
    { displayName: 'Note', systemName: 'note', type: 'string' },
  ];

  add(item: any): void {
    item['id'] = this.data.length + '';
    this.data.push(item);
    this.filter();
    this.isFormOpen = false;
    this.resetFormData();
  }

  openViewMode(item: any): void {
    this.data = this.data.filter((it) => it.id !== item.id);
    this.isFormOpen = true;
    this.isViewMode = true;
    if (Object.keys(this.formData).length > 0) {
      this.data.push(this.formData);
    }
    this.filter();
    this.formData = { ...item };
  }

  addItem(): void {
    this.isFormOpen = true;
    this.isViewMode = false;
    this.data.push(this.formData);
    this.filter();
    this.resetFormData();
  }

  onFormCancel(): void {
    this.isFormOpen = false;
    this.data.push(this.formData);
    this.filter();
    this.resetFormData();
  }

  private resetFormData() {
    this.formData = {
      id: null,
      provider_name: null,
      provider_type: null,
      expected_cost: null,
      actual_cost: null,
      expected_start_time: null,
      expeced_end_time: null,
      actual_end_time: null,
      actual_start_time: null,
      provided_product: null,
      expected_result: null,
      note: null,
    };
  }

  filter(): void {
    this.displayData = this.data.filter((item) =>
      Object.values(item).some((val: any) => {
        if (typeof val === 'string') {
          return val.includes(this.search);
        } else if (typeof val === 'number') {
          return (val + '').includes(this.search);
        }
        return false;
      })
    );
  }

  back(): void {
    if (this.iteration > 0) {
      this.iteration--;
    }
  }

  forward(): void {
    if (this.iteration < this.displayData.length % this.itemsPerPage) {
      this.iteration++;
    }
  }
}
