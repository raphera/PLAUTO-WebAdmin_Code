import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "https://api.adorable.io/avatars/285/" + Math.floor((Math.random() * 1000) + 1) + "@adorable.io.png";

  validation_messages = {
    'name': [
      { type: 'required', message: 'Nome é necessário.' }
    ],
    'surname': [
      { type: 'required', message: 'Sobrenome é necessário.' }
    ],
    'age': [
      { type: 'required', message: 'Idade é necessário.' },
    ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  randomAvatar() {
    /* 
      const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',F
      width: '400px',
    }); 
    */

    /*dialogRef. afterClosed(). subscribe(result => {
     if (result) { */
    this.avatarLink = "https://api.adorable.io/avatars/285/" + Math.floor((Math.random() * 1000) + 1) + "@adorable.io.png";
    /*  } 
  }); */
  }

  resetFields() {
    this.avatarLink = "https://api.adorable.io/avatars/285/" + Math.floor((Math.random() * 1000) + 1) + "@adorable.io.png";
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.firebaseService.createUser(value, this.avatarLink)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/inicio']);
        }
      )
  }

}
