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
import { useEffect, useRef, useState } from "react";
import Button from "../search/Button";
import Picture from "./Picture";
import { ToastContainer, toast } from 'react-toastify';


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
  const [isLoading,setIsLoading] = useState(false);

  const emailRef = useRef(null)
  const [buttonType, setButtonType] = useState();
  const [friendRequest, setFriendRequest] = useState();

  
  const handleSelectFile = (e) => {
    setImage(e.target.files[0])

  }

  const uploadPicture = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axiosPrivate.post(`/users/update/photos/${auth._id}`, { image,isMain }, { headers: { "Content-Type": 'multipart/form-data' } })
      const currentPhoto = response.data.photos.find(photo => photo.isMain);
      console.log(response.data.friendList)
      setAuth(prev => {
        console.log("prev", prev.friendList)
        const friendList = prev.friendList.map(friend => {
          return { ...friend,currentPhoto: friend.currentPhoto };
        })
        return {
          ...prev,
          ...response.data,
          friendList,
          currentPhoto,
          // accessToken:prev.accessToken
        }
      });
        toast.success('Updated Picture!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
        setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      
      console.log({error})
    }
}

  useEffect(() => {
      if (id === auth._id) {
          setEmail(auth.email)
          setFirstname(auth.firstname)
          setLastname(auth.lastname)
      return;
      }
      else {
        axiosPrivate.get('/users/friend-requests').then(res => {
        const friedRequest = res.data.find(friendRequest => friendRequest.requester._id === userProfileData._id)

          setFriendRequest(friedRequest)
        })
        axiosPrivate.get(`/users/${id}`).then(res => {
          setUserProfileData(res.data.user);
          // console.log(res.data.user)
          const inFriendList = res.data.user.friendList.find(friend => { return friend._id === auth._id });
          // console.log({inFriendList})
      // const inFriendRequests = res.data.user.friendRequests.find(friend =>friend._id === auth._id);
      // console.log("friendlsit",res.data.user.friendList)
      // console.log("friendRequests",inFriendRequests)

    if (inFriendList) {
      setButtonType('delete-button')
      return;
    }

    // else if (inFriendRequests) {
    //   setButtonType('accept-decline-button')
    //   return;

        // } 
    else {
      // console.log({userProfileData})
      axiosPrivate.get(`/users/friend-requests`).then(res => {
        // console.log({res})
        const isFound = res.data.findIndex(friendRequest => friendRequest.requester._id === id)
        // console.log({isFound})
        if (isFound >= 0 ) {
          // console.log('here')
          setButtonType('accept-decline-button')
          return;
          // return;      
        } else {
          // console.log('add')
          setButtonType('add-button');
          return;
        }

     
      })
      return;
    }
        })

        return;
        
    }
    

 
  },[id,auth._id,auth.friendList])
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (email === '') {
    toast.error('Email can not be empty', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (firstname === '') {
        toast.error('Firstname can not be empty', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (lastname === '') {
      toast.error('Lastname can not be empty', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

     if (password === '') {
        toast.error('Password can not be empty', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (confirmPassword === '') {
        toast.error('Confirm Password can not be empty', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (confirmPassword !== password) {
        toast.error('Confirm Password and password must match', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }


    try {
      const res = await axiosPrivate.put(`/users/${auth._id}`, { email, firstname, lastname, password, confirmPassword })
      toast.success('Updated successfully!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });

    } catch (error) {
      console.log(error)
        toast.error(error.message || error?.error[0], {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
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
            {/* {userProfileData?.friendList?.find(friend => friend._id === auth._id)
              && <Button type={buttonType} setButtonType={setButtonType} user={userProfileData} />} */}
            {/* {!userProfileData?.friendList?.find(friend => friend._id === auth._id)
              && */}
              <Button type={buttonType} setButtonType={setButtonType} user={userProfileData} friendRequest={friendRequest}/>
              
              {/* } */}
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
                <button onClick={() => 
                  setToggleUpdate(prev => {
                    if (!prev) {
                      setShowPhotos(false)
                      setToggleUplodatePicture(false)
                    }
                    return !prev;
                  })
                  
                }
                  style={{ marginRight: '16px' }}>Update</button>
                <button onClick={() => {
                  setShowPhotos(prev => {
                    if (!prev) {
                      setToggleUpdate(false);
                      setToggleUplodatePicture(false)
                    }
                    return !prev;
                  })
                }}  style={{marginRight:'16px'}}>show my photos </button>
                
                <button onClick={() => setToggleUplodatePicture(prev => {
                  setToggleUpdate(false);
                  setShowPhotos(false)
                  return !prev
                })}><FontAwesomeIcon icon={faImage} size="1x" /></button>

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
                  <Button className="btn btn-primary"
                    style={{ backgroundColor: '#5271ff', color: 'white', textTransform: 'none' }}
                    onClick={uploadPicture}
                    disabled={isLoading}
                  >
                        Upload
                  </Button>

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
              <input type="email" placeholder="email" value={email} palceholder="email" onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
              <br/>
              <input type="text" placeholder="firstname" value={firstname} palceholder="Firstname" onChange={(e) => setFirstname(e.target.value)} />
                            <br/>

              <input type="text" placeholder="last" value={lastname} palceholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
                            <br/>

              <input type="password" value={password} placeholder='Enter New Password' onChange={(e) => setPassword(e.target.value)} />
                            <br/>

              <input type="password" value={confirmPassword} placeholder='Confirm New Password' onChange={(e) => setConfirmPassword(e.target.value)} />
              <br />
              <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>

            </form>
           </div>
        </div>}
        {/* {error?.length > 0 && <p style={{color:'red',margin:'auto'}}>{error}</p>} */}
        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        />
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;
