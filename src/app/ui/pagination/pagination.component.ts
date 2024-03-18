import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() itemsPerPage: number = 10;
  @Input() iteration: number = 0;
  @Input() count: number = 0;
  @Input() paginationClass: string = '';

  @Output() backClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() forwardClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  back(): void {
    this.backClicked.emit();
  }

  forward(): void {
    this.forwardClicked.emit();
  }

  get startIndex(): number {
    return this.iteration * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    const endIndex = (this.iteration + 1) * this.itemsPerPage;
    return endIndex > this.count ? this.count : endIndex;
  }
}
