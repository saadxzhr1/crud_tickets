import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HistoriqueService } from '../historiqueService/historique-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-component.html',
  styleUrl: './historique-component.css',
})
export class HistoriqueComponent {

  
  historiqueService = inject(HistoriqueService);
  historiques: any[] = [];

  errorMessage = '';

  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadHistoriques();
  }

  loadHistoriques(): void {
    this.historiqueService.getHistoriques().subscribe({
      next: (data) => {
      this.historiques = data;
      this.cdr.detectChanges();
      console.log('Lignes reçues', data);
    },
    error: (err) => {
      this.errorMessage = 'Échec du chargement: ' + err.message;
      console.error(err);
    }
    });
  }
}
