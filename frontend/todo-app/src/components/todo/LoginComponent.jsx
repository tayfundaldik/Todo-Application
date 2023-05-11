import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./Security/AuthComponent"

function LoginComponent(){

    const [username,setUsername] = useState('datwashurtt')
    const [password,setPassword] = useState('')
    const [showErrorMessage, setErrorSuccess] = useState(false)
    const navigate = useNavigate()
    const authxx = useAuth()
    function handleUsernameChange(event){
        
        setUsername(event.target.value);
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }


    async function handleSubmit(){
        if (await authxx.login(username,password)) {
            navigate(`/welcome/${username}`)
        }else{
            setErrorSuccess(true)
        }
    }
   
  
    return(
        
        <div className="Login">
            <h1>Welcome to the Hell!</h1>
            <h2>Please Login</h2>
            {showErrorMessage && <div className='errorMessage'>Authenticated Failed. Please Enter a Valid Username or Password.</div>}
            
            <div className="LoginForm">
                <label>Username</label>
                <input type="text" name="username" value= {username} onChange={handleUsernameChange}/>
            </div>
            <div className="LoginForm">
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div className="LoginForm">
                <button type="button" name="login" onClick={handleSubmit}>login</button>
            </div>
        </div>
    )
}

export default LoginComponent;