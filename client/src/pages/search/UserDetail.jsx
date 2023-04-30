import { useEffect, useState } from "react";
import styles from './SearchUsersDetails.module.css'
import { Link } from "react-router-dom";
import genericProfilePicture from '../../assets/defaultUser.png'
import Button from './Button'
import useAuth from "../../hooks/useAuth";
const UserDetail = ({ user,isFriend,isFriendRequest ,setSearchResult }) => {
  const {auth,setAuth } = useAuth();
  const photo = user.photos.find(photo => photo.isMain);
  const [buttonType, setButtonType] = useState();

  useEffect(() => { 

    const inFriendList = user.friendList.find(userId => {
      console.log(userId === auth._id)
      return  userId === auth._id
    });
    const inFriendRequests = user.friendRequests.find(userId => userId === auth._id);
    // console.log(user)
    // console.log({inFriendList})
    // console.log({inFriendRequests})
    if (inFriendList) {
      setButtonType('delete-button')
    
      // refreshLoggedInUser();
      return;
    }

    else if (inFriendRequests) {
      setButtonType('accept-decline-button')
      // refreshLoggedInUser();

      return;
    } else {

      setButtonType('add-button')
      // refreshLoggedInUser();

      return;
    }
  }, [])

    
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img src={photo?.url ? photo.url : genericProfilePicture} alt="profile" className={styles.img} />

        </Link>
      </div>
      <div className={styles.details}>
        <Link to={`/profile/${user._id}`}>
          <h5>{user.firstname} {' '} {user.lastname}</h5>

        </Link>
        <Button type={buttonType} setButtonType={setButtonType} user={user}/>
      </div>
    </div>
   )
}

export default UserDetail