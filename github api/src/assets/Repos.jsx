import React, { useState } from "react";

export const Repos = ({ repos }) => {
  //   console.log(repos);

  const [search, setSearch] = useState("");
  const [langs, setLangs] = useState("All");

  const language = [
    ...new Set(
      repos.map((item) => item.language).filter((lang) => lang != null),
    ),
  ];

//   console.log(language);

  const filterData = repos.filter((item) => {
    const searchData = item.name.toLowerCase().includes(search.toLowerCase());
    const dropLang = langs === "All" || item.language === langs;

    return searchData && dropLang;
  });



  

  return (
    <div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <br />
      <br />
      <br />
      <br />

      <select name="" id="" onChange={(e) => setLangs(e.target.value)}>
            <option defaultChecked value="All">All</option>
        {language.map((l) => (
          <>
            <option value={l}>{l}</option>
          </>
        ))}
      </select>

      <div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <td>Repository Name</td>
              <td>Description</td>
              <td>Language</td>
              <td>Stars ⭐</td>
              <td>Forks </td>
              <td>Created Date</td>
              <td>Updated At</td>
            </tr>
          </thead>

          <tbody>
            {filterData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td style={{ width: "20%" }}>
                  {item.description ? item.description : "Not specified"}
                </td>
                <td>{item.stargazers_count}</td>
                <td>{item.language}</td>
                <td>{item.forks_count}</td>
                <td>
                  {new Date(item.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {new Date(item.updated_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    // weekday:"short",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
