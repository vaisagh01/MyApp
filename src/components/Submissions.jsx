import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Submissions.css'

export default function Submissions() {
    const [storedData, setStoredData] = useState([]);
    const [cleared, setCleared] = useState("")
    const fetchData = () => {
        const retrievedData = localStorage.getItem('formData');
        if (retrievedData) {
            setStoredData(JSON.parse(retrievedData));
        }
    };
    const handleDeleteList = () => {
        localStorage.clear()
    }
    useEffect(()=>{
        fetchData();
    },[storedData])
  return (
    <div className='ml-14 z-30'>
    <NavLink to={'/'}><button className='bg-indigo-700 hover:-translate-x-[4px] transition-all rounded-3xl px-1 pr-3 py-1 flex mb-3 text-white text-xs items-center '><ArrowLeft className='p-[2px]'/><p>Go Back</p></button></NavLink>
        <div className=' overflow-auto rounded-xl h-[86vh] bg-slate-100 w-[97vw]'>
            <table>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phoneno</th>
                    <th>Email</th>
                    <th>Link</th>
                    <th>File Info</th>
                </tr>
                {storedData.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.firstName + " " + item.lastName}</td> 
                            <td>{item.phoneno}</td>
                            <td>{item.email}</td>
                            <td>{item.link}</td>
                            <td>{item.fileinfo}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    <button onClick={handleDeleteList} className='bg-red-600 rounded-3xl absolute top-5 right-5  p-1 text-white '> clear data</button>
    </div>
  )
}
