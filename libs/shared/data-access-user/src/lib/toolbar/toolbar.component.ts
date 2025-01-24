import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatMenu,
    MatIconModule,
  ],
  selector: 'lhind-toolbar',
  template: `
      <div style="height: 100%; display: flex; align-items: center; padding: 0 48px 0 16px;">
        <mat-icon
          (click)="router.navigate([''])"
        >home</mat-icon>

        <span class="app-name">Expense Managment System</span>
      </div>


      <div *ngIf="authInfo$ | async as authInfo" class="auth-area">
        <div class="auth-area" style="padding-right: 24px; display: flex;">

          <div
            style="display: flex; align-items: center; gap: 10px; height: 48px"
          >
            <div>
            <span
              style="font-size: 14px; font-weight: 400;">Welcome</span>

<!--              @if (authInfo.username !== null) {-->
<!--                <span style="font-size: 14px; font-weight: bold;">, {{ authInfo.username }}</span>-->
<!--              }-->
            </div>

            <!-- <mat-icon svgIcon="sof-user-account" style="width: 32px; height: 32px;"></mat-icon> -->

            <mat-icon
              fontSet="material-symbols-outlined"
              style="font-size: 32px; width: 32px; height: 32px;"
            >account_circle
            </mat-icon>
          </div>
        </div>

        <mat-menu #profileMenu xPosition="before">
          <div style="min-width: 280px; display: flex; flex-direction: column; gap: 6px;">
<!--            @if (authInfo.username !== null) {-->
<!--              <button mat-menu-item (click)="onLogout()">-->
<!--                Logout-->
<!--                <mat-icon style="color: #535353;">logout</mat-icon>-->
<!--              </button>-->
<!--            }-->
          </div>
        </mat-menu>
      </div>

  `,
  styles: [
    ` :host {
            width: 100%;
        display:flex;
        color:white;
        justify-content: space-between;
        }
    `,
  ],
})
export class ToolbarComponent {

  public router = inject(Router);
  public authInfo$ = of({});
}

