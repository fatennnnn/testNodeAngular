import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    nom: null,
    prenom : null,
    email: null,
    phone:null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = ''
  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { nom,prenom, email,phone, password } = this.form;
    this.authService.register(nom,prenom, email, phone,password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}