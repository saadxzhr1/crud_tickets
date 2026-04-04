import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandesService } from '../../services/demandes-service';
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
  
  demandeForm = {
    titre: '',
    details: '',
    status: '',
  };

  // updateId!: number;

  ngOnInit() {
    this.loadDemandes();
  }

  //Charger les demandes
  loadDemandes(): void {
    this.demandesService.getDemandes().subscribe({
      next: (data) => {
      console.log('items received', data);
      this.demandes = data;
    },
    error: (err) => {
      console.error('load failed', err);
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
        alert(response.message);
        this.demandes = this.demandes.filter((demande: any) => demande.id !== id);
        this.loadDemandes();
      },
      error: (err) => {
        console.error('Suppression a echouee!!', err);
        alert('Suppression a echouee');
      }
    });
  }

  selectedStatus = '';
  statusOptions: string[] = ['Brouillon', 'Soumise', 'Validée'];
  get filteredDemandes(): any[] {

    if (!this.selectedStatus) {
      return this.demandes;
    }

    return this.demandes.filter(demande => demande.status === this.selectedStatus);
  }

  
  // Modifier une demande
  // editDemande(demande: any): void {
  //   this.updateId = demande.id;
  //   this.demandeForm = {
  //     titre: demande.titre,
  //     details: demande.details,
  //     status: demande.status
  //   };
  //   this.demandesService.updateDemande(this.updateId, this.demandeForm).subscribe({
  //       next: () => {
  //         this.resetForm();
  //         this.loadDemandes();
  //       },
  //       error: (err) => {
  //         console.error('Update failed', err);
  //       }
  //     });
  // }


  // addDemande() {
  //   this.demandesService.add(this.form).subscribe(() => {
  //     this.form.titre = '';
  //     this.loadDemandes();
  //   });
  // }

  // resetForm(): void {
  //   this.updateId = 0;
  //   this.demandeForm = {
  //     titre: '',
  //     details: '',
  //     status: ''
  //   }
  // }
}
