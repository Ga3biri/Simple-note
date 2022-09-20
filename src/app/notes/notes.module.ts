import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    NoteListComponent,
    NoteDetailsComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[BsModalService ]
})
export class NotesModule { }
