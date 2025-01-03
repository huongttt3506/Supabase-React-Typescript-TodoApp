import supabase from "../supabase";

//login and generate jwt token
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    //return token and user info
    const accessToken = data.session?.access_token;
    const refreshToken = data.session?.refresh_token;
    const user = data.user;

    return { accessToken, refreshToken, user };
};

// Sign up
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    return data.user;
};