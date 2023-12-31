import {Link} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      // method: 'GET', //added, dont know if bad
      credentials: 'include',
    }).then(Response => {
      Response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    //want to invalidate the cookie
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
//<a onClick={logout}>Logout ({username})</a>
    return(
    <header>
    <Link to="/" className="logo">BeeHive</Link>
    <nav>
      {username && (
        <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Logout</a>
        </> 
      )} 
      {!username && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
 );
}
//kat made this comment to test commits
