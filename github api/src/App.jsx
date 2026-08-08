import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Repos } from "./assets/Repos";
export const App = () => {
  const [user, setUser] = useState();
  const [repos, setRepos] = useState([])
  const [userName, setUserName] = useState("Abhisssek");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${userName}`,
      );

      // console.log(response);

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchRepos = async()=>{
    try {
      const response = await axios.get(`https://api.github.com/users/${userName}/repos`)

      // console.log(response);
      setRepos(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(()=>{
    fetchUser()
    fetchRepos()
  },[userName])

  console.log(user);

  return (
    <div>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={fetchUser}>search</button>
      </div>

      {user ? (
        <div>
          <div>
            <img src={user.avatar_url} alt="" />
          </div>
          <div>{user.name}</div>
          <div>Username- {user.login}</div>
          <div>Bio- {user.bio}</div>
          <div>following- {user.following}</div>
          <div>followers- {user.followers}</div>
          <div>company- {user?.company ? user.company : "Not specified"}</div>
          <div>email- {user.email ? user.email : "Not Specified"}</div>
          <div>
            public Repositories- 
            <a
              href={user.html_url + "?tab=repositories"}
              target="_blank"
              rel="noreferrer"
            >
              See Repositories
            </a>
          </div>



          <div>
            <Repos repos={repos}/>
          </div>




        </div>






      ) : (
        <>No user found search to get one</>
      )}
    </div>
  );
};
