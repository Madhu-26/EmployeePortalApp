import { Component, OnInit, Input} from '@angular/core';
import { SharedserviceService } from 'src/app/sharedservice.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedserviceService) { }

  @Input() emp:any;
  EmployeeID!: string;
  EmployeeName!: string;
  Department!: string;
  DateOfJoin!: string;
  PhotoFileName!: string;
  PhotoFilePath!: string;

  DepartmentsList: any=[];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;
      this.EmployeeID=this.emp.EmployeeID;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoin=this.emp.DateOfJoin;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

  addEmployee(){
    var val={ EmployeeID: this.EmployeeID,
    EmployeeName:this.EmployeeName,
    Department:this.Department,
    DateOfJoin:this.DateOfJoin,
    PhotoFileName:this.PhotoFileName};
    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val={ EmployeeID: this.EmployeeID,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoin:this.DateOfJoin,
      PhotoFileName:this.PhotoFileName};
      this.service.updateEmployee(val).subscribe(res=>{
        alert(res.toString());
      });
  }

  uploadPhoto(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
      // console.log(this.PhotoFilePath);
    })
  }

}

