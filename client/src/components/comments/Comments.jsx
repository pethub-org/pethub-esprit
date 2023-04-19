import { useContext } from 'react'
import './comments.scss'
const Comments = () => {
  
    //static
    const comments = [
        {
            id:1,
            desc: "mahbowl",
            name:"Anis Ammar",
            userId:1,
            profilePicture:"https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
        },
        {
            id:2,
            desc: "mahbowl",
            name:"Anis Ammar",
            userId:2,
            profilePicture:"https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
        },
    ]
  return (
    <div className='comments'>
        <div className="write">
            <img src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
 alt="" />
            <input type="text" placeholder='write a comment' />
            <button>Send</button>
        </div>
        {comments.map(comment=>(
            <div className="comment">
                <img src={comment.profilePicture} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>1 hour ago</span>
            </div>
        ))}
    </div>
  )
}

export default Comments