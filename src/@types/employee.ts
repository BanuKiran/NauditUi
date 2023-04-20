import { Role } from './role';


export type Employee = {
  role: string;
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  joinDate: string;
  mobile: string;
  address: string;
  name: string;
  roleId: Role;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
};
export type EmployeeRequest = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  employeeId: string;
  mobile: string;
  joinDate: string;
  roleName: string;
};

export type EmployeeState = {
  loadingStatus: string;
  createStatus: string;
  updateStatus: string;
  deleteStatus: string;
  statusChangeStatus: string;
  error: boolean;
  errorMessage: string | null;
  employees: Employee[];
  employee: Employee | null;
  sortBy: string | null;
  filters: {
    name: string;
  };
  selectedEmployeeName: string;
};
