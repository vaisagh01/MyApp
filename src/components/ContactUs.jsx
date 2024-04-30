import {useState} from 'react'
import './ContactUs.css';
import {motion} from 'framer-motion'
import {ArrowRight, Headphones } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Popup from './Popup';


export default function ContactUs() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [popup, setPopup] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  // Local Storage setup or importing
  let storedForms = localStorage.getItem("formData");
  const [formList, setFormList] = useState(()=>{
    if(!storedForms){
      return [];
    } else {
      return JSON.parse(storedForms)
    }
  });

  // handling upload of files
  const handleUpload = async () => {
    if(!file || firstName === "" || lastName === "" || phone === "" || email === "" || link === "" ){
        setSuccess("No field can be empty");
        const timeout  = setTimeout(() => {
          setPopup(false);
        }, 1000);
        setPopup(true);
        return;
    } 
    const timeout  = setTimeout(() => {
      setPopup(false);
    }, 1000);
    setSuccess("form Submitted")
    setPopup(true);
    const formData = new FormData();
    try{
      const response = await fetch('https://e6d88894-89de-4171-beca-fb7d365b37e6.mock.pstmn.io', {
        method:'POST',
        body:formData,
      });
      
      if(!response.ok){
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      console.log("upload successfull");
      const formDatatemp = {
        firstName: firstName, 
        lastName: lastName,
        phoneno: phone,
        email:email,
        link:link,
        fileinfo: file.name
      }; 
      console.log(formList);
      let updatedList = [...formList]
      updatedList.push(formDatatemp);
      console.log(updatedList)
      setFormList(updatedList);
      localStorage.setItem('formData', JSON.stringify(updatedList));

    }catch(e) {
      console.error(e);
      setSuccess("Upload Failed")
    }
  }


  return (
    <div className=' overflow-hidden w-full flex flex-col rounded-xl mx-2 sm:w-[500px] h-[98%] bg-white items-center z-10 shadow-xl'>
      <div className='flex w-full h-full items-start flex-col px-9 py-14'>
        <form>
          <p className='font-semibold text-4xl text-slate-500 mt-2 mb-4 flex items-center justify-evenly'><p>Contact Us</p> <Headphones className=' mt-1 size-9'/> </p>
         <div className='flex justify-between w-full '>
            <section>
              <label htmlFor="First Name">First Name</label>
              <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" name='First-Name' placeholder='Enter your First Name' />
            </section>
            <section>
              <label htmlFor="Last-Name">Last Name</label>
              <input onChange={(e)=>{setLastName(e.target.value)}}  type="text" name='Last-Name' placeholder='Enter your Last Name' />
            </section>
            
          </div>

          <label htmlFor="phoneno">Phone no</label>
          <input onChange={(e)=>{setPhoneno(e.target.value)}}  type="number" name="phoneno" id="" placeholder='Enter your Phone No.' />

          <label htmlFor="email">E-Mail</label>
          <input onChange={(e)=>{setEmail(e.target.value)}}  type="email" name="email" id="" placeholder='Enter your Email' />

          <label htmlFor="url">Link</label>
          <input onChange={(e)=>{setLink(e.target.value)}}  type="url" name="url" id="" placeholder='Paste your Link' />
          <h1>Upload Files</h1>
        </form>

        <div className='flex flex-col gap-2 w-full '>
          <input className='border-none file:w-1/2 file:border-slate-300 file:border-[1px] file:shadow-sm  px-0 file:bg-blue-100 file:rounded-md file:p-3 file:cursor-pointer' name='image' onChange={(e)=>{setFile(e.target.files[0])}} type="file" />
          <motion.button whileTap={{scale:1.1}}  className='bg-indigo-500 h-10 hover:bg-indigo-600 rounded-lg transition-all hover:-translate-y-[2px] shadow-2xl text-white px-4 py-1 ' onClick={ handleUpload } ><p>Submit</p></motion.button>
        </div>

        {popup ? <Popup success={success} />:null}
        
        <NavLink to={'/Submissions'} ><button className='bg-lime-600 items-center shadow-2xl hover:translate-x-[7px] transition-all rounded-md px-16 py-2 flex text-sm text-slate-100 mt-4'><p>View Submissions</p> <ArrowRight className='pt-[5px] p-[2px]'/></button></NavLink>
      </div>
    </div>
  )
}
