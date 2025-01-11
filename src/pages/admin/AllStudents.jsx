import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AllStudents() {
  const navigate = useNavigate();
  const { isLoggedIn, user, allUser } = useContext(AuthContext);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user?.role === "student") {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    setSortedUsers(allUser || []);
  }, [allUser]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...sortedUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortedUsers(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-4 pt-28 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">All Students</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-700">
          <thead>
            <tr className="bg-gray-900">
              {[
                "ID",
                "Username",
                "College Name",
                "Email",
                "Phone Number",
                "Roll No",
                "Year",
                "Position",
                "Team Name",
                "Verified",
              ].map((header, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(header.toLowerCase().replace(/ /g, ""))}
                  className="p-3 text-left text-sm cursor-pointer hover:text-red-500"
                >
                  {header}{" "}
                  {sortConfig.key === header.toLowerCase().replace(/ /g, "") &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={index}
                className={`border-t border-gray-600 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                }`}
              >
                <td className="p-3 text-sm">{user.id}</td>
                <td className="p-3 text-sm">{user.username}</td>
                <td className="p-3 text-sm">{user.collegeName || "N/A"}</td>
                <td className="p-3 text-sm">{user.email}</td>
                <td className="p-3 text-sm">{user.phoneNumber}</td>
                <td className="p-3 text-sm">{user.rollNo || "N/A"}</td>
                <td className="p-3 text-sm">{user.year || "N/A"}</td>
                <td className="p-3 text-sm">{user.position || "N/A"}</td>
                <td className="p-3 text-sm">{user.teamName || "N/A"}</td>
                <td className="p-3 text-sm">{user.verified ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
