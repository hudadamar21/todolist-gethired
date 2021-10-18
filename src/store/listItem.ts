import { ref, watch } from "vue";
import axios from "axios";
// @ts-ignore
import sortArray from "sort-array";

import { BASE_URL, state, clearModal } from "@/store";
import { ActivityDetail, ListItem,  } from "@/interface";
import { Priority } from "@/types";
import { priorityList } from "@/data";

export const listItemData = ref<ActivityDetail>()
export const editedTodo = ref({
  todoId: '',
  title: '',
  priority: {
    title: 'Very High',
    value: 'very-high' 
  } as Priority
})

export const clearEditedTodo = () => {
  editedTodo.value = {
    todoId: '',
    title: '',
    priority: {
      title: 'Very High',
      value: 'very-high'
    }
  }
}

export const getListItems =  (id: string) => {
  return new Promise( async (resolve, reject) => {
    try {
      const res = await axios.get(`${BASE_URL}/activity-groups/${id}`)
      listItemData.value = res.data as ActivityDetail
      resolve(listItemData.value)
    } catch (error) {
      reject(error)
    }
  })
}

interface ItemData { 
  title: string, 
  priority: Priority, 
  is_active: number, 
  activity_group_id: number 
}
export const createTodo = (itemData: ItemData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${BASE_URL}/todo-items`, itemData)
      listItemData.value?.todo_items.unshift(res.data as ListItem)
      resolve(res.data)
      state.alertMessage = 'Todo berhasil dibuat'
    } catch (error) {
      reject(error)
    }
  })
}

export const getEditedTodo = async (id: string) => {
  const res: ListItem = await axios.get(`${BASE_URL}/todo-items/${id}`)
  const priority = priorityList.filter(p => p.value === res.data.priority)[0] as Priority
  editedTodo.value = {
    todoId: res.data.id,
    title: res.data.title,
    priority
  }
}

export const updateTodo = async (id: string, data: object) => {
  return new Promise( async (resolve, reject) => {
    try {
      const res = await axios
        .patch(`${BASE_URL}/todo-items/${id}`, data) as { data: ListItem }
      resolve(res.data as ListItem)
    } catch (error) {
      reject(error)
    }
  })
}

export const deleteTodo = async () => {
  if(state.modalData.todoId) {
    await axios.delete(`${BASE_URL}/todo-items/${state.modalData.todoId}`)
    const newData = listItemData.value?.todo_items
      .filter(item => item.id !== state.modalData.todoId)
    // @ts-ignore
    listItemData.value.todo_items = newData
    state.alertMessage = 'Todo berhasil dihapus'
    clearModal()
  }
}

export const updateListItemState = (data: ListItem, property: string) => {
  listItemData.value?.todo_items.forEach(item => {
    if(item.id === data.id) {
      item[property] = data[property]
      return
    }
  })
}


// Sorting

export const selectedSort = ref('Terbaru')

watch(() => selectedSort.value, (newval) => {
  let result = []
  
  switch(newval) {
    case 'Terbaru':
      result = sortArray(listItemData.value?.todo_items, {
        by: 'id',
        order: 'desc'
      })
      // @ts-ignore
      listItemData.value.todo_items = result
      break;
    case 'Terlama':
      result = sortArray(listItemData.value?.todo_items, {
        by: 'id',
        order: 'asc'
      })
      // @ts-ignore
      listItemData.value.todo_items = result
      break;
    case 'A-Z':
      result = sortArray(listItemData.value?.todo_items, {
        by: 'title',
        order: 'asc'
      })
      // @ts-ignore
      listItemData.value.todo_items = result
      break;
    case 'Z-A':
      result = sortArray(listItemData.value?.todo_items, {
        by: 'title',
        order: 'desc'
      })
      // @ts-ignore
      listItemData.value.todo_items = result
      break;
    case 'Z-A':
      result = sortArray(listItemData.value?.todo_items, {
        by: 'title',
        order: 'desc'
      })
      // @ts-ignore
      listItemData.value.todo_items = result
      break;
    case 'Belum Selesai':
      result = sortArray(listItemData.value?.todo_items, {
        by: 'is_active',
        order: 'asc'
      })
      // @ts-ignore
      listItemData.value.todo_items = result
      break;
  }
})