import supabase from "../../supabase";

const addTask = async (
    userId: string, 
    title: string, 
    description: string, 
    dueDate: Date 
) => {
   const { data, error } = await supabase.from('tasks').insert([
    {
        user_id: userId,
        title,
        description,
        due_date: dueDate.toISOString();
        completed: false,
    }
   ]);
   if (error) throw new Error(error.message);

   return data;
};

export default addTask;