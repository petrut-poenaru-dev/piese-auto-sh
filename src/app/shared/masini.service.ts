import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Masina, TipMasina } from './models';

@Injectable({ providedIn: 'root' })
export class MasiniService {
  private readonly baseUrl = `${environment.apiUrl}/masini`;

  constructor(private http: HttpClient) {}

  getAll(tip?: TipMasina): Observable<Masina[]> {
    const params = tip ? new HttpParams().set('tip', tip) : undefined;
    return this.http.get<Masina[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Masina> {
    return this.http.get<Masina>(`${this.baseUrl}/${id}`);
  }

  getSimilare(id: string, limit = 3): Observable<Masina[]> {
    return this.http.get<Masina[]>(`${this.baseUrl}/${id}/similare`, { params: { limit } });
  }
}
