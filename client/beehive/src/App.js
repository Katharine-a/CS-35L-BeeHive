
import './App.css';
//import Post from "./Post";
//import Header from "./Header";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage';
import {Routes, Route} from "react-router-dom";
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage/> }/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/create" element={<CreatePost />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
