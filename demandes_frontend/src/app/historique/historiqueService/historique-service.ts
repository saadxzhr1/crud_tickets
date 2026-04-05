import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoriqueService {
  host = 'http://localhost:3000';
  private http = inject(HttpClient);

  getHistoriques(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/historique`);
  }
}
