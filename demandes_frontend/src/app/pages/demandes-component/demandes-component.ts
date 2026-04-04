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

  
  demandes: any[] = [];
  demandesService = inject(DemandesService);


  ngOnInit() {
    this.loadDemandes();
  }

  loadDemandes() {
    this.demandesService.getDemandes().subscribe((data: any[]) => {
      this.demandes = data;
    });
  }

  // addDemande() {
  //   this.demandesService.add(this.form).subscribe(() => {
  //     this.form.titre = '';
  //     this.loadDemandes();
  //   });
  // }
}
