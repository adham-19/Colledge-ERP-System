import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface EntityColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.css'],
})
export class EntityTableComponent {
  @Input() rows: any[] = [];
  @Input() columns: EntityColumn[] = [];
  @Input() selectable = false;
  @Output() deleteSelected = new EventEmitter<string[]>();

  private selectedIds = new Set<string>();

  toggle(id: string, checked: boolean): void {
    if (checked) this.selectedIds.add(id);
    else this.selectedIds.delete(id);
  }

  isChecked(id: string): boolean {
    return this.selectedIds.has(id);
  }

  get hasSelection(): boolean {
    return this.selectedIds.size > 0;
  }

  confirmDelete(): void {
    this.deleteSelected.emit(Array.from(this.selectedIds));
    this.selectedIds.clear();
  }
}
