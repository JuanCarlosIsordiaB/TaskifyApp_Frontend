import { useState } from 'react';
import {Link} from 'react-router-dom';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';

export const Register = () => {

  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [reppassword, setReppassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit =  async(e) => {
    e.preventDefault();

    if([name,email,password,reppassword].includes('')){
      
      setAlert({
        msg: 'All fields are required',
        error: true
      })
      return
    }

    if( password !== reppassword){
      setAlert({
        msg: 'Passwords must be the same',
        error: true
      })
      return
    }

    if( password.length < 3){
      setAlert({
        msg: 'Password is too short ',
        error: true
      })
      return
    }

    setAlert({});

    //Creating user in the API
    try {
      const {data} = await clientAxios.post(`/users`,
      {name, email,password});
      setAlert({
        msg: data.msg,
        error: false
      })
      setNameValue('');
      setEmailValue('');
      setPasswordValue('');
      setReppassword('');
    } catch (error) {
      console.log();
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
        
        <h2 className='text-sky-600 font-black text-6xl capitalize my-10'>Create your <span className='text-slate-700'>account.</span></h2>
        <div className='my-5 '>
          {
            msg && <Alert alert={alert} />
          }
          <label 
            htmlFor="name" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Name</label>
          <input 
            type="text" 
            id='name'
            placeholder='Your name'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            value={name}
            onChange={(e) => setNameValue(e.target.value)}
            />
        </div>
        <div className='my-5 '>
          <label 
            htmlFor="email" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Email</label>
          <input 
            type="email" 
            id='email'
            placeholder='Write your email'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            value={email}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div className='my-5 '>
          <label 
            htmlFor="password" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Password</label>
          <input 
            type="password" 
            id='password'
            placeholder='Write your Password'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            value={password}
            onChange={(e) => setPasswordValue(e.target.value)}
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
            placeholder='Write again your Password'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            value={reppassword}
            onChange={(e) => setReppassword(e.target.value)}
          />
        </div>
        <button
          className='w-full bg-sky-600 rounded-md text-white font-bold py-2 text-xl cursor-pointer hover:bg-sky-900 transition-colors mt-10'
        >
          Create account
        </button>
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
