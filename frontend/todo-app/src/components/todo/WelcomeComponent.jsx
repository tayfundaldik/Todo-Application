import { Link,useParams } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldPath } from "./api/HelloWorldApiService";
import { useAuth } from "./Security/AuthComponent";
function WelcomeComponent(){
    const {username} = useParams()
    const authContext = useAuth()
    const [message,setMessage] = useState(null)
    function CallHelloWorld(){
        console.log('call')  
        retrieveHelloWorldPath("Tayfun",authContext.token)
        .then((response) => SuccessfulResponse(response) )
        .catch((error) => ErrorResponse(error))
        .finally(() => console.log('cleanup'))
    }
    function SuccessfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }
    function ErrorResponse(error){
        console.log(error)
    }
    return(
            <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div >
                If you want to see your todos <Link to='/todos'>click me!</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={CallHelloWorld}>Rest API</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}
export default WelcomeComponent;