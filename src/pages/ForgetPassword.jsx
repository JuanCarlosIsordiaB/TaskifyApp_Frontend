import { useState } from 'react';
import {Link} from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';
import clientAxios from '../config/clientAxios';


export const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});


  const handleChange = (e) => {
    setEmail(e.target.value);
    setAlert({});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(email === '' || email.length < 6){
      
      setAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users/forget-password`, {email});
      
      setAlert({
        msg: data.msg
      });
      setEmail('');
      
    } catch (error) {
      setEmail('');
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }


  const {msg} = alert;
  

  return (
    <>
      <form 
        
        className='my-10 bg-white shadow rounded-md px-10 py-5'
        onSubmit={handleSubmit}
      >
        {
          msg && <Alert alert={alert}/>
        }
        
        <h2 className='text-sky-600 font-black text-6xl capitalize my-10'>
          Recover your <span className='text-slate-700'>account.</span></h2>
        
        <div className='my-5 '>
          <label 
            htmlFor="email" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Email</label>
          <input 
            type="email" 
            id='email'
            value={email}
            onChange={handleChange}
            placeholder='Write your email'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            />
        </div>
        
        <input type="submit" className='w-full bg-sky-600 rounded-md text-white font-bold py-2 text-xl cursor-pointer hover:bg-sky-900 transition-colors mt-10' value='Send Instructions'  />
        <nav className='lg:flex lg:justify-between '>
          <Link
            to='/'
            className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
          >Already has an account? Login</Link>
          
        </nav>

      </form>
      

    </>
  )
}
