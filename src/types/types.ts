export interface Task {
    id: string;
    user_id: string;
    title: string;
    description: string;
    due_date: string;
    completed: boolean;
};

export interface CreateNewTask {
    title: string;
    description: string;
    due_date: string;
};
  