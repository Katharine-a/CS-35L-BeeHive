import {Link} from "react-router-dom"
//import { UserContext } from "./UserContext";

export default function Header(){
  //const {setUserInfo} = UserContext(UserContext);
  //const username = userInfo?.username;

  return(
    <header>
    <Link to="/" className="logo">BeeHive</Link>
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  </header>
 );
}