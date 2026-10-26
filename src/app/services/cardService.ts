import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CardDTO {
  id?: number;
  nome: string;
  status: boolean;
  tipoCartao: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';
  numeroCartao?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly apiUrl = 'http://localhost:8080/card';
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCards(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createCard(card: CardDTO, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?id=${userId}`, card, { headers: this.getAuthHeaders() });
  }

  updateCard(numeroCartao: number, card: CardDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${numeroCartao}`, card, { headers: this.getAuthHeaders() });
  }

  toggleStatusCard(numeroCartao: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${numeroCartao}`, {});
  }

  deleteCard(numeroCartao: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${numeroCartao}`, { headers: this.getAuthHeaders() });
  }
}