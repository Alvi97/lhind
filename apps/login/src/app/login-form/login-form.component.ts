import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@lhind/data-access-user';
import { inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserLogin } from '../models/user.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  selector: 'lhind-login-entry',
  template: `
    <div
      class="main-area"
      style="    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
text-align:center"
    >
      <mat-card style="padding:25px">
        <mat-card-content>
          <form [formGroup]="formGroup">
            <div style="display: flex; flex-direction: column;">
              <h2 style="margin-bottom:20px">Login</h2>

              <mat-form-field>
                <mat-label> UserName </mat-label>
                <input matInput formControlName="username" />
              </mat-form-field>

              <mat-form-field>
                <mat-label> Password </mat-label>
                <input
                  matInput
                  type="password"
                  required
                  formControlName="password"
                />
              </mat-form-field>

              <div
                style="display: flex; justify-content: center; margin-top: 32px;"
              >
                <button
                  mat-flat-button
                  color="primary"
                  (click)="login()"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: white;
      }
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        transition: background-color 0s 600000s, color 0s 600000s !important;
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
    password: new FormControl('', Validators.required),
  });


  public login() {
    this.userService.login(this.formGroup.value as UserLogin);
  }
}
