import useAuth from "../../hooks/useAuth";
import UserDetail from './UserDetail';

const SearchedUsersList = ({ searchResult ,setSearchResult}) => {
  const {auth} = useAuth();
  const result = searchResult.map(user => {
    // const foundFriend = auth.friendList.find((friend) => friend._id === user._id)
    // const foundFriendRequest = auth.friendRequests.find((friend) => friend._id === user._id)

    // if (foundFriend) {
    // return <UserDetail key={user._id} user={user} setSearchResult={setSearchResult}/>
    // }

    // if (foundFriendRequest) { 
    // return <UserDetail key={user._id} user={user} setSearchResult={setSearchResult}/>
    // }

    return <UserDetail key={user._id} user={user} setSearchResult={setSearchResult}/>

  })
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column', marginTop:'50px'}}>
        {result}
  </div>
  )
}

export default SearchedUsersList