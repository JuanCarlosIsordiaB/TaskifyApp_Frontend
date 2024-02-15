import {useEffect,useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';

export const ConfirmAccount = () => {

  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const params = useParams();

  const { id } = params;


  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const {data} = await clientAxios(url);

        setAlert({
          msg: data.msg,
          error:false
        })
        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount();
  }, [])
  
  const {msg} = alert;

  return (
    <>
      <h2 className='text-sky-600 font-black text-6xl capitalize my-10 '>Confirm your <span className='text-slate-700'>account.</span></h2>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          msg && <Alert alert={alert}></Alert>
        }
        {
          confirmedAccount && (
            <Link
              to='/'
              className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
            > Login</Link>
          )
        }
      </div>
      

    </>
  )
}
