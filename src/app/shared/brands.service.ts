import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StatBrand } from './models';

@Injectable({ providedIn: 'root' })
export class BrandsService {
  private readonly baseUrl = `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<Record<string, StatBrand>> {
    return this.http.get<Record<string, StatBrand>>(this.baseUrl);
  }
}
