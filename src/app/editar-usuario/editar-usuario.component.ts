import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

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
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      age: [this.item.age, Validators.required]
    });
  }

  randomAvatar() {
    this.item.avatar = "https://api.adorable.io/avatars/285/" + Math.floor((Math.random() * 1000) + 1) + "@adorable.io.png";
  }

/*   openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.link;
      }
    });
  } */

  onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/inicio']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/inicio']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/inicio']);
  }

}
