import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';

export const NewPassword = () => {

  const [password , setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);
  const [alert, setAlert] = useState({});
  
  const params = useParams();
  const {token} = params;

  const handleChange = (e) => {
    setPassword(e.target.value);
    setAlert({});
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(password.length < 5){
      setAlert({
        msg: 'Must be at least 5 characters. ',
        error: true
      })
      return;
    }

    if(password !== password2){
      setAlert({
        msg: 'Passwords do not match',
        error: true
      })
      
      return;
    }


    //Back
    try {
      const url = `/users/forget-password/${token}`;
      const {data} = await clientAxios.post(url, {password});
      
      setAlert({
        msg: data.msg,
        error: false
      })
      setPasswordModified(true);
      

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  
  
  useEffect(() => {
    
    const checkToken = async() =>{
      try {
        
        await clientAxios(`/users/forget-password/${token}`);
        setValidToken(true);
        
      } catch (error) {
        setAlert({
          msg: error.response.data.msg || 'Invalid Token',
          error: true
        })
        
      }
    }
    checkToken();
  }, [])
  
  const {msg} = alert;
  return (
    <>
      
      <form 
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-md px-10 py-5'
      >
        <h2 className='text-sky-600 font-black text-6xl capitalize my-10'>Reset your <span className='text-slate-700'>password.</span></h2>
        
        {
          msg && <Alert alert={alert} />
        }
        {
          validToken && (
            <>
            <div className='my-5 '>
            <label 
            htmlFor="password" 
                      className='block uppercase text-gray-600 text-xl font-bold'
                    >Password</label>
                    <input 
                      type="password" 
                      id='password'
                      value={password}
                      onChange={handleChange}
                      placeholder='Write your new password'
                      className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
                    />
                  </div>
                  <div className='my-5 '>
                    <label 
                      htmlFor="password2" 
                      className='block uppercase text-gray-600 text-xl font-bold'
                    >Repeat Password</label>
                    <input 
                      type="password" 
                      id='password2'
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                      placeholder='Write again your new password'
                      className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
                    />
                  </div>
                  <input type="submit" className='w-full bg-sky-600 rounded-md text-white font-bold py-2 text-xl cursor-pointer hover:bg-sky-900 transition-colors mt-10' value='Reset Password'  />
                  <nav className='lg:flex lg:justify-between '>
                    <Link
                      to='/'
                      className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
                    >Already has an account? Login</Link>
                    
                  </nav>
                  </>
          )
        }
        {
          passwordModified && (
            <Link
              to='/'
              className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
            > Login</Link>
          )
        }
        
      </form>
      

    </>
  )
}
