import supabase from "../supabase";

//login and generate jwt token
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    // save userId, email and tokens into localStorage after successful login
    const userId = data.user?.id;
    const userEmail = data.user?.email;
    const accessToken = data.session?.access_token;
    const refreshToken = data.session?.refresh_token;


    if (userId) {
        localStorage.setItem('userId', userId);  // Save userId
    }
    if (userEmail) {
        localStorage.setItem('userEmail', userEmail);  // Save userEmail
    }
    if (accessToken) {
        localStorage.setItem('access_token', accessToken);  // Save accessToken
    }
    if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);  // Save refreshToken
    }

    // Return token and user info
    const user = data.user;
    return { accessToken, refreshToken, user };
};

// Sign up
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    return data.user;
};