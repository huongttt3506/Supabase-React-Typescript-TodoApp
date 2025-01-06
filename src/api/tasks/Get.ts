import supabase from "../../supabase";

const GetTasks = async (userId: string) => {
    const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
};

export default GetTasks;
