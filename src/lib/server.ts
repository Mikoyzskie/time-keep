import { timeIn } from "@/lib/directus";

export async function timeUpdate(id: string) {
  const test = await timeIn(id);
  console.log(test);
}
