import axios from "axios";
import { ref } from "vue";
import { Activity, ActivityResponse } from "@/interface";
import { BASE_URL, clearModal, state } from "@/store";

const ACTIVITY_URL = BASE_URL + '/activity-groups/'

export const activities = ref<Activity[]>([])

export const getActivities = async () => {
  const { data }: { data: ActivityResponse } = await axios.get(ACTIVITY_URL)
  activities.value = data.data
}

export const addActivity = (data: { title: string }) => {
  return new Promise( async (resolve, reject) => {
    try {
      await axios.post(ACTIVITY_URL, data)
      getActivities()
    } catch(err) {
      reject(err)
    }
  })
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

export const removeActivity = async () => {
  if(state.modalData.activityId) {
    await axios.delete(ACTIVITY_URL + state.modalData.activityId)
    state.alertMessage = 'Activity berhasil dihapus'
    clearModal()
    getActivities()
  }
}