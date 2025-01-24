import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '@lhind/data-access-user';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  imports: [RouterModule, ToolbarComponent,MatSidenavModule],
  selector: 'lhind-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
}
