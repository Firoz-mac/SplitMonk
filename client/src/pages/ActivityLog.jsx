import React from 'react'
import { useAppContext } from './../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';

const ActivityLog = () => {

  const {axios} = useAppContext();
  const [logs, setLogs] = useState([]);

  const getLogs = async ()=>{
    const {data} = await axios.get('/api/logs/get');
    if(data.success){
      setLogs(data.logs);
      console.log(data.logs);
    }
  }

  useEffect(()=>{
    getLogs();
  },[]);

  return (
    <div className='w-full h-full flex flex-col gap-3'>
        <h4 className='text-2xl font-medium'>Recent Activity</h4>
        <div className='flex-1'>
          {logs.map((log, index)=>(
            <>
              <div key={index} className='flex flex-col'>
                <span >userId: {log.userId}</span>
                <span>{log.action}</span>
              </div>
              
            </>
          ))}
            
        </div>
    </div>
  )
}

export default ActivityLog