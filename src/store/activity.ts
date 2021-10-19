import axios from "axios";
import { ref } from "vue";
import { Activity } from "@/interface";
import { BASE_URL, state } from "@/store";

const ACTIVITY_URL = BASE_URL + '/activity-groups/'

export const activities = ref<Activity[]>([])

export const getActivities = async (): Promise<any> => {
 return await axios.get(
    BASE_URL + '/activity-groups?email=hudadamar21%40gmail.com'
  )
}

export const addActivity = async (title: string): Promise<any> => {
  return await axios.post(ACTIVITY_URL, { title, email: 'hudadamar21@gmail.com' })
}

export const updateActivity = (id: string, data: any) => {
  return new Promise( async (resolve, reject) => {
    try {
      const res = await axios.patch(ACTIVITY_URL + id, data)
      resolve(res.data)
      getActivities()
    } catch(err) {
      reject(err)
      console.log(err);
      
    }
  })
}

export const deleteActivity = async (): Promise<any> => {
  return await axios.delete(ACTIVITY_URL + state.modalData.activityId)
}