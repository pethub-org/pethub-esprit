import React from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth';

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
        console.log({res})
        setAuth(prev => {
            return {
                ...prev,
                photos:prev.photos.filter(p => p._id !== photo._id)
            }
        })
    }
  return (
      <div>
          <button onClick={setAsMainHandler}>set as main</button>
          <button onClick={deletePictureHandler}>delete</button>
          <img src={photo.url}  alt={photo.url} style={{width:'150px',height:'150px'}}/>
    </div>
  )
}

export default Picture   