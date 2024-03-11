export interface ClockData {
  id: string;
  Clock_User: string;
  Clock_In_Timestamp: string;
  Clock_Out_Timestamp: string;
}

export interface IEmployees {
  id: string;
  employee_pin: string;
  Employee_Username: string;
  employee_icon: string;
  employee_name: string;
  Clock_Status: boolean;
  bcrypt: string;
}
