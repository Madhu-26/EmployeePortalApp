import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from 'src/app/sharedservice.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedserviceService) { }

  EmployeeList:any=[];

  ModalTitle!: string;
  ActivateAddEditEmpComp:boolean=false; 
  emp:any;

  EmployeeIDFilter: string = " ";
  EmployeeNameFilter: string = " ";
  EmployeeListWithoutFilter: any=[];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeeID:0,
      EmployeeName:"",
      Department:"",
      DateofJoin:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
    // console.log(this.emp.PhotoFileName);
  }

  editClick(item: any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item: any){
    if(confirm('Are you sure ?')){
      this.service.deleteEmployee(item.EmployeeID).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
        this.EmployeeList=data;
        this.EmployeeListWithoutFilter=data;
    })
    }
  
  FilterFn(){
    var EmployeeIDFilter = this.EmployeeIDFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el: any){
      return el.EmployeeID.toString().toLowerCase().includes(
        EmployeeIDFilter.toString().trim().toLowerCase()) && 
        el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase())
    });
  }

  sortResult(prop: any,asc: any){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(
      function(a: any,b : any){
        if (asc) {
          return (a[prop]>b[prop])?1:(a[prop]<b[prop]?-1:0);
        }else{
          return (b[prop]>a[prop])?1:(b[prop]<a[prop]?-1:0);
        }
      }
    )
  }

}
