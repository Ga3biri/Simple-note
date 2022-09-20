import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesModule } from './notes/notes.module';

const routes: Routes = [
  {path:'',loadChildren:()=>NotesModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
