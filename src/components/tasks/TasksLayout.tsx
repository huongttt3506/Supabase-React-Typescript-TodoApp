import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import TaskList from "./TaskList";
import CreateTaskForm from "./CreateTaskForm";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const TaskLayout: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false);
  const [userId, setUserId] = React.useState<string>("");

  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    setUserId;
  }

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleTaskAdded = () => {
    setRefresh(!refresh); // Toggle refresh state when add new task
  };

  const handleTaskUpdated = () => {
    setRefresh(!refresh); // Toggle refresh state when update/delete task
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: "80px" }}>
      <Grid container spacing={2} columns={16}>
        <Grid size={8}>
          <Item>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Task List
            </Typography>
            <TaskList
              userId={userId}
              refresh={refresh}
              onTaskUpdated={handleTaskUpdated}
            />
          </Item>
        </Grid>
        <Grid size={8}>
          <Item>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Create New Task
            </Typography>
            <CreateTaskForm userId={userId} onTaskAdded={handleTaskAdded} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskLayout;
