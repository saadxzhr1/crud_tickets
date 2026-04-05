import { Routes } from '@angular/router';
import { DemandesComponent } from './demandes/demandes-component/demandes-component';
import { HistoriqueComponent } from './historique/historique-component/historique-component';

export const routes: Routes = [
    { path: 'demandes', component: DemandesComponent },
    { path: 'historique', component: HistoriqueComponent },
    { path: '', redirectTo: '/demandes', pathMatch: 'full' }
];
