import "./home.scss"
import Posts from '../../components/Posts/Posts'
import Feed from '../../components/feed/feed'

const Home = () => {
  return (
    <div className="home">
      <Feed />
    <Posts />

    </div>
  )
}

export default Home