import { useAuth } from "../../context/AppContext.tsx" 
import "../css/RegisterPage.css"
import {useForm, SubmitHandler} from "react-hook-form"
import { FormValues, appContextIn } from "../../interfaces/contextInterfaces.ts"
import { Link } from "react-router-dom"

function LoginPage() {

    const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
    const {singIn, errors: loginErrors} = useAuth() as appContextIn

    const submit: SubmitHandler<FormValues> = async (data) => {
        singIn(data)
    }


  return (
    <div className='authPage'>
        <form 
            onSubmit={ handleSubmit(submit) }
            className="auth-con"
        >

            <h1 >Inicia Secion</h1>

            <div className="auth-body">
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
                loginErrors? loginErrors.map((error, id) => (
                    <div key={id} className="error-list">
                        {error}
                    </div>
                )) : ""
            }
            <button className="auth-btn">Iniciar Secion</button>
        </form>

        <p>
            <Link to={"/register"} className="auth-link">¿Ya tienes una cuenta?</Link>
        </p>

    </div>
  )
}

export default LoginPage