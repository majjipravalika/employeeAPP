import { Component } from '@angular/core';
import { LocalDbService } from './local-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee-App';
  isEmployeeDetails:boolean = false;
  isEmpolyeeList:boolean = true;
  employees:any = [];
  editingEmployeeId:any = [];
  constructor( private localDbService: LocalDbService) {
  }
  ngOnInit() {
    try{
    this.loadEmployees();
    }catch(err)
    {
      console.log("error in ngOnInit()")
    }
  }
  AddEmpolyee(){
    this.isEmpolyeeList = false
    this.editingEmployeeId =  [];
    this.isEmployeeDetails = !this.isEmployeeDetails
  }
  swipeLeft(employee: any) {
    this.resetSwipes(); 
    employee.swiped = true;
  }

  loadEmployees() {
    this.localDbService.getAllEmployees().then((data) => {
      this.employees = data;
    });
  }
 

  editEmployee(employee: any) {
    this.editingEmployeeId = employee;
    this.isEmpolyeeList = false
    this.isEmployeeDetails = !this.isEmployeeDetails
  }
  resetSwipes() {
    this.employees.forEach((emp: { swiped: boolean; }) => (emp.swiped = false));
  }

  deleteEmployee(id: number) {
    this.localDbService.deleteEmployee(id).then(() => {
      this.loadEmployees();
    });
  }
  clickmethod1(event: any) {
    this.isEmployeeDetails = false 
    this.isEmpolyeeList = !this.isEmpolyeeList
    this.loadEmployees();
    this.resetSwipes()
  }
}
