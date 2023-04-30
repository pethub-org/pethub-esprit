import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useSearchParams } from 'react-router-dom'
import SearchedUsersList from './SearchedUsersList';
import useAuth from '../../hooks/useAuth';
// import { axiosPrivate } from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  const [searchResult, setSearchResult] = useState([]);

  let name = searchParams.get('name')

  useEffect(() => {
      console.log({auth})
      // axios.get('http://localhost:8080/users/search/' + name, { headers: { Authorization: `Bearer ${auth.token}` } }).then(response => {
      //   setSearchResult(response.data);
      // })
    axiosPrivate.get('/users/search/' + name).then((response) => {
        setSearchResult(response.data);
    })
    }, [name,auth.token])
  
  
  if (!name) {
    return <div style={{color:'white'}}>Name can not be empty</div>
  }

  if (searchResult.length < 1) {
    return <h4 style={{color:'white'}}>No Results found !</h4>
  }

  return (
    <div style={{ color: 'white' }}>
      <SearchedUsersList searchResult={searchResult} setSearchResult={setSearchResult}/>
    </div>
  )
}

export default SearchPage;