import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { UserService } from './user.service';
import { error } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[]=[];
  user;
  msg: string;
  userFrm:FormGroup;
  btnName:string='Add';
  EditUserID:number;
  constructor(private fb:FormBuilder, private userService:UserService){

  }
  ngOnInit(){
   this.InitForm();
    this.LoadUser();
  }
  InitForm(){
    this.userFrm=this.fb.group({
      Id: [],
      FirstName: ['', Validators.required],
      LastName: [''],
      Gender: ['']
    }  
    )
  }
  LoadUser():void{
      this.userService.get().subscribe(data=>this.users=data);
  }
  onSubmit(){
    if (this.btnName=='Add'){
      this.userService.post(this.userFrm.value).subscribe(data=>{
        if(data==1)    
        {        
          this.msg = "Data successfully added.";
          this.LoadUser();
        }
        else {
          this.msg = "There is some issue in saving records, please contact to system administrator!"
        }
      },
      error =>{this.msg=error}  
  
      );    
    }
    else
    {
      this.btnName="Add";
      console.log(this.userFrm.value);
      this.userService.put(this.EditUserID,this.userFrm.value).subscribe(data=>
      {
        if (data==1)
        {
          this.msg="Data successfully updated."
          this.LoadUser();          
        }else {
          this.msg = "There is some issue in saving records, please contact to system administrator!"
        }
      },
      error =>{this.msg=error}  
      )
      this.InitForm();
      
    }
    
  }
  editUser(userModel:any):void{
    this.userFrm=this.fb.group({
      Id: [],
      FirstName: [userModel.FirstName, Validators.required],
      LastName: [userModel.LastName],
      Gender: [userModel.Gender]
    }  
   
    )
    console.log(userModel.Id)
    this.EditUserID=userModel.Id;
    this.btnName='Update';
  }
  deleteUser(id:number):void{
    this.userService.delete(id).subscribe(
      data=>{
        if (data==1) 
        {
          this.msg = "Data successfully deleted.";
          this.LoadUser();
        }
      },
        error =>{this.msg=error} 
      
    )
  }
}
