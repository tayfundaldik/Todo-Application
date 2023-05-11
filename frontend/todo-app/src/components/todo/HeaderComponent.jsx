import { Link } from "react-router-dom";
import {useAuth } from "./Security/AuthComponent";

function HeaderComponent(){
   const authContext = useAuth()
   const isAuthenticated = authContext.isAuthenticated
   console.log(authContext)
   function Logout1 (){
    authContext.logout()
   }
    return(
        <header className = 'border-bottom border-light border-5 mb-5 p-2'>
            <div className = 'container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                            <a className = 'navbar-brand ms-2 fs-2 fw-bold text-black'  href = 'https://www.reddit.com/user/datwashurtt'>DATWASHURTT</a>
                            <div className='collapse navbar-collapse'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item'>
                                            {isAuthenticated && <Link className='nav-link' to = '/welcome/datwashurtt'>Home</Link>}
                                    </li>
                                    <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to = '/todos'>Todos</Link>}
                                    </li>
                            </ul>
                            </div>
                            <ul className='navbar-nav'>
                            <li className='nav-item'>
                            {isAuthenticated && <Link className='nav-link' to = '/logout' onClick={Logout1}>Logout</Link>}
                                </li>
                            <li className='nav-item'>
                            {!isAuthenticated && <Link className='nav-link' to = '/login'>Login</Link>}
                                </li>
                            </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default HeaderComponent;