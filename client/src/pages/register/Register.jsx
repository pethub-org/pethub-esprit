import "./register.scss"
import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
         <h1>Hello World</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus repudiandae praesentium illum cum, fugit corrupti? Debitis dicta, cumque quasi porro asperiores sint aliquid labore dolorem quo quis ea dolore nam!</p>
          <span> Do you have an account ?</span>
          <Link to="/login">
          <button> Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register