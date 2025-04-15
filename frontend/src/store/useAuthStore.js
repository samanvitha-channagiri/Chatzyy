import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdateingProfile:false,
    isCheckingAuth:true,
    
    checkAuth:async()=>{
        try{
          const res=await axiosInstance("/auth/check")
          set({authUser:res.data})
          console.log(authUser);
          
          console.log(res);
          
        }catch(error){
          set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
      set({isSigningUp:true});
      try{
       
        
       const res  =await axiosInstance.post("auth/signup",data)
       console.log(res);
       set({authUser:res.data});
       toast.success("Account created successfully");
      }catch(error){
        toast.error(error.response.data.message)
      }finally{
        set({isSigningUp:false});
      }

    },

    login:async(data)=>{
          set({isLoggingIn:true});
          try{
          const res=await axiosInstance.post("/auth/login",data)
          set({authUser:res.data});
          toast.success("Logged in successfully!");

          }catch(error){
            toast.error(error.response.data.message);

          }finally{
            set({isLoggingIn:false});
          }
    },
    logout:async()=>{
     
      try{
        await axiosInstance.post("auth/logout");
        set({authUser:null})
        toast.success("Logged out successfully")
      }catch(error){
        toast.error(error.response.data.message) //whatever the error message we are gettint from the backend

      }

    }

}))

/*
when we refresh our page we would want to check if user is authenticated or not

*/

/* we can use isLoggingOUt state if you want, but it is super quick , so it is not a necessary here*/ 