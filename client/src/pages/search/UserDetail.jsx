import { useEffect, useState } from "react";
import styles from './SearchUsersDetails.module.css'
import { Link } from "react-router-dom";
import genericProfilePicture from '../../assets/defaultUser.png'
import Button from './Button'
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate  from '../../hooks/useAxiosPrivate';
const UserDetail = ({ user }) => {
  const { auth } = useAuth();
  const [buttonType, setButtonType] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {

    const inFriendList = user.friendList.find(userId => {
      return userId === auth._id
    });
    // const inFriendRequests = user.friendRequests.find(userId => userId === auth._id);

    // if (inFriendList) {
    //   setButtonType('delete-button')
    //   return;
    // }

    // else if (inFriendRequests) {
    //   setButtonType('accept-decline-button')
    //   return;

    // } else {

    //   setButtonType('add-button')
    //   return;
    // }
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
        const friedRequest = res.data.find(friendRequest => friendRequest.requester._id === user._id)
        console.log({friendRequest})
        setFriendRequest(friedRequest)

        console.log({friedRequest})
        if (friedRequest) {
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
  },[])
    
  return (
    <div className={styles.container}>
      <div style={{width:'30%'}}>
        <Link to={`/profile/${user._id}`} style={{color:'white'}}>
          <img src={user?.currentPhoto ? user?.currentPhoto?.url : genericProfilePicture} alt="profile" className={styles.img} />
        </Link>
      </div>
      <div className={styles.details} style={{width:'70%'}}>
        <Link to={`/profile/${user._id}`}  style={{color:'white'}}>
          <h5>{user.firstname} {' '} {user.lastname}</h5>

        </Link>
        <Button type={buttonType} setButtonType={setButtonType} user={user} friendRequest={friendRequest}/>
      </div>
    </div>
   )
}

export default UserDetail