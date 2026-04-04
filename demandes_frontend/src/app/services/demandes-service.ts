import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemandesService {
  host = 'http://localhost:3000';
  private http = inject(HttpClient);

  //Charger les demandes
  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/demandes`);
  }

  //supprimer une demande
  deleteDemande(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.host}/demandes/${id}`);
  }
}