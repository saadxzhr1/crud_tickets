import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandesService } from '../services/demandes-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demandes-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './demandes-component.html',
  styleUrl: './demandes-component.css',
})
export class DemandesComponent {

  name = new FormControl('');

  demandesService = inject(DemandesService);
  demandes: any[] = [];
  
  selectedStatus = '';
  statusOptions: string[] = ['Brouillon', 'Soumise', 'Validée'];
  errorMessage = '';
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadDemandes();
  }

  //Charger les demandes
  loadDemandes(): void {
    this.demandesService.getDemandes().subscribe({
      next: (data) => {
      this.demandes = [...data];
      this.cdr.detectChanges();
      console.log('lines recues', data);
    },
    error: (err) => {
      this.errorMessage = 'Échec du chargement: ' + err.message;
      console.error(err);
    }
    });
  }

  //Supprimer une demande
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
  get filteredDemandes() {

    if (!this.selectedStatus) {
      return this.demandes;
    }

    return this.demandes.filter(demande => demande.status === this.selectedStatus);
  }

}
