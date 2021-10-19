import axios from "axios";
import { ref } from "vue";
import { Activity } from "@/interface";

export const activities = ref<Activity[]>([])

export async function updateActivity (id: string, data: any): Promise<any> {
  return await axios.patch(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`, data
  )
}

