import React from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth';
import styles from './button.module.css';

const Picture = ({ photo }) => {
    const axiosPrivate = useAxiosPrivate();
    const { setAuth} = useAuth();
    const setAsMainHandler =  async() => {
        const res = await axiosPrivate.put(`/users/update/photos/main/${photo?._id}`)
        setAuth(prev => {
            return {
                ...prev,
                currentPhoto:photo
            }
        })
    }
    const deletePictureHandler = async() => {
        console.log({photo})
        const res = await axiosPrivate.put(`/users/update/photos/${photo?._id}`, { imageUrl: photo?.url })
        // console.log({res})
        setAuth(prev => {
            return {
                ...prev,
                photos:prev.photos.filter(p => p._id !== photo._id)
            }
        })
    }
  return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
           <div style={{display:'flex',marginLeft:'30px',backgroundColor:'#222' , width:'350px',height:'250px',padding:'25px'}}>     
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column'}}>
                <button className={styles.setAsMainButton} onClick={setAsMainHandler} disabled={photo.isMain}>Set As Main</button>
                <button className={styles.deleteButton} onClick={deletePictureHandler}>Delete</button>
            </div>
          <img src={photo.url}  alt={photo.url} style={{width:'175px',height:'175px'}}/>
        </div>
     </div>
  )
}

export default Picture   