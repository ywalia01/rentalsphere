import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import NewRequest from '../components/new-request/NewRequest';
import Axios from "axios";
import { FiTool } from "react-icons/fi";

function TenantOverview() {
  const navigate = useNavigate();

  const [requestsData, setRequestsData] = useState();
  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: "d6e3",
      announcementMessage: "New announcements 1",
      announcementdate: "18/02/2024",
    },
    {
      id: "d6e4",
      announcementMessage: "New announcements 2",
      announcementdate: "06/02/2024",
    },
    {
      id: "d6e6",
      announcementMessage: "New announcements 3",
      announcementdate: "10/01/2024",
    },
    {
      id: "d6e7",
      announcementMessage: "New announcements 4",
      announcementdate: "10/01/2024",
    },
  ]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const result = await Axios.get("http://localhost:8000/request");
    setRequestsData(result.data);
  };

  const loadAnnouncements = async () => {
    const result = await Axios.get("http://localhost:8000/announcements");
    setAnnouncementsData(result.data);
  };

  console.log(requestsData, "requestsData");

  return (
    <div>
      <h1 className="font-bold text-[20px]">Dashboard</h1>

      <div className="my-8 border-l-4 border-green-700 w-11/12 py-11 flex justify-between items-center bg-white drop-shadow rounded-[8px] p-6">
        <div>
          <h3 className="font-medium text-[26px]">Your Current Balance</h3>
          <h3 className="font-extrabold text-[26px]">$ 0.00</h3>
        </div>

        <div>
          <button className="bg-green-700 text-white tracking-wider rounded-full px-10 py-4">
            Make payment
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-6">
        <div className="w-[50%] h-[300px] overflow-auto bg-white drop-shadow rounded-[8px] p-6 flex flex-col justify-between">
          <div className="">
            <h3 className="font-semibold text-[18px]">Open request</h3>
            {requestsData &&
              requestsData.map((data) => (
                <div className="mt-6 flex items-center gap-4">
                  <div className="border-2 border-green-700 bg-green-100 text-green-700 text-[22px] p-3 rounded-[8px]">
                    <FiTool />
                  </div>
                  <div>
                    <h6 className="text-[16px] font-semibold">
                      {data.requestSubject}
                    </h6>
                    <p className="text-[12px] font-medium text-gray-500">
                      {data.requestType}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={() => navigate("/tenantdashboard/requests/new-request")}
            className="bg-green-700 text-white mt-6 tracking-wider rounded-full px-10 py-2 self-start"
          >
            Create request
          </button>
        </div>

        <div className="w-[50%] h-[300px] overflow-auto bg-white drop-shadow rounded-[8px] p-6">
          <div className="">
            <h3 className="font-semibold text-[18px]">New Announcements</h3>
            {announcementsData &&
              announcementsData.map((data) => (
                <div className="mt-6 flex items-center gap-4">
                  <div className="border-2 border-green-700 bg-green-100 text-green-700 text-[22px] p-3 rounded-[8px]">
                    <FiTool />
                  </div>
                  <div>
                    <h6 className="text-[16px] font-semibold">
                      {data.announcementMessage}
                    </h6>
                    <p className="text-[12px] font-medium text-gray-500">
                      {data.announcementdate}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantOverview;
