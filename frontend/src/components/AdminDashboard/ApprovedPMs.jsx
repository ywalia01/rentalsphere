import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { propManagersData } from "../../Utils/sampleDataHarsh.jsx";
import useAppContext from "../../hooks/useAppContext.jsx";

const PropertyMangers = () => {
  const navigate = useNavigate();
  const [PMData, SetPMData] = useState([]);
  const { allPMReqs, setAllPMReqs } = useAppContext();
  const [approvedPMs, setApprovedPMs] = useState([]);

  useEffect(() => {
    const filteredPropertyManagers = propManagersData.filter(
      (pm) => pm.verified === true
    );
    console.log(filteredPropertyManagers, "filteredPropertyManagers");
    SetPMData(filteredPropertyManagers);
  }, []);

  useEffect(() => {
    const filteredPropertyManagers = allPMReqs.filter(
      (pm) => pm.verified === true
    );
    console.log(filteredPropertyManagers, "filteredPropertyManagers");
    setApprovedPMs(filteredPropertyManagers);
  }, [allPMReqs]);

  useEffect(() => {
    const fetchApprovedPMs = () => {
      const fetchApprovedPMs = async () => {
        try {
          const response = await axios.get(ALL_PMREQS_URL);
          if (response) {
            console.log("All PM Requests API Response: ", response.data);
            setAllPMReqs(response.data.propertyManagerRequest);
            // setIsLoading(false);
            // if (response.data.length === 0) {
            //   setIsLoading(false);
            // } else {
            //   setData(response.data[0]);
            // }
          }
        } catch (err) {
          console.log(err.response);
        }
      };
      // setIsLoading(true);
      fetchApprovedPMs();
    };
    fetchApprovedPMs();
  }, [navigate]);

  return (
    <>
      <div className="container py-6 flex justify-between items-center">
        <p className="text-2xl font-bold mb-4">AdminDashboard</p>
        <div
          className="bg-slate-500 text-white py-2 px-4 cursor-pointer text-md "
          onClick={() => navigate("/admin")}
        >
          View All Requests
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-4 mt-10">
          Listed Property Manager
        </h1>
        <table className="table mt-10">
          <thead>
            <tr>
              {/* <th className="px-4 py-2">ID</th> */}
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">ID Number</th>
            </tr>
          </thead>
          <tbody>
            {PMData?.map((user) => (
              <tr key={user.id}>
                {/* <td className="border px-4 py-2">{user.id}</td> */}
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2">{user.date}</td>
                <td className="border px-4 py-2">{user.licenseNo}</td>
                {/* <td className="border px-4 py-2">
                  <img
                    className="w-[150px] h-[100px]"
                    src={user?.signature}
                    alt=""
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PropertyMangers;
