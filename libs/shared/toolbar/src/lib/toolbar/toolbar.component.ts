import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '@lhind/data-access-user';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatMenu,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  selector: 'lhind-toolbar',
  template: `
      <div style="height: 100%; display: flex; align-items: center; padding: 0 48px 0 16px;">
        <mat-icon
          (click)="router.navigate([''])"
        >books</mat-icon>

        <span class="app-name">Expense Managment System</span>
      </div>



      @if (userService.getCurrentUser()){
          <div class="auth-area" style="display: flex;justify-content: center;align-items: center">

            <div
              style="display: flex; align-items: center; gap: 10px; height: 48px"
            >
              <div>
            <span
              style="font-size: 14px; font-weight: 400;">Welcome</span>

                @if (userService.getCurrentUser()?.username) {
                  <span style="font-size: 14px; font-weight: bold;">, {{ userService.getCurrentUser()?.username }}</span>
                }
              </div>

              <!-- <mat-icon svgIcon="sof-user-account" style="width: 32px; height: 32px;"></mat-icon> -->


              <div>
              <button mat-mini-fab [matMenuTriggerFor]="menu">
                <mat-icon>account_circle</mat-icon>
              </button>
              <mat-menu #menu="matMenu" style="display: flex; flex-direction: column; gap: 6px;">
                @if (userService.getCurrentUser()?.username) {
                  <button mat-menu-item (click)="userService.logout()">
                    <mat-icon style="color: #535353;">logout</mat-icon>
                    Logout
                  </button>
                }
                <div >

                </div>
              </mat-menu>
              </div>
            </div>

          </div>



      }

  `,
  styles: [
    ` :host {
            width: 100%;
        display:flex;
        color:white;
        justify-content: space-between;
        margin: 0 10px;
        }
    `,
  ],
})
export class ToolbarComponent {

  public userService = inject(UserService);

  public router = inject(Router);

}

