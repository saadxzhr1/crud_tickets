import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandesService } from '../services/demandes-service';
import { CommonModule } from '@angular/common';
import { HistoriqueComponent } from '../../historique/historique-component/historique-component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-demandes-component',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HistoriqueComponent, 
    FormsModule,
    MatFormFieldModule, 
    MatSelectModule],
  templateUrl: './demandes-component.html',
  styleUrl: './demandes-component.css',
})
export class DemandesComponent {

  demandesService = inject(DemandesService);
  demandes: any[] = [];
    
  cdr = inject(ChangeDetectorRef);

  errorMessage = '';

  ngOnInit() {
    this.loadDemandes();
  }

  //Charger les demandes
  loadDemandes(): void {
    this.demandesService.getDemandes().subscribe({
      next: (data) => {
      this.demandes = data;
      this.cdr.detectChanges();
      console.log('lines recues', data);
    },
    error: (err) => {
      this.errorMessage = 'Échec du chargement: ' + err.message;
      console.error(err);
    }
    });
  }

  //Supprimer une demande / soft delete
  deleteDemande(id: number): void {
    const confirmed = confirm('Confirmer la suppression?');

    if (!confirmed) {
      return;
    }

    this.demandesService.deleteDemande(id).subscribe({
      next: (response) => {
        this.demandes = this.demandes.filter(demande => demande.id !== id);
        this.loadDemandes();
        alert(response.message);
      },
      error: (err) => {
        console.error('Suppression a echouee!!', err);
        alert('Suppression a echouee');
      }
    });
  }


  // Filter par status
  selectedStatus = '';
  statusOptions: string[] = ['Brouillon', 'Soumise', 'Validée'];
  get filteredDemandes() {
    if (!this.selectedStatus) {
      return this.demandes;
    }
    return this.demandes.filter(demande => demande.status === this.selectedStatus);
  }


  // Afficher l'historique d'une seul demande
  expandedId: number | null = null;
  toggleHistorique(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }


}
