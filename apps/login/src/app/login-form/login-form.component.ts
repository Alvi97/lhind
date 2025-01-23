import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@lhind/data-access-user';
import { inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatFormFieldModule],
  selector: 'lhind-login-entry',
  template: `
    <form [formGroup]="formGroup" >
      <div class="main-area"  style="display: flex;justify-content:center;text-align:center"> 
        <div style="display: flex; flex-direction: column;">

          <h2>
           Login
          </h2>

          <mat-form-field>
            <mat-label>
            UserName
            </mat-label>
            <input matInput type="text" required formControlName="username">
          </mat-form-field>

          <mat-form-field>
            <mat-label>
             Password
            </mat-label>
            <input matInput type="password" required formControlName="password">
          </mat-form-field>

          <div style="display: flex; justify-content: center; margin-top: 32px;">
            <button
              [disabled]="formGroup.invalid"
              mat-flat-button
              color="primary"
              (click)="login()"
            >
             Login
            </button>
          </div>
        </div>
      </div>
    </form>

  `,
  styles: [
    `
      .login-app {
        width: 30vw;
        border: 2px dashed black;
        padding: 8px;
        margin: 0 auto;
      }
      .login-form {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 8px;
      }
      label {
        display: block;
      }
    `,
  ],
})
export class LoginFormComponent {
  private userService = inject(UserService);
  username = '';
  password = '';

  public formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isLoggedIn$ = this.userService.isUserLoggedIn$;

  login() {
    this.userService.checkCredentials(this.username, this.password);
  }
}