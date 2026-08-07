import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export const App = () => {
  const URLL = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(URLL);
      // console.log(response);

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filterData = users.filter((user) => {
    const searchUserByName = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const searchUserByEmail = user.email
      .toLowerCase()
      .includes(search.toLowerCase());

    const searchData = searchUserByName || searchUserByEmail;

    return searchData;
  });

  const finalData = [
    ...filterData.sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company.name,
      website: user.website,
    });

    setEditId(user.id)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if(editId){

        const responses = await axios.patch(URLL+`/${editId}`, formData)
        console.log(responses)
         setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          website: "",
        });

        setEditId(null)
      }
      else{
        
      const response = await axios.post(URLL, formData);

      console.log(response);

      if (response.status === 201) {
        // fetchUser();
         setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          website: "",
        });
      }

       
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(URLL + `/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <br />
      <br />
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">name</label>
        <input
          type="text"
          name="name"
          id=""
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">email</label>
        <input
          type="email"
          name="email"
          id=""
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">phone</label>
        <input
          type="tel"
          name="phone"
          id=""
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">company</label>
        <input
          type="text"
          name="company"
          id=""
          value={formData.company}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">website</label>
        <input
          type="text"
          name="website"
          id=""
          value={formData.website}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">{editId ? "Update" : "Add"}</button>

        <br />
        <br />
      </form>

      <div className="users">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Company</td>
              <td>Website</td>
            </tr>
          </thead>
          <tbody>
            {finalData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                  <td>{user.website}</td>
                  <td>
                  <div>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </div>
                  </td>
                  <td>
                  <div>
                    <button onClick={() => handleEdit(user)}>Update</button>
                  </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
