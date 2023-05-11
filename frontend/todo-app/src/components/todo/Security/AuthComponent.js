import { createContext, useContext, useState } from "react";
import {executeJWTAuthService } from "../api/AuthenticationApi";
import { apiClient } from "../api/ApiClient";

export const Authcontext = createContext()
export const useAuth = () => useContext(Authcontext)

export default function AuthProvider({children}){
    const [isAuthenticated, setAuthenticate] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    
    // function login (username,password){
    //     if (username === 'datwashurtt' && password === 'schwifty') {
    //         setAuthenticate(true)
    //         setUsername(username)
    //         return true
    //     }else{
    //         setAuthenticate(false)        
    //         setUsername(null)    
    //         return false
    //     }
    // }

    // async function login (username,password){
    //     const baToken ='Basic ' + window.btoa(username + ":" +password)
    //     try{
    //     const response = await executeBasicAuthService(baToken)
    //     if (response.status == 200) {
    //         setAuthenticate(true)
    //         setUsername(username)
    //         setToken(baToken)

    //         apiClient.interceptors.request.use(
    //             (config)=> {console.log('intercepting and adding a token')
    //             config.headers.Authorization = baToken
    //             return config
    //         }
    //         )

    //         return true
    //     }else{
    //         logout();
    //         return false
    //     }
    // }catch(error){
    //     logout();
    //     return false
    // }
    // }

    async function login (username,password){
        const baToken ='Basic ' + window.btoa(username + ":" +password)
        try{
        const response = await executeJWTAuthService(username,password)
        if (response.status == 200) {
            const JWTtoken = 'Bearer ' + response.data.token
            setAuthenticate(true)
            setUsername(username)
            setToken(JWTtoken)

            apiClient.interceptors.request.use(
                (config)=> {console.log('intercepting and adding a token')
                config.headers.Authorization = JWTtoken
                return config
            }
            )

            return true
        }else{
            logout();
            return false
        }
    }catch(error){
        logout();
        return false
    }
    }


    function logout (){
        setAuthenticate(false)
        setToken(null)
        setUsername(null)    
    }
    return(

        <Authcontext.Provider value = {{isAuthenticated,login,logout,username,token}}>
            {children}
        </Authcontext.Provider>
    )
}