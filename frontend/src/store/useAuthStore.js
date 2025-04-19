import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5001":"/";
import {io} from "socket.io-client"
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try{
          const res=await axiosInstance("/auth/check")
          set({authUser:res.data});
          get().connectSocket();

        }catch(error){
          set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
      set({isSigningUp:true});
      try{
       
        
       const res  =await axiosInstance.post("/auth/signup",data)
       console.log(res);
       set({authUser:res.data});
       toast.success("Account created successfully")
       get().connectSocket();
      }catch(error){
        console.log("Error from signup",error);
        
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
          //as soon as we login, we would want to connect to socket
          get().connectSocket()
        
          

          }catch(error){
            console.log("Error in login function",error.message);
            
            toast.error(error.response.data.message);

          }finally{
            set({isLoggingIn:false});
          }
    },
    logout:async()=>{
     
      try{
        await axiosInstance.post("/auth/logout");
        set({authUser:null})
        toast.success("Logged out successfully")
        get().disconnectSocket()
      }catch(error){
        toast.error(error.response.data.message) //whatever the error message we are getting from the backend

      }

    },
    updateProfile:async(data)=>{
      set({isUpdatingProfile:true});
      try{
        const res=await axiosInstance.put("/auth/update-profile",data)
        set({authUser:res.data})
        toast.success("Profile updated successfully");

      }catch(error){
        console.log("error in update profile",error);
        toast.error(error.response.data.message);
      }finally{
        set({isUpdatingProfile:false});
      }

    },
    connectSocket:()=>{
      const {authUser}=get();
      /* If user is not authorized or  if the socket is already connected don't even try to connect*/ 
      if(!authUser||get().socket?.connected) return;
;
      const socket=io(BASE_URL,{
        query:{
          userId:authUser._id,
        }
      })
      socket.connect()
      set({socket:socket});

      socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds})
      })

    },
    disconnectSocket:()=>{
      if(get().socket?.connected) get().socket.disconnect();

    }

}))

/*
when we refresh our page we would want to check if user is authenticated or not

*/

/* we can use isLoggingOUt state if you want, but it is super quick , so it is not a necessary here*/ 