'use client'
import { signUpSchema } from "@/schemas/signUpSchema"
import React,{useState,useEffect} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useDebounceValue } from "usehooks-ts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



const page  = ()=>{
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceValue(username,500)  
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',  
      password: '',
    },
  });

  useEffect(()=>{
    if(debouncedUsername.length > 0){
      setIsCheckingUsername(true)
      setUsernameMessage('')
      try {
        
      } catch (error) {
        
      }
    }
  },[debouncedUsername])
  

  
  return(
    <div>page</div>
  )
}

export default page;