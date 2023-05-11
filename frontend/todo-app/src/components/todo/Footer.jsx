import { Authcontext } from "./Security/AuthComponent";
import { useContext } from "react";
function FooterComponent(){
    const authContext = useContext(Authcontext)
    console.log(`Footer component - ${authContext.number}`)
    return(
        <footer className="footer">
        <div className='container'>
            Footer
        </div>

        </footer>
    )
}
export default FooterComponent;