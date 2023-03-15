import React,{useState ,useEffect,useContext} from 'react'
import './style.css'
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import User from './User';

const BASE_URl = 'http://localhost:8080'


const Content = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  

  const fecthUsers = async () => {
  const response = await axios.get(`${BASE_URl}/users`)
  setUsers(response.data);
  }

  useEffect(() => { 
      fecthUsers();
  }, [])
  
  return (
   
      <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <i className='bx bx-menu sidebarBtn'></i>
        <span className="dashboard">Dashboard</span>
      </div>
      <div className="search-box">
        {/* <input type="text" placeholder="Search..."> */}
        <i className='bx bx-search' ></i>
      </div>
      <div className="profile-details">
        {/* <!--<img src="images/profile.jpg" alt="">--> */}
        <span className="admin_name">Prem Shahi</span>
        <i className='bx bx-chevron-down' ></i>
      </div>
    </nav>

    <div className="home-content">
      <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Order</div>
            <div className="number">40,876</div>
            <div className="indicator">
              <i className='bx bx-up-arrow-alt'></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className='bx bx-cart-alt cart'></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Sales</div>
            <div className="number">38,876</div>
            <div className="indicator">
              <i className='bx bx-up-arrow-alt'></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className='bx bxs-cart-add cart two' ></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Profit</div>
            <div className="number">$12,876</div>
            <div className="indicator">
              <i className='bx bx-up-arrow-alt'></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className='bx bx-cart cart three' ></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Return</div>
            <div className="number">11,086</div>
            <div className="indicator">
              <i className='bx bx-down-arrow-alt down'></i>
              <span className="text">Down From Today</span>
            </div>
          </div>
          <i className='bx bxs-cart-download cart four' ></i>
        </div>
      </div>

        <div className='cart'>
     
        <table className="table">
        <thead>
    <tr>
      <th scope="col">Email</th>
      <th scope="col">Firstname</th>
      <th scope="col">Lastname</th>
      <th scope="col">role</th>
      <th scope="col">ban</th>
      <th scope="col">confirmed</th>
      <th scope="col">actions</th>
    </tr>
  </thead>
            <tbody>
              {users.map((user) => <User key={user._id} user={user} />)}
  </tbody>
  </table>
      </div>
    </div>
  </section>
  )
}

export default Content