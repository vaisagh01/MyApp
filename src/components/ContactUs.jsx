import {useState} from 'react'
import './ContactUs.css';
import {motion} from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Popup from './Popup';

let storedForms = [];

export default function ContactUs() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [popup, setPopup] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [fileInfo, setFileInfo] = useState("")
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
    <div className='flex flex-col items-center'>

      <div className='flex w-[350px] items-start flex-col bg-slate-100 rounded-xl shadow-lg px-8 py-7'>

        <form>
          <p className='font-bold text-2xl text-slate-500 mt-2 mb-4'>Contact Us</p>

          <label htmlFor="First Name">First Name</label>
          <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" name='First-Name' placeholder='Enter your First Name' />

          <label htmlFor="Last-Name">Last Name</label>
          <input onChange={(e)=>{setLastName(e.target.value)}}  type="text" name='Last-Name' placeholder='Enter your Last Name' />

          <label htmlFor="phoneno">Phone no</label>
          <input onChange={(e)=>{setPhoneno(e.target.value)}}  type="number" name="phoneno" id="" placeholder='Enter your Phone No.' />

          <label htmlFor="email">E-Mail</label>
          <input onChange={(e)=>{setEmail(e.target.value)}}  type="email" name="email" id="" placeholder='Enter your Email' />

          <label htmlFor="url">Link</label>
          <input onChange={(e)=>{setLink(e.target.value)}}  type="url" name="url" id="" placeholder='Paste your Link' />
          <h1>Upload Files</h1>
        </form>

        <div className='flex gap-2 '>
          <input className='border-none px-0' name='image' onChange={(e)=>{setFile(e.target.files[0])}} type="file" />
          <motion.button  className='bg-blue-500 hover:bg-blue-600 rounded-lg transition-all hover:-translate-y-[2px] shadow-xl text-white px-4 py-1 ' onClick={ handleUpload } >submit</motion.button>
        </div>

        {/* Modal element */}
        {popup ? <Popup success={success} />:null}
        
      </div>
      <NavLink to={'/Submissions'}><button className='bg-purple-800 shadow-xl hover:translate-x-[7px] transition-all rounded-md px-16 py-2 flex text-sm  text-slate-100 mt-4'><p>View Submissions</p> <ArrowRight className='p-[2px]'/></button></NavLink>
    </div>
  )
}
