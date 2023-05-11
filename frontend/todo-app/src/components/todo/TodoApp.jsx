import { useState } from 'react'
import './TodoApp.css'
import { BrowserRouter, Route, Routes,useNavigate,useParams,Link, Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodos'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './Security/AuthComponent'
import TodoComponent from './TodoComponent'

function AuthenticatedRoute({children}){
    const authconx= useAuth()
    if (authconx.isAuthenticated)
        return children
    return <Navigate to='/' />
}

export default function TodoApp(){
    return(<div className="TodoApp">
        <AuthProvider>
        <BrowserRouter>
        <HeaderComponent/>
            <Routes>
                <Route path = '/' element = {<LoginComponent/> } />

                <Route path = '/login' element = {<LoginComponent/>}/>

                <Route path = '/welcome/:username' element = {
                <AuthenticatedRoute>
                <WelcomeComponent/>
                </AuthenticatedRoute> } />

                <Route path = '/todos' element = {
                <AuthenticatedRoute>
                <ListTodosComponent/>
                </AuthenticatedRoute> } />

                <Route path = '/todo/:id' element = {
                <AuthenticatedRoute>
                <TodoComponent/>
                </AuthenticatedRoute> } />


                <Route path = '/logout' element = {
                <AuthenticatedRoute>
                    <LogoutComponent/>
                </AuthenticatedRoute> } /> 

                <Route path = '*' element = {<ErrorComponent/> } />
            </Routes>
       
        </BrowserRouter>
        
        </AuthProvider>
    </div>)
}  




