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

const field: any = "Employees";

export async function getEmployees() {
  return await apiClient?.request(
    readItems(field, {
      fields: [
        "id",
        "Employee_Username",
        "employee_pin",
        "employee_name",
        "employee_icon",
      ],
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
