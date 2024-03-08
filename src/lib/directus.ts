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

const apiClient = process.env.DIRECTUS_API_TOKEN!
  ? createDirectus(process.env.DIRECTUS_API_URL!)
      .with(staticToken(process.env.DIRECTUS_API_TOKEN!))
      .with(rest())
  : undefined;

export async function getEmployees() {
  return apiClient?.request(
    readItems("Employees", {
      fields: ["*"],
    })
  );
}
