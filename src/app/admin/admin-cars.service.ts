import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AdminCar, AdminCarInput, AdminPart } from '../shared/models';

export type AdminPartInput = Omit<AdminPart, 'id'>;

@Injectable({ providedIn: 'root' })
export class AdminCarsService {
  private readonly baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  list(): Observable<AdminCar[]> {
    return this.http.get<AdminCar[]>(`${this.baseUrl}/cars`);
  }

  get(id: string): Observable<AdminCar> {
    return this.http.get<AdminCar>(`${this.baseUrl}/cars/${id}`);
  }

  create(data: AdminCarInput): Observable<AdminCar> {
    return this.http.post<AdminCar>(`${this.baseUrl}/cars`, data);
  }

  update(id: string, data: Partial<AdminCarInput>): Observable<AdminCar> {
    return this.http.put<AdminCar>(`${this.baseUrl}/cars/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cars/${id}`);
  }

  addPart(carId: string, data: AdminPartInput): Observable<AdminPart> {
    return this.http.post<AdminPart>(`${this.baseUrl}/cars/${carId}/parts`, data);
  }

  updatePart(partId: string, data: Partial<AdminPartInput>): Observable<AdminPart> {
    return this.http.put<AdminPart>(`${this.baseUrl}/parts/${partId}`, data);
  }

  removePart(partId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/parts/${partId}`);
  }
}
