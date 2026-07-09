import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MasinaDezmembrare } from './models';

@Injectable({ providedIn: 'root' })
export class DezmembrariService {
  private readonly baseUrl = `${environment.apiUrl}/dezmembrari`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MasinaDezmembrare[]> {
    return this.http.get<MasinaDezmembrare[]>(this.baseUrl);
  }

  getByBrand(brandKey: string): Observable<MasinaDezmembrare[]> {
    return this.http.get<MasinaDezmembrare[]>(`${this.baseUrl}/brand/${brandKey}`);
  }

  getById(id: string): Observable<MasinaDezmembrare> {
    return this.http.get<MasinaDezmembrare>(`${this.baseUrl}/${id}`);
  }
}
