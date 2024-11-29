import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LocalDbService } from '../local-db.service';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  providers: [DatePipe],
})
export class EmployeeDetailsComponent {
  employee = {
    name: '',
    role: '',
    formattedStartDate: '',
    formattedEndDate: '',
    swipe:false
  };
  rawDate = new Date('2024-11-05');
  @Output('clickmethod') parenttochild = new EventEmitter();
  @Input('editingEmployeeId') editingEmployeeId:any = []
  isEditing: boolean = false;
  roles: string[] = ['Product Designer', 'Flutter Developer', 'QA tester', 'Product Owner'];
  @ViewChild('employeeForm', { static: true })
  employeeForm!: NgForm;
  showDateShortcuts = false;
  startDate: Date | null = null;
  formattedStartDate: string | null = null; 
  endDate: Date | null = null;
  formattedEndDate: string | null = null; 
  showCustomPanel: boolean = false;
  showCustomPanelEnd: boolean = false;
  currentDate: Date = new Date();
  empName:any; 
  selctRole:any
  constructor(private localDbService: LocalDbService,private datePipe: DatePipe,private overlayContainer: OverlayContainer) {
  }

  toggleCustomPanel() {
    this.showCustomPanel = !this.showCustomPanel;
    const overlayPane = this.overlayContainer.getContainerElement();
    overlayPane.style.position = 'absolute';
    overlayPane.style.top = 'calc(100% + 4px)';
    overlayPane.style.left = '0';
  }
  toggleCustomEndPanel() {
    this.showCustomPanelEnd = !this.showCustomPanelEnd;
  }

  setDate(option: string) {
    const today = new Date();
    switch (option) {
      case 'today':
        this.startDate = today;
        break;
      case 'nextMonday':
        this.startDate = new Date(today.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7)); // Next Monday
        break;
      case 'nextTuesday':
        this.startDate = new Date(today.setDate(today.getDate() + (2 + 7 - today.getDay()) % 7)); // Next Tuesday
        break;
      case 'AfterWeek':
        this.startDate = new Date(today.setDate(today.getDate() + 7)); // After one week
        break;
    }
    this.formattedStartDate = this.datePipe.transform(this.startDate, 'dd MMM yyyy');
    this.showCustomPanel = false;
  }
  ngOnInit() {
    this.loadEmployees();
    if(this.editingEmployeeId && this.editingEmployeeId?.id ){
      this.updateEmployeeData(this.editingEmployeeId)
      this.isEditing = true;
    }else{
     this.employee = {
      name: '',
      role: '',
      formattedStartDate: '',
      formattedEndDate: '',
      swipe:false
    }
    this.isEditing = false;
  }

  }
  employees: any[] = [];
  loadEmployees() {
    this.localDbService.getAllEmployees().then((data) => {
      this.employees = data;
    });
  }
  setEndDate(option: string) {
    const today = new Date();
    switch (option) {
      case 'noDate':
        this.endDate = null;
        break;
      case 'today':
        this.endDate = today;
        break;
    
    }
    this.formattedEndDate = this.datePipe.transform(this.endDate, 'd MMM yyyy') || '';
    this.showCustomPanelEnd = false; 
  }
  onEndDateSelected(date:any) {
    this.endDate = date;
    this.formattedEndDate = this.datePipe.transform(date, 'd MMM yyyy') || '';
    this.showCustomPanelEnd = false; 
  }
  onDateSelected(date:any) {
    this.startDate = date;
    this.formattedStartDate = this.datePipe.transform(date, 'd MMM yyyy') || '';
    this.showCustomPanel = false; 
  }

  // Format the date for display
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getNextDay(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  updateEmployeeData(data:any) {
    this.employee.name = data.name;
    this.employee.role = data.role;
    this.formattedStartDate = data.formattedStartDate;
    this.formattedEndDate = data.formattedEndDate;
  }
  
  onReset(form: any) {
    form.reset();
    this.editingEmployeeId = [];
    this.parenttochild.emit(true);
   
  }

  saveEmployee(form:any ,data:any) {
    if(form) {
    const employeeData = data;

    if (this.isEditing == true && this.editingEmployeeId !== null) {
      employeeData.id = this.editingEmployeeId.id;
      this.localDbService.updateEmployee(employeeData).then(() => {
        this.isEditing = false;
        this.editingEmployeeId = null;
        this.loadEmployees();
      });
    } else {
      this.localDbService.addEmployee(employeeData).then(() => {
        this.loadEmployees();
        this.editingEmployeeId = [];
      });
    }
    this.parenttochild.emit(true)
  }else{
    alert('Please fill in all required fields.');
  }
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return date >= today; 
  };

}

