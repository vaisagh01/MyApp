import React from 'react'
import {motion} from 'framer-motion'
import {Check} from 'lucide-react'

export default function Popup({success}) {
  return (
    <div>
        <motion.div  transition={{duration:0.5,ease:[0.76,0,0.24,1]}}  initial={{opacity:0}} animate={{y:-20, opacity:1}}  className=' bg-white shadow-2xl rounded-lg top-15 absolute px-9 py-3 flex'>
            <motion.p className='font-bold text-slate-500'>{success}</motion.p>{success==="form Submitted" && <Check/>}
        </motion.div>
    </div>
  )
}
