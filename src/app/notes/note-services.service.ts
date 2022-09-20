import { Injectable } from '@angular/core';
import { note } from './note.Model';

@Injectable({
  providedIn: 'root'
})
export class NoteServicesService {
  
  constructor() { }
  
  GetNotes(){
    return JSON.parse(localStorage.getItem('notelist') || '[]'!);
  }

  AddNote(note:note){
    let newNotes:note[] = JSON.parse(localStorage.getItem('notelist') || '[]');
    newNotes.push(note);
    localStorage.setItem("notelist",JSON.stringify(newNotes));
  }

  DeleteNote(note:note){
    let noteArray:note[] = JSON.parse(localStorage.getItem('notelist') || '[]');
    let FoundedIndexNote= noteArray.findIndex((obj:note)=>{
      return obj.title === note.title
    })
    noteArray.splice(FoundedIndexNote,1)
    localStorage.setItem("notelist",JSON.stringify(noteArray))
  }

  UpdateNote(note:note){
    let noteArray:note[] = JSON.parse(localStorage.getItem('notelist') || '[]');
    let FoundedIndexNote= noteArray.findIndex((obj:note)=>{
      return obj.id == note.id
    })
    noteArray.splice(FoundedIndexNote,1,note)
    localStorage.setItem("notelist",JSON.stringify(noteArray))
  }

  GetNoteById(noteId:number){
    let noteArray:note[] = JSON.parse(localStorage.getItem('notelist') || '[]');
    return noteArray.find(obj=>{
      return obj.id == noteId
    }) as note
  }
  EmptyNotes(){
    localStorage.removeItem('notelist')
  }
}
