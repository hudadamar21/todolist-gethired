export interface Activity {
  id: number,
  title: string,
  created_at: string,
  updated_at?: string,
}

export interface ActivityResponse {
  total: number,
  limit: number,
  skip: number,
  data: Activity[]
}

export interface ListItem {
  [index: string]: any,
  id: number,
  title: string,
  activity_group_id: number,
  is_active: number,
  priority: string,
  updated_at?: string
}

export interface ActivityDetail {
  id: number,
  title: string,
  created_at: string,
  todo_items: ListItem[]
}

