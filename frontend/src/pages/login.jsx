import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Translated from '../components/Translated';

const Login = () => {
  const [state, setState] = useState('Sign up');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          password,
          email,
          phoneNumber,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/my-profile');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md transform transition duration-500 hover:scale-[1.02]"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            <Translated text={state === 'Sign up' ? 'Create Account' : 'Login'} />
          </h2>
          <p className="text-gray-600 mt-2">
            <Translated
              text={
                state === 'Sign up'
                  ? 'Please create an account to book your appointment'
                  : 'Please login to book your appointment'
              }
            />
          </p>
        </div>

        {/* Full Name */}
        {state === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              <Translated text="Full Name" />
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>
        )}

        {/* Phone Number */}
        {state === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              <Translated text="Phone Number" />
            </label>
            <input
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="072687..54"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            <Translated text="Email" />
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

{/* Password with Show/Hide */}
<div className="mb-6 relative">
  <label className="block text-gray-700 font-medium mb-1">
    <Translated text="Password" />
  </label>
  <input
    type={showPassword ? 'text' : 'password'}
    onChange={(e) => setPassword(e.target.value)}
    value={password}
    placeholder="••••••••"
    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition pr-12"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-primary focus:outline-none"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105 active:scale-95"
        >
          <Translated text={state === 'Sign up' ? 'Create Account' : 'Login'} />
        </button>

        {/* Switch State */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {state === 'Sign up' ? (
            <>
              <Translated text="Already have an account?" />{' '}
              <button
                type="button"
                onClick={() => setState('Login')}
                className="text-primary font-medium hover:underline"
              >
                <Translated text="Login" />
              </button>
            </>
          ) : (
            <>
              <Translated text="Don’t have an account?" />{' '}
              <button
                type="button"
                onClick={() => setState('Sign up')}
                className="text-primary font-medium hover:underline"
              >
                <Translated text="Sign up" />
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
