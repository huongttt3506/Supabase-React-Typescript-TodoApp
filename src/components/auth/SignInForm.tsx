import React, { useState } from 'react'
import { signIn } from '../../api/Auth';
import { Link } from 'react-router-dom';

export const SignInForm = ({ onLogin } : { onLogin: (user: {email: string | null}) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            const { user, accessToken, refreshToken } = await signIn(email, password);
            setMessage(`Login successful! Wellcome ${user?.email}`);

            //save accessToken
            localStorage.setItem('access_token', accessToken || '');
            localStorage.setItem('refresh_token', refreshToken)
            onLogin({email: user?.email ?? null});
        } catch (error: any) {
            setMessage(`Login failed: ${error.message}`);
        }
    };
  return (
    <div>
    <h2>Sign In</h2>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Email: </label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
            <label>Password: </label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit'>Sign In</button>
    </form>
    Don't have an account? <Link to='/sign-up'>Sign Up</Link>
    {message && <p>{message}</p>}
    </div>
  );
};
export default SignInForm;
