import { reactive, watchEffect, watch } from "vue";

interface State {
  deleteModalOpen: boolean,
  addItemModal: boolean,
  alertMessage: string,
  modalData: {
    title: string,
    activityId?: string,
    todoId?: string
  }
}

export const BASE_URL = "https://todo.api.devcode.gethired.id"

export const state: State = reactive({
  deleteModalOpen: false,
  addItemModal: false,
  alertMessage: '',
  modalData: {
    title: '',
  }
})

watch(() => state.alertMessage, (newval) => {  
  if(newval) {
    setTimeout(() => {
      state.alertMessage = ''
    }, 5000)
  }
})

watchEffect(() => {
  if(state.deleteModalOpen || state.addItemModal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

export const clearModal = () => {
  state.deleteModalOpen = false
  state.addItemModal = false
  state.modalData = {
    title: '',
  }
}