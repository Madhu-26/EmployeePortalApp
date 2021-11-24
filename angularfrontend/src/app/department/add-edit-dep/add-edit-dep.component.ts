import { Component, OnInit, Input} from '@angular/core';
import { SharedserviceService } from 'src/app/sharedservice.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service:SharedserviceService) { }

  @Input() dep:any;
  DepartmentID!: string;
  DepartmentName!: string;

  ngOnInit(): void {
    this.DepartmentID=this.dep.DepartmentID;
    this.DepartmentName=this.dep.DepartmentName;
  }

  addDepartment(){
    var val={ DepartmentID: this.DepartmentID,
    DepartmentName:this.DepartmentName};
    this.service.addDepartment(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateDepartment(){
    var val={ DepartmentID: this.DepartmentID,
      DepartmentName:this.DepartmentName};
      this.service.updateDepartment(val).subscribe(res=>{
        alert(res.toString());
      });
  }

}

