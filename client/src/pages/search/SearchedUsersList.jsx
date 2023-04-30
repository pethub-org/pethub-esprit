import useAuth from "../../hooks/useAuth";
import UserDetail from './UserDetail';

const SearchedUsersList = ({ searchResult}) => {
  const {auth} = useAuth();
  const result = searchResult.map(user => <UserDetail key={user._id} user={user} />)
  
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column', marginTop:'50px'}}>
        {result}
  </div>
  )
}

export default SearchedUsersList