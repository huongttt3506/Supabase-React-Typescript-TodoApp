import React, { useEffect, useState } from 'react';
import { Task } from '../../types/types';
import GetTasks from '../../api/tasks/Get';
import updateTask from '../../api/tasks/Update';
import deleteTask from '../../api/tasks/DeleteTask';
import { IconButton } from '@mui/material';
import { CheckBoxOutlineBlank, CheckBoxOutlined, DeleteOutline } from '@mui/icons-material';

interface TaskListProps {
  userId: string;
  refresh: boolean;
  onTaskUpdated: () => void; // Add the callback for task updates
}
// Get task list
const TaskList: React.FC<TaskListProps> = ({ userId, refresh, onTaskUpdated }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await GetTasks(userId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId, refresh]); // When userId or refresh state changes, re-fetch tasks
// mark completed task
  const handleCompleteTask = async (taskId: string) => {
    try {
      await updateTask(taskId, true);
      onTaskUpdated(); //refresh the task list
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
// delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      onTaskUpdated(); // Refresh the task list after deleting a task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  if (tasks.length === 0) return <p>No tasks available</p>;

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.due_date).toLocaleDateString()}</p>
          </div>
          <div>
            <IconButton onClick={() => handleCompleteTask(task.id)} color="primary">
            {task.completed ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary">
              <DeleteOutline />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
