import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '@/shared/services/employees/employee.service';
import { EmployeesTableRowComponent } from './components/employees-table-row/employees-table-row.component';
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right.icon';
import { AddIcon } from '@/shared/ui/icons/add/add.icon';
import { DeleteIcon } from '@/shared/ui/icons/delete/delete.icon';
import { EditIcon } from '@/shared/ui/icons/edit/edit.icon';
import { TableComponent } from '@/shared/ui/table/table.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { Employee } from '@/shared/types/employee.type';
import { formData } from './model/employee-data.model';
import { RequiredValidator } from '@/shared/services/validators/required-validator.service';
import { MinLengthValidator } from '@/shared/services/validators/min-length-validator.service';
import { MaxLengthValidator } from '@/shared/services/validators/max-length-validator.service';
import { EmailValidator } from '@/shared/services/validators/email-validator.service';
import { NameValidator } from '@/shared/services/validators/name-validator.service';
import { DateValidator } from '@/shared/services/validators/date-validator.service';
import { PopupService } from '@/shared/services/pop-up/pop-up.service';
import { Status } from '@/shared/ui/pop-up/enum/status.enum';

@Component({
  selector: 'app-employees-listing',
  standalone: true,
  imports: [
    EmployeesTableRowComponent,
    RouterLink,
    ArrowRightIcon,
    AddIcon,
    DeleteIcon,
    EditIcon,
    TableComponent,
    ModalComponent,
    InputComponent,
  ],
  providers: [
    EmployeeService,
    RequiredValidator,
    MinLengthValidator,
    EmailValidator,
    NameValidator,
    DateValidator,
    MaxLengthValidator,
  ],
  templateUrl: './employees-listing.component.html',
  styleUrl: './employees-listing.component.scss',
})
export class EmployeesListingComponent implements OnInit {

  userId: number = JSON.parse(localStorage.getItem('userId')!);

  employeesList = signal([] as Employee[]);
  newEmployeeData = signal(JSON.parse(JSON.stringify(formData)));
  selectedEmployeeData = signal(JSON.parse(JSON.stringify(formData)));

  isNewEmployeeModalOpen = signal(true);
  isEditEmployeeModalOpen = signal(true);
  isDeleteEmployeeModalOpen = signal(true);

  constructor(
    private employeeService: EmployeeService,
    private requiredValidator: RequiredValidator,
    private minLengthValidator: MinLengthValidator,
    private emailValidator: EmailValidator,
    private nameValidator: NameValidator,
    private dateValidator: DateValidator,
    private maxLengthValidator: MaxLengthValidator,
    private popupService: PopupService,
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  async fetchEmployees() {
    const response = await this.employeeService.getAllEmployeesApi();

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }

    const registeredEmployees = (response?.data?.data?.['allEmployeesList'] as unknown as Employee[]).filter(
      (employee) => employee.is_active,
    );
    this.employeesList.set(registeredEmployees as Employee[]);
  }

  async updateEmployeeById(employeeId: number, employee: Employee) {
    const response = await this.employeeService.updateEmployeeByIdApi(employeeId, employee);

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
  }

  async deleteEmployeeById(employeeId: number, employee: Employee) {
    const response = await this.employeeService.deleteEmployeeByIdApi(employeeId, employee);

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
  }

  async fetchEmployeeByEmail(email: string) {
    const response = await this.employeeService.getEmployeeByEmail(email);

    if (!response?.data) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Algo deu errado!',
      });
      return;
    }

    if ('errors' in response.data) {
      Object.values(response.data.errors).forEach((error) => {
        this.popupService.addNewPopUp({
          type: Status.Error,
          message: error,
        });
      });
      return;
    }
    return response.data.data;
  }

  openNewEmployeeModal() {
    this.isNewEmployeeModalOpen.set(false);
  }

  closeNewEmployeeModal() {
    this.isNewEmployeeModalOpen.set(true);
    this.clearSelectedEmployee();
    this.clearNewEmployee();
  }

  openEditEmployeeModal(employee: Employee) {
    this.selectedEmployeeData().id = employee.id;
    this.selectedEmployeeData().email.value = employee.email;
    this.selectedEmployeeData().name.value = employee.name;
    this.selectedEmployeeData().birthdate.value = employee.birthdate;
    this.selectedEmployeeData().password.value = employee.password;
    this.selectedEmployeeData().is_active = employee.is_active;

    this.isEditEmployeeModalOpen.set(false);
  }

  closeEditEmployeeModal() {
    this.isEditEmployeeModalOpen.set(true);
    this.clearSelectedEmployee();
    this.clearNewEmployee();
  }

  openDeleteEmployeeModal(employee: Employee) {
    this.selectedEmployeeData().id = employee.id;
    this.selectedEmployeeData().email.value = employee.email;
    this.selectedEmployeeData().name.value = employee.name;
    this.selectedEmployeeData().birthdate.value = employee.birthdate;
    this.selectedEmployeeData().password.value = employee.password;
    this.selectedEmployeeData().is_active = employee.is_active;
    this.isDeleteEmployeeModalOpen.set(false);
  }

  closeDeleteEmployeeModal() {
    this.isDeleteEmployeeModalOpen.set(true);
    this.clearSelectedEmployee();
    this.closeEditEmployeeModal();
  }

  async addNewEmployee() {
    if (!this.validateNewEmployee()) return;

    const employeeData = {
      id: this.newEmployeeData().id,
      email: this.newEmployeeData().email.value,
      password: this.newEmployeeData().password.value,
      name: this.newEmployeeData().name.value,
      birthdate: this.newEmployeeData().birthdate.value,
      is_active: true,
    };

    if (!(await this.employeeService.addNewEmployeeApi(employeeData))) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Funcionário já existe!',
      });
      return;
    }

    const responseFetch = await this.fetchEmployeeByEmail(employeeData.email);
    if (responseFetch) {
      const id = responseFetch?.['id'];
      employeeData.id = id;
    }
    this.employeesList.update((employees) => [...employees, employeeData]);

    this.clearNewEmployee();
    this.closeNewEmployeeModal();
  }

  editEmployee() {
    if (!this.validateEditedEmployee()) return;

    const employeeData = {
      id: this.selectedEmployeeData().id,
      name: this.selectedEmployeeData().name.value,
      email: this.selectedEmployeeData().email.value,
      birthdate: this.selectedEmployeeData().birthdate.value,
      password: this.selectedEmployeeData().password.value,
      is_active: this.selectedEmployeeData().is_active,
    };

    if (!this.updateEmployeeById(this.selectedEmployeeData().id, employeeData)) {
      this.popupService.addNewPopUp({
        type: Status.Error,
        message: 'Funcionário já existe!',
      });
      return;
    }

    this.employeesList.update((employees) =>
      employees.map((emp) => (emp.id === employeeData.id ? { ...emp, ...employeeData } : emp)),
    );

    this.clearSelectedEmployee();
    this.closeEditEmployeeModal();
  }

  clearSelectedEmployee() {
    this.selectedEmployeeData.set(JSON.parse(JSON.stringify(formData)));
  }

  clearNewEmployee() {
    this.newEmployeeData.set(JSON.parse(JSON.stringify(formData)));
  }

  deleteEmployee() {
    const employeeData = {
      id: this.selectedEmployeeData().id,
      name: this.selectedEmployeeData().name.value,
      email: this.selectedEmployeeData().email.value,
      birthdate: this.selectedEmployeeData().birthdate.value,
      password: this.selectedEmployeeData().password.value,
      is_active: false,
    };

    this.employeeService.deleteEmployeeByIdApi(this.selectedEmployeeData().id, employeeData);

    this.employeesList.set(this.employeesList().filter((emp) => emp.id !== employeeData.id));

    this.clearSelectedEmployee();
    this.closeDeleteEmployeeModal();
  }

  validateEditedEmployee() {
    const { email, name, birthdate } = this.selectedEmployeeData();

    this.requiredValidator.setNext(this.emailValidator);
    this.selectedEmployeeData().email.validation = this.requiredValidator.validate(email.value);

    this.requiredValidator.setNext(this.nameValidator);
    this.selectedEmployeeData().name.validation = this.requiredValidator.validate(name.value);

    this.requiredValidator.setNext(this.dateValidator);
    this.selectedEmployeeData().birthdate.validation = this.requiredValidator.validate(birthdate.value);

    const isValidForm = !email.validation.error && !name.validation.error && !birthdate.validation.error;

    return isValidForm;
  }

  validateNewEmployee() {
    const { email, name, birthdate, password, confirmPassword } = this.newEmployeeData();

    this.requiredValidator.setNext(this.emailValidator);
    this.newEmployeeData().email.validation = this.requiredValidator.validate(email.value);

    this.requiredValidator.setNext(this.nameValidator);
    this.newEmployeeData().name.validation = this.requiredValidator.validate(name.value);

    this.requiredValidator.setNext(this.dateValidator);
    this.newEmployeeData().birthdate.validation = this.requiredValidator.validate(birthdate.value);

    this.maxLengthValidator.setMaxLength(4);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.newEmployeeData().password.validation = this.requiredValidator.validate(password.value);

    this.maxLengthValidator.setMaxLength(4);
    this.requiredValidator.setNext(this.minLengthValidator).setNext(this.maxLengthValidator);
    this.newEmployeeData().confirmPassword.validation = this.requiredValidator.validate(confirmPassword.value);

    if (password.value !== confirmPassword.value) {
      this.newEmployeeData().confirmPassword.validation = { error: true, message: 'Senhas devem coincidir!' };
    }

    const isValidForm =
      !email.validation.error &&
      !name.validation.error &&
      !birthdate.validation.error &&
      !password.validation.error &&
      !confirmPassword.validation.error;

    return isValidForm;
  }
}
