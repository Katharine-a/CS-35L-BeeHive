import {useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";
export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);
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
