import { useAuth } from "../../context/AppContext.tsx" 
import "../css/RegisterPage.css"
import { Link } from "react-router-dom"
import {useForm, SubmitHandler} from "react-hook-form"
import { FormValues, appContextIn } from "../../interfaces/contextInterfaces.ts"

function RegisterPage() {

    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
    const {singUp, errors: registerErrors} = useAuth() as appContextIn

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
            {
                registerErrors? registerErrors.map((error, id) => (
                    <div key={id} className="error-list">
                        {error}
                    </div>
                )) : ""
            }
            <button className="auth-btn">Registrarse</button>
        </form>

        <p>
            <Link to={"/login"} className="auth-link">¿Aun no tientes una cuenta?</Link>
        </p>

    </div>
  )
}

export default RegisterPage