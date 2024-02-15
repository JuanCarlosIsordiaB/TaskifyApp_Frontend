import React, { useState, useEffect } from 'react'
import useProjects from '../hooks/useProjects';
import Alert  from './Alert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

export const Form = () => {

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deliverDate, setDeliverDate] = useState('');
    const [client, setClient] = useState('');
    const [message, setMessage] = useState('Project Created')

    const params = useParams();
    const {showAlert,alert, submitProject, project} = useProjects();

    useEffect(() => {
      if(params.id && project.name){
        setId(project._id);
        setName(project.name);
        setDescription(project.description);
        setDeliverDate(project.deliverDate?.split('T')[0]);
        setClient(project.client);
        setMessage('Project Updated')
      }else{
        console.log('creating')
      }
    }, [params])

    
    


    const handleSubmit = async(e) => {
        e.preventDefault();

        
        if([name, description, deliverDate, client].includes('')){
            showAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }
        //Data to Provider
        
        await submitProject({id, name, description, deliverDate, client});

        toast.success( message , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setId(null);
        setName('');
        setDescription('');
        setDeliverDate('');
        setClient('');
    }

    const {msg} = alert;
  return (
    <form 
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
        onSubmit={handleSubmit}
    >
        {
            msg && <Alert alert={alert} />
        }
        <div className='mb-5'>
            <label 
                htmlFor="name"
                className='text-gray-700 uppercase font-bold text-sm block'
            >Name Project</label>

            <input 
                type="text" 
                id='name'
                className='border border-gray-300  w-full rounded-md p-2 placeholder-gray-400 mt-2'
                placeholder='Name of the project'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            
        </div>
        <div className='mb-5'>
            <label 
                htmlFor="description"
                className='text-gray-700 uppercase font-bold text-sm block'
            >Project Description</label>

            <textarea 
                type="text" 
                id='description'
                className='border border-gray-300  w-full rounded-md p-2 placeholder-gray-400 mt-2 py-5'
                placeholder='Description of the project'
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            
        </div>
        <div className='mb-5'>
            <label 
                htmlFor="deliver"
                className='text-gray-700 uppercase font-bold text-sm block'
            >Deliver Date</label>

            <input 
                id='deliver'
                type='date'
                className='border border-gray-300  w-full rounded-md p-2 placeholder-gray-400 mt-2 py-5'
                value={deliverDate}
                onChange={e => setDeliverDate(e.target.value)}
            />
            
        </div>
        <div className='mb-5'>
            <label 
                htmlFor="client"
                className='text-gray-700 uppercase font-bold text-sm block'
            >Client Name</label>

            <input 
                type="client" 
                id='client'
                className='border border-gray-300  w-full rounded-md p-2 placeholder-gray-400 mt-2'
                placeholder='Name of the client'
                value={client}
                onChange={e => setClient(e.target.value)}
            />
            
        </div>

        <input
            type='submit'
            value={id ? 'Update Project' : 'Create Project'}
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
        />
        <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="light"
      />
      {/* Same as */}
      <ToastContainer />

    </form>
  )
}
