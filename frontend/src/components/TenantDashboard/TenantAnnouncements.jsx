import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantAnnouncements = () => {
  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: "d6e3",
      announcementMessage: "New announcements 1",
      announcementdate: "18/02/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
    {
      id: "d6e4",
      announcementMessage: "New announcements 2",
      announcementdate: "06/02/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
    {
      id: "d6e6",
      announcementMessage: "New announcements 3",
      announcementdate: "10/01/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
    {
      id: "d6e7",
      announcementMessage: "New announcements 4",
      announcementdate: "10/01/2024",
      announcementDetails:"announcementDetailsannouncementDetails"
    },
  ]);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[22px]">Announcements</h1>
      </div>

      {announcementsData &&
        announcementsData.map((data, index) => (
          <>
            {/* <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
            <input type="checkbox" /> 
            <div className="collapse-title text-[16px] font-semibold">
                Click me to show/hide content
            </div>
            <div className="collapse-content bg-white"> 
                <p className='text-[16px] mt-4'>hello</p>
            </div>
        </div> */}

              <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
              <input type="checkbox" />
              <div className="collapse-title text-[16px] font-semibold">
                <div className="flex justify-between items-center">
                  <p className="text-[20px]">{data.announcementMessage}</p>
                  <div className="bg-white rounded-full px-8 py-2">
                    {data.announcementdate}
                  </div>
                </div>
              </div>
              <div className="collapse-content  bg-white">
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[20px]">{data.announcementDetails}</p>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  );
};

export default TenantAnnouncements;
