import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lhind-dynamic-accordion-display',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './dynamic-accordion-display.component.html',
  styleUrl: './dynamic-accordion-display.component.css',
})
export class DynamicAccordionDisplayComponent<T> {
  @Input() object: T | null = null;
  @Input() excludeKeys: (keyof T)[] = [];

  getKeys(): (keyof T)[] {
    if (!this.object) {
      return [];
    }
    return (Object.keys(this.object) as (keyof T)[]).filter(
      (key) => !this.excludeKeys.includes(key)
    );
  }
}
