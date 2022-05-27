import { Component, OnInit } from '@angular/core';
/* import { NgForm } from '@angular/forms'; */
import { FormGroup, FormBuilder, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from './user';

function ratingRangeValidator(min: number, max:number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } |  null => {
    if(!!c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'rangeError': true};
    }
    return null;
  }
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } |  null {
  const emailControl = c.get('email');
  const emailConfirmControl = c.get('confirmEmail');

  if(emailControl?.pristine === emailConfirmControl?.pristine){
    return null;
  }

  if(emailControl?.value === emailConfirmControl?.value){
    return null;
  }
  return { 'match': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /*public registerForm: FormGroup;*/
  public registerForm: FormGroup;
  public user: User = new User();

  public errorMessage: string;
  private validationErrorMessage = {
    required: 'Entrez votre email!',
    email: 'Email non valide!'
  }

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
      phone: '',
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }),
      notification: 'email',
      rating: [null, [ratingRangeValidator]],
      sendCatalog: false
    })

    this.registerForm.get('notification')?.valueChanges.subscribe(value => {
      this.setNotificationSetting(value);
      console.log(value);
    })

    const emailControl = this.registerForm.get('emailGroup.email');
    emailControl?.valueChanges.subscribe(val => {
      console.log(val);
      this.setMessage(emailControl);
    })
  }

  public saveData():void{
    console.log(this.registerForm);
    console.log('valeurs', JSON.stringify(this.registerForm.value));
    console.log();
  }

  public fillFormData(){
    this.registerForm.patchValue({ //utiliser patchValue si on ne veut pas remplir toutes les valeurs du formulaire.
      firstName: 'Loico',
      lastName: 'Square',
      email: 'Loicsan07@gmail.com',
      sendCatalog: true
    })
  }

  public setNotificationSetting(method:string):void{
    const phoneControl =  this.registerForm.get('phone');
    if (method === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

  private setMessage(val: AbstractControl): void {
    this.errorMessage = '';
    if ( (val.touched || val.dirty) && val.errors){
      /*this.errorMessage = Object.keys(val.errors).map(
        //key => this.validationErrorMessage[key]
      ).join('');*/
      console.log(Object.keys(val.errors));
    }
  }
}
