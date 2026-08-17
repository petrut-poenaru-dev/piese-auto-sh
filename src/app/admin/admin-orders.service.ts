import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class AdminOrdersService {
  private readonly baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  list(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  updateStatus(id: string, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${id}/status`, { status });
  }
}
