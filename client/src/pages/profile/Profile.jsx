import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import ProfilePicture from '../../assets/defaultUser.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const {id} = useParams();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleUplodatePicture, setToggleUplodatePicture] = useState(true);
  
  const [email,setEmail] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const [image, setImage] = useState(null)
  const [profilePic, setProfilePic] = useState('');
  const [userProfileData, setUserProfileData] = useState({});
  const { auth,setAuth } = useAuth();


  
  const handleSelectFile = (e) => {
    setImage(e.target.files[0])
    
  }

  const uploadPicture = async (e) => {
    e.preventDefault();
    try {
    //    const response = await axios.post(`${BASE_URL}/users/update/photos/${currentUser.id}`, {
    //       image
    //     },
    //      {
    //        headers: {
    //          "Content-Type": "multipart/form-data",
    //          'Authorization': 'Bearer ' + currentUser.token,

    //        },
          
    //     },
    // );
    // setProfilePic(response.data.photos[0]);
      const response = await axiosPrivate.post(`/users/update/photos/${auth._id}`, { image,isMain:true }, { headers: { "Content-Type": 'multipart/form-data' } })
    setProfilePic(response.data.photos[0]);
      
    } catch (error) {
      console.log({error})
    }

    // const response = await axios.post(`${BASE_URL}/users/update/photos/${currentUser.id}`)
}

  useEffect(() => {
      if (id === auth.id) {
           setEmail(auth.email)
            setFirstname(auth.firstname)
             setLastname(auth.lastname)
      return;
    }
    // axios.get(`http://localhost:8080/users/${id}`,{headers:{Authorization: `Bearer ${currentUser.token}`}}).then(res => setUserProfileData(res.data.user))
    axiosPrivate.get(`/users/${id}`).then(res => setUserProfileData(res.data.user))
    

 
  },[])
  const handleUpdate = async (e) => {
    e.preventDefault();
    // try {
      // console.log(`${BASE_URL}/${currentUser.id}`)
      // const res = await axios.put(`${BASE_URL}/users/${currentUser.id}`, {
      // email,
      // firstname,
      // lastname,
      // password
      // }, {
      //   headers: {
      //     'Authorization': 'Bearer ' + currentUser.token,
      //     'Content-Type':'application/json'
      //   },
        // withCredentials: true
    //   });
    // } catch (error) {
    //   console.log(error)
      // setEmail(error.message)
    try {
      const res = await axiosPrivate.put(`/users/${auth._id}`,{email,firstname,lastname,password})
    } catch (error) {
      console.log(error)
      setEmail(error.message)
    }
    }
  
  if (id !== auth._id) {
  return (
    <div className="profile">

    
      <div className="images">
        {/* <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        /> */}
        {/* <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        /> */}

         <img
          src={auth?.photos?.length > 0 ? auth?.photos[0]?.url : ProfilePicture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{userProfileData?.firstname} {' '} {userProfileData?.lastname} </span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}>
                <button onClick={() => setToggleUpdate(prev => !prev)}  style={{marginRight:'16px'}}>ADD</button>
              </div>
            </div>
         
           
          </div>
        
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        
    



      <Posts/>
      </div>
    </div>
  );
  }
  return (
    <div className="profile">
      {/* <button onClick={async() => {
        const response = await axios.get(`${BASE_URL}/users`, {withCredentials:true}, {
          headers: {
            'Authorization': 'Bearer ' + currentUser.token,
            'Content-Type': 'application/json'
          },
        });
        console.log({response});
      }}>Test http</button> */}
      <div className="images">
        {/* <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        /> */}
        {/* <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        /> */}

         <img
          src={auth.photos.length > 0 ? auth.photos[0].url : ProfilePicture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            {/* <span>{firstname} </span> */}
            <span>{auth?.firstname} {' '} {auth?.lastname} </span>

            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}>
                <button onClick={() => setToggleUpdate(prev => !prev)}  style={{marginRight:'16px'}}>Update</button>
                <button onClick={() => setToggleUplodatePicture(prev => !prev)}><FontAwesomeIcon icon={faImage} size="1x" /></button>
              </div>
            </div>
         
           
          </div>
        
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        
        {
          toggleUplodatePicture && <div class="mb-3 post p" style={{
            marginBottom: '20px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center'
          }}> 
            <input className="form-control" type="file" name="image" id="formFile" style={{ backgroundColor: '#222', border: 'none', borderRadius: '15px', marginBottom: '16px' }} onChange={handleSelectFile}/>
            <div>
              <button className="btn btn-primary" onClick={uploadPicture}>Upload</button>
            </div>
        </div> 
        }


        {toggleUpdate && <div className="Container" style={{
          marginBottom:'20px'
        }}>
          <div className="post" >
               <form style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
              flexDirection: 'column',
            padding:'18px'
          }}>
              <input type="email" value={email} palceholder="email" onChange={(e) => setEmail(e.target.value)} />
              <br/>
              <input type="text" value={firstname} palceholder="Firstname" onChange={(e) => setFirstname(e.target.value)} />
                            <br/>

              <input type="text" value={lastname} palceholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
                            <br/>

              <input type="password" value={password} placeholder='Enter New Password' onChange={(e) => setPassword(e.target.value)} />
                            <br/>

              <input type="password" value={confirmPassword} placeholder='Confirm New Password' onChange={(e) => setConfirmPassword(e.target.value)} />
              <br />
              <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>

            </form>
           </div>
          </div>}
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;
