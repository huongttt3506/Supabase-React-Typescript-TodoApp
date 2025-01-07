import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress, InputAdornment } from '@mui/material';
import addTask from '../../api/tasks/AddTask';

interface CreateTaskFormProps {
  userId: string;
  onTaskAdded: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ userId, onTaskAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !description || !dueDate) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const task = await addTask(userId, title, description, dueDate);
      console.log('Task Created:', task);
      setSuccess(true);
      setTitle(''); // Reset form
      setDescription('');
      setDueDate(null);
      onTaskAdded();
    } catch (err) {
      setError( err instanceof Error ? err.message: 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="outlined-start-adornment"
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"></InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="outlined-start-adornment"
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"></InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
        onChange={(e) => setDueDate(new Date(e.target.value))}
        id="outlined-start-adornment"
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start"></InputAdornment>
            ),
          },
        }}
      />
      {error && <Alert severity="error" style={{ marginBottom: '16px' }}>{error}</Alert>}
      {success && <Alert severity="success" style={{ marginBottom: '16px' }}>Task created successfully!</Alert>}
      
      <Button variant="contained" color="primary" type="submit">{loading ? <CircularProgress size={24} /> : 'Create Task'}</Button>
    </form>
  );
};

export default CreateTaskForm;
