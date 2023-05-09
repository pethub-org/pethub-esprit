import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth';
import styles from './button.module.css';
import { toast } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

const Picture = ({ photo }) => {
    const axiosPrivate = useAxiosPrivate();
    const { setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const setAsMainHandler = async () => {
       try {
         setIsLoading(true);
        const res = await axiosPrivate.put(`/users/update/photos/main/${photo?._id}`)
        setAuth(prev => {
            return {
                ...prev,
                friendList:[...prev.friendList],
                currentPhoto:photo
            }
        })
      toast.success('Updated successfully!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
        setIsLoading(false)
       } catch (error) {
        toast.error('Something went wrong.!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
        setIsLoading(false)
        
       }
    }
    const deletePictureHandler = async() => {
    try {
            // console.log({photo})
        setIsLoading(true)
        const res = await axiosPrivate.put(`/users/update/photos/${photo?._id}`, { imageUrl: photo?.url })
        // console.log({res})
        setAuth(prev => {
            return {
                ...prev,
                photos: prev.photos.filter(p => p._id !== photo._id),
                currentPhoto:prev.photos.find(p => p.isMain)
            }
        })
        toast.success('Deleted picture successfully', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
        setIsLoading(false)
    } catch (error) {
        toast.error('Something went wrong.!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
        setIsLoading(false)
    }
    }
  return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px'}}>
           <div style={{display:'flex',marginLeft:'30px',backgroundColor:'#222' , width:'350px',height:'250px',padding:'25px'}}>     
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column'}}>
                <button className={styles.setAsMainButton} onClick={setAsMainHandler} disabled={photo.isMain || isLoading}>Set As Main</button>
                <button className={styles.deleteButton} onClick={deletePictureHandler} disabled={isLoading}>Delete</button>
            </div>
          <img src={photo.url}  alt={photo.url} style={{width:'175px',height:'175px'}}/>
          </div>
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
     </div>
  )
}

export default Picture   