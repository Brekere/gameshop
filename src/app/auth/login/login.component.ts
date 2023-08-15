import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  
  // Lo independizamos de ngOnInit para poder aprovechar el tipado fuerte de Typescript
  loginform = new FormGroup({
    email: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.email] 
    }),
    password: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(4)] 
    }),
  });
  // Variable para mostrar un boton de "Cargando"
  loading = false;
  // Variable para mostrar error despues de que el usuario haga una acción.
  actionError: string | undefined;

  // Funcion encargada de llamar a un servicio de login simulado.
  async onLogin() {
    if (!this.loginform.valid) {
      this.loginform.markAllAsTouched();
      this.actionError = 'Ingrese todos los campos';
      return;
    }
    
    this.actionError = undefined;
    this.loading = true;
    const email = this.loginform.get('email')!.value;
    const password = this.loginform.get('password')!.value;
    const logged = await this.authService.login(email, password);
    this.loading = false;

    if (!logged) {
      this.loginform.markAllAsTouched();
      this.actionError = 'El usuario no existe o la contraseña es incorrecta.'; // Para los Login's siempre deja un mensaje ambigüo, nunca des detalles.
      return;
    }

    this.router.navigate(['/','module-home', 'home', 'dashboard']);
  }

  onSignIn = () => this.router.navigate(['/','module-auth', 'sign-in']);
}
