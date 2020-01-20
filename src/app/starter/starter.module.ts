import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Mantenimiento de Cliente',
      urls: [
        { title: 'Mantenimiento', url: '/dashboard' },
        { title: 'Cliente' }
      ]
    },
    component: StarterComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),DataTablesModule],
  declarations: [StarterComponent]
})
export class StarterModule {}
