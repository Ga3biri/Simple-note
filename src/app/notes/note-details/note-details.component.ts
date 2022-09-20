import { NoteServicesService } from './../note-services.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { note } from '../note.Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html'
})
export class NoteDetailsComponent implements OnInit {


  modalRef!: BsModalRef;
  note!:note;
  form!:FormGroup;
  submitted:boolean = false;
  constructor(
    private route:ActivatedRoute,
    private noteService:NoteServicesService,
    private router:Router,
    private formbuilder:FormBuilder,
    private modalService: BsModalService,


    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.GetNoteById(params.id)
    })
    this.form = this.formbuilder.group({
      title:[this.note.title,Validators.required],
      body:[this.note.body,Validators.required],
    })
  }

  get f() {return this.form.controls}

  GetNoteById(noteId:number){
    this.note = this.noteService.GetNoteById(noteId)
  }

  DeleteNote(note:note){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.DeleteNote(note)
        this.router.navigateByUrl('')
        Swal.fire(
          'Deleted!',
          'Note has been deleted.',
          'success'
        )
      }
    })
    
  }

  EditNote(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
      this.modalRef.onHidden?.subscribe(res=>{
        this.GetNoteById(this.note.id)
      })
  }

  Update(){
    this.submitted = true;
    if(this.form.invalid){return}
    let note:note={
      id:this.note.id,
      title:this.form.value.title,
      body:this.form.value.body,
      creationDate: new Date()
    }
    this.noteService.UpdateNote(note)
    this.modalRef.hide()
  }
}
