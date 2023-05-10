import { width } from '@mui/system';
import React, { useContext } from 'react'
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const {auth} =useAuth()
  return (
      <>
      <nav style={{backgroundColor:'#fff',height:'80px',display:'flex',justifyContent:'flex-end',alignItems:'center',marginBottom:'30px'}}>
    
      {/* <div className="search-box" style={{margin:'auto' }}>
          <input type="text" placeholder="Search..." style={{
            width: '300px', height: '30px', borderRadius: '16px', padding: '12px',
            ':focus': {
              border:'none'
            }
          }} />
        <i className='bx bx-search' ></i>
      </div> */}
        <p style={{
          marginRight: '18px',
          width: 'max-content',
        }}> You're now logged in as : <h3 style={{
            fontWeight: 'bold',
            display: 'inline',
          textTransform:'capitalize'
        }}>{auth.firstname} {auth.lastname} </h3></p>


      {/* <div className="profile-details">
        <!--<img src="images/profile.jpg" alt="">-->
        <span className="admin_name">Prem Shahi</span>
        <i className='bx bx-chevron-down' ></i>
      </div> */}
    </nav>

    {/* <div className="home-content">
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
          </div> */}
    </>
  )
}

export default Header;