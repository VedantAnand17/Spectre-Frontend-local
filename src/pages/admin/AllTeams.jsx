import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AllTeams() {
  const navigate = useNavigate();
  const { isLoggedIn, user, allTeams } = useContext(AuthContext);

  const [sortedTeams, setSortedTeams] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [expandedTeam, setExpandedTeam] = useState(null); // Track expanded rows

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (user?.role === "student") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    setSortedTeams(allTeams || []);
  }, [allTeams]);

  // Sorting function
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...sortedTeams].sort((a, b) => {
      if (key === "members") {
        return direction === "asc"
          ? a[key].length - b[key].length
          : b[key].length - a[key].length;
      }

      const aValue = a[key]?.toString().toLowerCase() || "";
      const bValue = b[key]?.toString().toLowerCase() || "";

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedTeams(sortedData);
    setSortConfig({ key, direction });
  };

  // Toggle team expansion
  const toggleTeamExpansion = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  return (
    <div className="p-4 pt-28 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">All Teams</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-700">
          <thead>
            <tr className="bg-gray-900">
              {[
                { key: "SrNo", label: "Sr. No" },
                { key: "teamToken", label: "Team Token" },
                { key: "teamName", label: "Team Name" },
                { key: "leaderName", label: "Leader Name" },
                { key: "leaderRollNo", label: "Leader Roll No" },
                { key: "leaderPhoneNo", label: "Leader Phone No" },
                { key: "members", label: "Members Count" },
                { key: "actions", label: "Actions" },
              ].map((header, index) => (
                <th
                  key={index}
                  className="p-3 text-left text-sm text-gray-200 border-b border-gray-600 cursor-pointer hover:text-gray-400"
                  onClick={() => header.key !== "actions" && sortBy(header.key)}
                >
                  {header.label}
                  {sortConfig.key === header.key && (
                    <span className="ml-2">
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTeams?.map((team, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`border-t border-gray-600 ${
                    expandedTeam === team.id ? "bg-gray-800" : "bg-gray-700"
                  }`}
                >
                  <td className="p-3 text-sm">{index + 1}</td>
                  <td className="p-3 text-sm">{team.teamToken}</td>
                  <td className="p-3 text-sm">{team.teamName}</td>
                  <td className="p-3 text-sm">{team.leaderName}</td>
                  <td className="p-3 text-sm">{team.leaderRollNo}</td>
                  <td className="p-3 text-sm">{team.leaderPhoneNo}</td>
                  <td className="p-3 text-sm">{team.members.length}</td>
                  <td className="p-3 text-sm">
                    <button
                      onClick={() => toggleTeamExpansion(team.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {expandedTeam === team.id ? "Hide Members" : "View Members"}
                    </button>
                  </td>
                </tr>
                {expandedTeam === team.id && (
                  <tr>
                    <td colSpan="7" className="p-4 bg-gray-800 text-sm">
                      <div className="grid gap-4">
                        <h3 className="text-lg font-semibold">Team Members:</h3>
                        {team.members.map((member) => (
                          <div
                            key={member.id}
                            className="p-3 bg-gray-700 rounded-md shadow-md"
                          >
                            <p>
                              <strong>Name:</strong> {member.username}
                            </p>
                            <p>
                              <strong>Email:</strong> {member.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {member.phoneNumber}
                            </p>
                            <p>
                              <strong>Roll No:</strong> {member.rollNo || "N/A"}
                            </p>
                            <p>
                              <strong>Year:</strong> {member.year || "N/A"}
                            </p>
                            <p>
                              <strong>Role:</strong> {member.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
