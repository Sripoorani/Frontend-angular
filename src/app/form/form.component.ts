import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  userForm: FormGroup;

  ngOnit(){
   
  }
  constructor(private shareService:ShareService,private formBuilder: FormBuilder,private router:Router,private http:HttpClient) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phonenumber: [''],
      address: ['']
    });
  }

  onSubmit() {
  
    const nameValue = this.userForm.get('name')!.value;
    const emailValue = this.userForm.get('email')!.value;
    const phoneValue = this.userForm.get('phonenumber')!.value;
    const addressValue = this.userForm.get('address')!.value;

    const formData = {
      username: nameValue,
      email: emailValue,
      phone_number: phoneValue,
      address: addressValue
    };
  
    this.http.post<any>('http://localhost:3000/user/create', formData)
    .subscribe(response => {
    
    });
    this.shareService.notifyButtonClick();
    this.userForm.reset();

  }
}
