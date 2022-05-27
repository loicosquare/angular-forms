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
      phone: '',
      notification: 'email',
      rating: [null, [ratingRangeValidator]],
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
    this.registerForm.patchValue({ //utiliser patchValue si on ne veut pas remplir toutes les valeurs du formulaire.
      firstName: 'Loico',
      lastName: 'Square',
      email: 'Loicsan07@gmail.com',
      sendCatalog: true
    })
  }

  public setNorificationSetting(method:string):void{
    const phoneControl =  this.registerForm.get('phone');
    if (method === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

}
