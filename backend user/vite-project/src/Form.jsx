import React, { useState } from "react";

export const Form = ({registerUser, loginUser}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [logStatus, setLogStatus] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  console.log(formData);
  

  return (
    <div>
      <form action="" onSubmit={logStatus ?  ((e)=>registerUser(e,formData)) :((e)=>loginUser(e,formData)) }>
        {logStatus && (
          <>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </>
        )}

        <br />
        <br />
        <label htmlFor="">Email</label>
        <input type="email" name="email" onChange={handleChange} />

        <br />
        <br />
        <label htmlFor="">Password</label>
        <input type="password" name="password" onChange={handleChange} />


        <br />
        <button type="submit">
            {logStatus ? "Sign In":"Log In"}
        </button>

        {logStatus ? <p>
            have a account <a style={{cursor: "pointer"}} onClick={(()=>setLogStatus(false))}>Log in</a>
        </p> : <p>
            don't have a account <a style={{cursor: "pointer"}} onClick={(()=>setLogStatus(true))}>Sign in</a>
            </p>}
      </form>
    </div>
  );
};
