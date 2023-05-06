import "./profile.scss";

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
import { Button } from "@mui/material";
import Picture from "./Picture";

const Profile = () => {
  const {id} = useParams();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleUplodatePicture, setToggleUplodatePicture] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  
  const [email,setEmail] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const [image, setImage] = useState(null)
  const [userProfileData, setUserProfileData] = useState({});
  const { auth, setAuth } = useAuth();
  const [isMain, setIsMain] = useState(false);
  

  
  const handleSelectFile = (e) => {
    setImage(e.target.files[0])

  }

  const uploadPicture = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(`/users/update/photos/${auth._id}`, { image,isMain }, { headers: { "Content-Type": 'multipart/form-data' } })
      const currentPhoto = response.data.photos.find(photo => photo.isMain);
      
      setAuth(prev => {
        return {
          ...prev,
          ...response.data,
          currentPhoto,
          // accessToken:prev.accessToken
        }
      });
      
    } catch (error) {
      console.log({error})
    }
}

  useEffect(() => {
      if (id === auth.id) {
           setEmail(auth.email)
            setFirstname(auth.firstname)
             setLastname(auth.lastname)
      return;
      }
      else {
        axiosPrivate.get(`/users/${id}`).then(res => setUserProfileData(res.data.user))
    }
    

 
  },[])
  const handleUpdate = async (e) => {
    e.preventDefault();
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
         <img
          src={userProfileData?.currentPhoto ? userProfileData?.currentPhoto?.url : ProfilePicture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">

          </div>
          <div className="center">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h4 style={{textTransform:'capitalize'}}>{userProfileData?.firstname} {' '} {userProfileData?.lastname} </h4>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}>
                
              </div>
            </div>
         
           
          </div>
        
          <div className="right" style={{visibility:'hidden'}}>
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
   
      <div className="images">

         <img
          src={auth?.currentPhoto ? auth?.currentPhoto?.url : ProfilePicture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">


          </div>
          <div className="center">
            <br />
            <br />
            <br />
            
            <span>{auth?.firstname} {' '} {auth?.lastname} </span>

            <div className="info">
           
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width:'max-content'
              }}>
                <button onClick={() => setToggleUpdate(prev => !prev)} style={{ marginRight: '16px' }}>Update</button>
                <button onClick={() => {
                  setShowPhotos(prev => !prev)
                }}  style={{marginRight:'16px'}}>show my photos </button>
                
                <button onClick={() => setToggleUplodatePicture(prev => !prev)}><FontAwesomeIcon icon={faImage} size="1x" /></button>

              </div>
            </div>
         
           
          </div>
        
          <div className="right" style={{visibility:'hidden'}}>
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
    
        {
          toggleUplodatePicture &&
          <div class="mb-3 post p" style={{
            marginBottom: '20px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
              justifyContent: 'center',
              flexDirection:'column'
            }}> 
            <input className="form-control" type="file" name="image" id="formFile" style={{ backgroundColor: '#222', border: 'none', borderRadius: '15px', marginBottom: '16px' ,color:'white'}} onChange={handleSelectFile}/>
            <div>
              <br/>
              <div>
                <label style={{color:'white' }} >set as the main profile picture? </label>
               <input type="checkbox" value={isMain} onClick={(e) => setIsMain(prev => !prev)} />

                </div>
                <div style={{marginLeft:'50px',marginTop:'24px'}}>
              <Button className="btn btn-primary"  style={{backgroundColor:'#5271ff' , color:'white',textTransform:'none'}} onClick={uploadPicture}>Upload</Button>

                </div>
            </div>
        </div> 
        }
        
        
        
        {showPhotos && auth?.photos?.length <= 0 && <h4 style={{ color: 'white', textAlign: 'center' }}>You don't have photos yet.</h4>}
        <br/>
        

        {showPhotos  && auth.photos.map(photo => <Picture key={photo._id} photo={photo}/>)}


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
              <input type="email" placeholder="email" value={auth.email} palceholder="email" onChange={(e) => setEmail(e.target.value)} />
              <br/>
              <input type="text" placeholder="firstname" value={auth.firstname} palceholder="Firstname" onChange={(e) => setFirstname(e.target.value)} />
                            <br/>

              <input type="text" placeholder="last" value={auth.lastname} palceholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
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
