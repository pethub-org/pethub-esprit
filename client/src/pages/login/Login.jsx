import { Link } from "react-router-dom"
import "./login.scss"


const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
         <h1>Hello World</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus repudiandae praesentium illum cum, fugit corrupti? Debitis dicta, cumque quasi porro asperiores sint aliquid labore dolorem quo quis ea dolore nam!</p>
          <span> Don't you have an account ?</span>
          <Link to="/register">
          <button> Register</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login