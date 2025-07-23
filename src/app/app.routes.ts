import { Routes } from '@angular/router';
import { CurrentIndices } from './components/pages/current-indices/current-indices';
import { HistoricIndices } from './components/pages/historic-indices/historic-indices';
import { CurrentAlerts } from './components/pages/current-alerts/current-alerts';
import { About } from './components/pages/about/about';

export const routes: Routes = [
    { path: 'current-indices', component: CurrentIndices },
    { path: 'historic-indices', component: HistoricIndices },
    { path: 'current-alerts', component: CurrentAlerts },
    { path: 'about', component: About }, 
    { path: '', redirectTo: '/current-indices', pathMatch: 'full' },
    { path: '**', redirectTo: '/current-indices' },
];

/**
 * consider lazy loading with something like
 * ```
 * { path: 'current-indices', loadComponent: () => import('./pages/current-indices/current-indices.component').then(m => m.CurrentIndicesComponent) },
 * ```
 * instead
 */
