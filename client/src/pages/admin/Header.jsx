import { width } from '@mui/system';
import React, { useContext } from 'react'
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const {auth} =useAuth()
  return (
      <>
           <nav>
      <div className="sidebar-button">
        <i className='bx bx-menu sidebarBtn'></i>
          <span className="dashboard">Dashboard</span>
        </div>
        <p style={{
          marginLeft: '18px',
          width:'max-content'
        }}> You're now logged in as : <bold style={{
            fontWeight: 'bold'
        }}>{auth.firstname} {auth.lastname} </bold></p>

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
          </div>
    </>
  )
}

export default Header;