import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      userRole: ['ADMIN']
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; 

    const dadosDoFormulario = this.registerForm.value;

    const userData = {
      nome: dadosDoFormulario.nome,
      email: dadosDoFormulario.email,
      senha: dadosDoFormulario.senha
    };

  
    this.authService.register(userData).subscribe({
      next: (resposta) => {
        console.log('Deu certo!', resposta);
        this.isLoading = false;
        
    
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.log('Deu erro:', erro);
        this.isLoading = false;

        if (erro.status === 400) {
          this.errorMessage = 'Este e-mail já está cadastrado.';
        } else {
          this.errorMessage = 'Ocorreu um erro no servidor. Tente mais tarde.';
        }
      }
    });
  }
}