import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { NoteServicesService } from '../note-services.service';
import { note } from '../note.Model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html'
})
export class NoteListComponent implements OnInit {
  
  noteList:note[] = [];
  modalRef!: BsModalRef;
  form!:FormGroup;
  submitted:boolean=false;
  currentNoteId!:number;
  constructor(
    private noteService:NoteServicesService,
    private modalService: BsModalService,
    private formbuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.GetNoteList()
  }

  get f(){
    return this.form.controls
  }

  AddNewNote(template: TemplateRef<any>){
    this.submitted = false;
    this.form = this.formbuilder.group({
      title:['',Validators.required],
      body:['',Validators.required],
    })

      this.modalRef = this.modalService.show(template);
      this.modalRef.onHidden?.subscribe(res=>{
        this.GetNoteList()
      })
  }

  GetNoteList(){
    this.noteList = this.noteService.GetNotes()
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
        this.GetNoteList()
        Swal.fire(
          'Deleted!',
          'Note has been deleted.',
          'success'
        )
      }
    })
  }

  EditNote(template: TemplateRef<any>,note:note){
    this.currentNoteId = note.id
    this.submitted = false;
    this.form = this.formbuilder.group({
      title:[note.title,Validators.required],
      body:[note.body,Validators.required],
    })

      this.modalRef = this.modalService.show(template);
      this.modalRef.onHidden?.subscribe(res=>{
        this.GetNoteList()
      })
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){return}
    console.log(this.form)

    let note:note={
      id:Math.random(),
      title:this.form.value.title,
      body:this.form.value.body,
      creationDate:new Date()
    }


    this.noteService.AddNote(note)
    this.modalRef.hide()

  }


  Update(){
    this.submitted = true;
    if(this.form.invalid){return}
    let note:note={
      id:this.currentNoteId,
      title:this.form.value.title,
      body:this.form.value.body,
      creationDate: new Date()
    }
    this.noteService.UpdateNote(note)
    this.modalRef.hide()
  }

  EmptyNotes(){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Empty it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.EmptyNotes()
        this.GetNoteList()
        Swal.fire(
          'Deleted!',
          'List has been deleted.',
          'success'
        )
      }
    })
  }
}
