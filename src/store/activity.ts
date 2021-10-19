import axios from "axios";
import { ref } from "vue";
import { Activity } from "@/interface";
import { BASE_URL } from "@/store";

const ACTIVITY_URL = BASE_URL + '/activity-groups/'

export const activities = ref<Activity[]>([])

export const activityTitle = ref('')

export async function getActivities (): Promise<any> {
  return await axios.get("https://todo.api.devcode.gethired.id/activity-groups?email=hudadamar21@gmail.com")
}

export const showDetailActivity = async (id: number): Promise<any> => {
  return await axios.get(`${BASE_URL}/activity-groups/${id}`)
  
}

export async function addActivity (title: string): Promise<any> {
  return await axios.post(ACTIVITY_URL, {title, email: 'hudadamar21@gmail.com'})
}

export async function updateActivity (id: string, data: any): Promise<any> {
  return await axios.patch(ACTIVITY_URL + id, data)
}

export async function deleteActivity(id: string): Promise<any> {
  return await axios.delete(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  )
}
