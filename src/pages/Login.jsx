import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';
import useAuth from '../hooks/useAuth';

export const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth  } = useAuth();

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
    setAlert({})
  }
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    setAlert({})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlert({
        msg: 'All fields are required.',
        error: true
      })
      return;
    }


    try {
      const {data} = await clientAxios.post(`/users/login`, {email,password});
      localStorage.setItem('token', data.token);
      
      setAuth(data);
      navigate('/projects');
      
    } catch (error) {
      
      setAlert({
        msg: 'ERROR',
        error:true
      })
    }
  }

  const {msg} = alert;

  return (
    <>
      

      <form 
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-md px-10 py-5'
      >
        
        <h2 className='text-sky-600 font-black text-6xl capitalize my-10'>Login and manage your <span className='text-slate-700'>projects.</span></h2>
        {
          msg && <Alert alert={alert}/>
        }
        <div className='my-10 '>
          <label 
            htmlFor="email" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Email</label>
          <input 
            type="email" 
            id='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Write your email'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            />
        </div>
        <div className='my-7 '>
          <label 
            htmlFor="password" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Password</label>
          <input 
            type="password" 
            id='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Write your Password'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            />
        </div>
        <input type="submit" className='w-full bg-sky-600 rounded-md text-white font-bold py-2 text-xl cursor-pointer hover:bg-sky-900 transition-colors mt-10' value='Log In'  />
        <nav className='lg:flex lg:justify-between '>
        <Link 
          to='register'
          className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
        >No account? Sign up</Link>
        <Link 
          to='forget-password'
          className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
        >Forgot my password</Link>
        </nav>

      </form>
      

    </>
  )
}
