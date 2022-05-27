import { Component, OnInit } from '@angular/core';
/* import { NgForm } from '@angular/forms'; */
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /*public registerForm: FormGroup;*/
  public registerForm: FormGroup;
  public user: User = new User();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    //Using form group
    /*this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    })*/

    //Using form Builder
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      sendCatalog: false
    })
  }

  public saveData():void{
    console.log(this.registerForm);
    console.log('valeurs', JSON.stringify(this.registerForm.value));
    console.log();
  }

  public fillFormData(){
    this.registerForm.setValue({ //utiliser patchValue si on ne veut pas remplir toutes les valeurs du formulaire.
      firstName: 'Loico',
      lastName: 'Square',
      email: 'Loicsan07@gmail.com',
      sendCatalog: true
    })
  }

}
