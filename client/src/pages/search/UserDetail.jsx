import { useEffect, useState } from "react";
import styles from './SearchUsersDetails.module.css'
import { Link } from "react-router-dom";
import genericProfilePicture from '../../assets/defaultUser.png'
import Button from './Button'
import useAuth from "../../hooks/useAuth";
const UserDetail = ({ user  }) => {
  const {auth } = useAuth();
  const [buttonType, setButtonType] = useState();
  useEffect(() => { 

    const inFriendList = user.friendList.find(userId => {
      return  userId === auth._id
    });
    const inFriendRequests = user.friendRequests.find(userId => userId === auth._id);

    if (inFriendList) {
      setButtonType('delete-button')
      return;
    }

    else if (inFriendRequests) {
      setButtonType('accept-decline-button')
      return;

    } else {

      setButtonType('add-button')
      return;
    }
  }, [])

    
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img src={user?.currentPhoto ? user?.currentPhoto?.url : genericProfilePicture} alt="profile" className={styles.img} />
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