import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lhind-footer',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="footer"
    style="background-color: var(--primary);height: 60px;display:flex;justify-content: center;
    text-align: center;
    align-items: center;"
  >
    <span style="cursor: pointer; color: white"> Alvi Lika </span>
  </div>`,
})
export class FooterComponent {}
