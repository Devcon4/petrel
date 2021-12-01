import { IRoute } from 'router-slot';

export const routes: Array<IRoute> = [
  {
    path: 'home',
    component: async () => await import('../components/example')
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];