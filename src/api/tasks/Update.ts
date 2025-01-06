import supabase from "../../supabase";

const updateTask = async (taskId: string, completed: boolean) => {
    const { data, error } = await supabase
    .from('tasks')
    .update({completed})
    .eq('id', taskId);

    if (error) throw new Error(error.message);

    return data;
};
export default updateTask;