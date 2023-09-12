import { useAuth } from "../context/AppContext.tsx" 
import "../css/RegisterPage.css"
import {useForm, SubmitErrorHandler, SubmitHandler} from "react-hook-form"
import { FormValues, appContextIn } from "../interfaces/contextInterfaces"

function RegisterPage() {

    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
    const {singUp, users} = useAuth() as appContextIn

    const submit: SubmitHandler<FormValues> = async (data) => {
        singUp(data)
    }

  return (
    <div className='authPage'>
        <form 
            onSubmit={ handleSubmit(submit) }
            className="auth-con"
        >

            <h1 >Registrarse</h1>

            <div className="auth-body">
                <input 
                    className="auth-input" 
                    type="text" 
                    {...register("name", {required: true})}
                    placeholder='Nombre de usuario'
                />
                {
                    errors.name && (
                        <p >El nombre de usuario es requerido</p>
                    )
                }
                <input 
                    className="auth-input" 
                    type="email" 
                    {...register("email", {required: true})}
                    placeholder="Correo"
                />
                {
                    errors.email && (
                        <p>El correo es requerido</p>
                    )
                }
                <input 
                    className="auth-input" 
                    type="password" 
                    {...register("password", {required: true})}
                    placeholder='Contraseña'
                />
                {
                    errors.password && (
                        <p>La contraseña es requerida</p>
                    )
                }
            </div>

            <button className="auth-btn">Registrarse</button>

        </form>
    </div>
  )
}

export default RegisterPage