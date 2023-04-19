import './Posts.scss'
import Post from '../Post/Post'
const Posts = () => {
    const posts =[
        {
            id:1,
            name: "Anis Ammar",
            userId:1,
            profilePic:"https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg",
            desc:"Bonjour ",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSHp3iN_lCGZvt9-D_O793_NEJzVlQ1Bi9WPempwBtxX-QTF06k6JJIV_1MlQmSBNIsw&usqp=CAU"
        },
        {
            id:2,
            name: "Anis Ammar",
            userId:2,
            profilePic:"https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg",
            desc:"Bonjour ",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSHp3iN_lCGZvt9-D_O793_NEJzVlQ1Bi9WPempwBtxX-QTF06k6JJIV_1MlQmSBNIsw&usqp=CAU"

        }

    ]
  return (
    <div className='posts'>
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div>
  )
}

export default Posts