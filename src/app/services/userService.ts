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

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createUser(userData: UserDTO): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  updateUser(id: number, userData: UserDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?email=${email}`);
  }
}