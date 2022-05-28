import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from '../common/interceptors/apikey.interceptor';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'lobby', pathMatch: 'full' },
  {
    path: 'game/:id',
    loadChildren: () =>
      import('../pages/game/game.module').then((m) => m.GamePageModule),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('../pages/history/history.module').then(
        (m) => m.HistoryPageModule
      ),
  },
  {
    path: 'logs',
    loadChildren: () =>
      import('../pages/logs/logs.module').then((m) => m.LogsPageModule),
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('../pages/lobby/lobby.module').then((m) => m.LobbyPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
})
export class MainModule {}
