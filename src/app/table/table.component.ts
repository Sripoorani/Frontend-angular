import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareService } from '../share.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  userList:any=[];
  editMode:any = true;
  buttonClickSubscription: any;
  @Input() users: any[] = [];
  API_SERVER="http://localhost:3000"
  
  constructor(private http:HttpClient,private shareService:ShareService) {
    
  }
  ngOnInit(){
    this.getapiData()
    this.buttonClickSubscription = this.shareService.buttonClicked$.subscribe(() => {
      window.location.reload();
    }); 
  }


getapiData(){
   this.http.get('http://localhost:3000/user/get').subscribe((res=>{
    this.userList=res
    
   }))
}

editUser(userIndex: number, updatedUserData: any) {
    this.users[userIndex] = updatedUserData;
  }
 updateUser(user:any){
     this.http.put(`${this.API_SERVER}/user/${user.user_id}/update`, user).subscribe((res)=>{
      alert("Updated Successfully")
        this.editMode=true
        this.getapiData()
     })
  }

  toggleEditMode(){
    this.editMode=false
  }

  deleteUser(id: number){
    this.http.delete('http://localhost:3000/user/'+id+'/delete').subscribe((res)=>{
    alert("User Delete Successfully ")
    this.getapiData()
    });
  }
  generatePDF() {
    this.generatePDFDocument().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  generatePDFDocument() {
      return this.http.get(`http://localhost:3000/user/generate-pdf`, { responseType: 'blob' });
    }
  getPdf(): Observable<Blob> {
      return this.http.get(this.API_SERVER+"/user/generate-pdf", {
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/pdf'
        })
      });
    }
    ShowPdf(){
      this.getPdf().subscribe(
        (data: Blob) => {
          const file = new Blob([data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL,'_self');
        },
        (error: HttpErrorResponse) => {
          console.error('Error downloading PDF:', error);
        }
      );
    }
}
