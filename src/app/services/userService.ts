import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDTO {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/user';
  constructor(private http: HttpClient) {}

  // GET /user - Listar todos os utilizadores
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST /user - Criar novo utilizador comum
  createUser(userData: UserDTO): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // PUT /user/{id} - Atualizar utilizador[cite: 1]
  updateUser(id: number, userData: UserDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  // DELETE /user?email=... - Deletar utilizador por email
  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?email=${email}`);
  }
}