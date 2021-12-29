import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { DepartmentComponent } from '../department.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedserviceService) { }

  DepartmentList:any=[];
  p: number = 1;
  // DepartmentName: any;

  ModalTitle!: string;
  ActivateAddEditDepComp:boolean=false; 
  dep:any;

  DepartmentID!: string;
  DepartmentName!: string;
  DepartmentIDFilter!: string;
  DepartmentNameFilter!: string;
  DepartmentListWithoutFilter: any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.dep={
      DepartmentID:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
  }

  editClick(item: any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item: any){
    if(confirm('Are you sure ?')){
      this.service.deleteDepartment(item.DepartmentID).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
        this.DepartmentList=data;
        this.DepartmentListWithoutFilter=data;
    })
    }
  
  FilterIDFn(){
    var DepartmentIDFilter = this.DepartmentIDFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el : any){
      return el.DepartmentID.toString().toLowerCase().includes(
        DepartmentIDFilter.toString().trim().toLowerCase())
    });
  }

  FilterNameFn(){
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el : any){
      return el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase())
    });
  }

  key: string = "DepartmentID";
  reverse: boolean = false;
  Sort(key: string): void{
    this.key = key;
    this.reverse = !this.reverse;
  } 

  // sortResult(prop: any,asc: any){
  //   this.DepartmentList = this.DepartmentListWithoutFilter.sort(
  //     function(a: any,b : any){
  //       if (asc) {
  //         return (a[prop]>b[prop])?1:(a[prop]<b[prop]?-1:0);
  //       }else{
  //         return (b[prop]>a[prop])?1:(b[prop]<a[prop]?-1:0);
  //       }
  //     }
  //   )
  // }
}
