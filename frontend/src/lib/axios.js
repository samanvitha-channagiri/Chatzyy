/*creating an instance that we can use throughout the application */

import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE==="development"?"http://localhost:5001/api":"api",
    withCredentials:true
})

/*withCredentials:true-->sends cookies in every single request */