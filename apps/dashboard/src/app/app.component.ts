import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from '@lhind/footer';
import { ToolbarComponent } from '@lhind/toolbar';

@Component({
  imports: [RouterModule, ToolbarComponent, MatSidenavModule, FooterComponent],
  selector: 'lhind-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
}
