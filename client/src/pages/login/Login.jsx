import { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import "./login.scss"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  const email =useRef();
  const password=useRef();
  const {user,isFetching, error,dispatch} = useContext(AuthContext);
  const handlerClick=(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,
              password:password.current.value},dispatch)
  }
  console.log(user)
  return (
    <div className="login">
      <div className="card">
        <div className="left">
         <h1>PetHub</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus repudiandae praesentium illum cum, fugit corrupti? Debitis dicta, cumque quasi porro asperiores sint aliquid labore dolorem quo quis ea dolore nam!</p>
          <span> Don't you have an account ?</span>
          <Link to="/register">
          <button> Register</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handlerClick}>
            <input type="email" placeholder="email" required ref={email} />
            <input type="password" placeholder="Password" required minLength="6" ref={password}/>
            <Link to="/"><button>{isFetching ? "loading" :"Log In" }</button></Link>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login