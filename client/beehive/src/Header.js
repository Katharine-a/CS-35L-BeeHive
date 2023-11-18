import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      // method: 'GET', //added, dont know if bad
      credentials: 'include',
    }).then(Response => {
      Response.json().then(userInfo => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout() {
    //want to invalidate the cookie
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUsername(null);
  }

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
