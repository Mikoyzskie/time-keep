import {
  createDirectus,
  staticToken,
  rest,
  verifyHash,
  readItems,
  readSingleton,
  updateItem,
  readItem,
} from "@directus/sdk";

const apiClient = process.env.API_TOKEN!
  ? createDirectus(process.env.API_URL!)
      .with(staticToken(process.env.API_TOKEN!))
      .with(rest())
  : undefined;

const employees: any = "Employees";
const clocks: any = "Employee_Clocks";

export async function getEmployees() {
  return await apiClient?.request(
    readItems(employees, {
      fields: [
        "id",
        "Employee_Username",
        "employee_pin",
        "employee_name",
        "employee_icon",
        "Clock_Status",
        "bcrypt",
      ],
    })
  );
}

export async function getEmployeeClocks() {
  return await apiClient?.request(
    readItems(clocks, {
      fields: ["id", "Clock_User", "Clock_In_Timestamp", "Clock_Out_Timestamp"],
      sort: ["-Clock_In_Timestamp"],
    })
  );
}

export async function timeIn(id: string) {
  return apiClient?.request(
    updateItem("Employees", id, {
      Clock_Status: true,
    })
  );
}

export async function verifyPin(form: string, hash: string) {
  return apiClient?.request(verifyHash(form, hash));
}
