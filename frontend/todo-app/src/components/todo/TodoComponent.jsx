import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./Security/AuthComponent"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"


export default function TodoComponent(){
    const {id}= useParams()
    
    const [description,setDescription] = useState('')

    const [targetDate, setTargetDate] = useState('')

    const authContext=useAuth()
    const navigate = useNavigate()
    
    const username = authContext.username

    useEffect(
        () => retrieveTodos(),[id]
    )

    function retrieveTodos(){
    if( id != -1){
       retrieveTodoApi(username,id)
        .then( response => {
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }
}

    function onSubmit(value){
        console.log(value)
        const todo = {
            id : id,
            username: username,
            description : value.description,
            targetDate : value.targetDate,
            done : false
        }
        console.log(todo)
        if(id == 1){
            createTodoApi(username,todo)
            .then( 
                navigate('/todos')
            )
            .catch(error => console.log(error))
        }else{
        updateTodoApi(username,id,todo)
        .then( 
            navigate('/todos')
        )
        .catch(error => console.log(error))
        }}
    
    function validate(value){
        let errors = {
           /* description: 'Enter 3 characters at least.',
            targetDate: 'Enter a valid date.'*/
        };
        if (value.description.length<5 ){
            errors.description = 'Enter 5 characters at least'}
        if(value.targetDate == null || value.targetDate ==''){
            errors.targetDate = 'Enter a valid date.'
        }
        console.log(value)
        return errors;
    }
    

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
               <Formik initialValues={{description,targetDate}} 
               enableReinitialize = {true}
               onSubmit={onSubmit}
               validate={validate}
               validateOnChange = {true}
               validateOnBlur = {false}>{
                (props) =>(
                <Form>
                    <ErrorMessage
                    name='description'
                    component='div'
                    className="alert alert-warning"
                    />
                    <ErrorMessage
                    name='targetDate'
                    component='div'
                    className="alert alert-warning"
                    />
                    <fieldset  className="form-group">
                        <label>Description</label>
                        <Field type="text" className= "form-control" name = "description"/>
                    </fieldset>
                    <fieldset  className="form-group">
                        <label>Date</label>
                        <Field type = "date" className= "form-control" name = "targetDate"/>
                    </fieldset>
                    <div>
                        <button className="button-56" type="submit">Save</button>
                    </div>
                </Form>)
                }
               </Formik>
            </div>

        </div>
    )
}