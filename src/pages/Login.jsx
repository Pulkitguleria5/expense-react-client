import { useState } from 'react';
import axios from 'axios';

function Login(props) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    }

    const validateForm = () => {
        // Add validation logic if needed
        let newErrors = {};
        let isValid = true;
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const body = {
                    email: formData.email,
                    password: formData.password
                };
                // Axios uses `withCredentials` (not `Credentials`) to send cookies/auth headers cross-site
                const config = { withCredentials: true };


                const res = await axios.post('http://localhost:5001/auth/login', body, config);
                // console.log('Login successful:', res.data);
                props.setUserdetails(res.data.user);
                alert('Login successful!');
                setMessage('Login successful!');
            } catch (error) {
                console.error('Login failed:', error);
                setErrors((prev) => ({ ...prev, message: 'Login failed. Please check your credentials.' }));
                alert('Login failed. Please check your credentials.');

            }

        }

        else {
            console.log('Form has errors:', errors);
            alert('Form has errors. Please fix them before submitting.');
        }



    }



    return (
        <div className="container text-center">
            <h2 className="text-center">Login Page</h2>
            {message && <p className="text-green-500">{message}</p>}
            {errors.message && <p className="text-red-500">{errors.message}</p>}
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="w-full border rounded px-3 py-2" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>

                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="w-full border rounded px-3 py-2" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    );

}

export default Login;