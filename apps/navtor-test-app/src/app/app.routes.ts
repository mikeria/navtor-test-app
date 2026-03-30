import { Route } from '@angular/router';
import { VesselsView } from './pages/vessels/VesselsView';
import { EmissionsView } from './pages/emissions/EmissionsView';

export const appRoutes: Route[] = [
  {
    path: '',
    component: VesselsView,
  },
  {
    path: 'vessels',
    component: VesselsView,
  },
  {
    path: 'emissions',
    component: EmissionsView,
  },
];
