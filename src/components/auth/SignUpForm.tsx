import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../api/Auth';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signUp(email, password);
            setMessage(`Sign Up Successful! Well come ${user?.email}`);
        } catch (error: any) {
            setMessage(`Sign Up Failed: ${error.message}`);
        }
    };
  return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email: </label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div>
                <label>Password: </label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit'>Sign Up</button>
        </form>
        Already have an account?<Link to='/sign-in'>Login</Link>
        {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpForm;
