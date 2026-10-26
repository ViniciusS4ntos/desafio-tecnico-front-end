
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface RegisterDTO {
  nome: string;
  email: string;
  senha: string;
}

// Dados que o usuário precisa informar para fazer login
export interface AuthenticationDTO {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // caso for tudo localhost
  private readonly apiUrl = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) {}

  register(data: RegisterDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  // login e guarda o token recebido
  login(credentials: AuthenticationDTO): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap((token) => {
          localStorage.setItem('auth_token', token);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove o token quando o usuario sai da conta
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Verifica se existe um token salvo
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}