import supabase from "../../supabase"

const deleteTask = async (taskId: string) => {
    const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);
    if (error) throw new Error(error.message);
};

export default deleteTask;