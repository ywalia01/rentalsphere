import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import { sampleTenantAnnouncements } from "../../Utils/SampleData.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../../assets/LoadingSpinner.jsx";
const ANNOUNCEMENTS_URL =
  "http://172.17.3.125:8080/api/v1/violationlog/tenant/";

const TenantViolations = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [violations, setViolations] = useState([]);

  const fetchAllViolations = async () => {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    setIsLoading(true);
    const url = `${ANNOUNCEMENTS_URL}${auth.email}`;
    await axios
      .get(url, { headers })
      .then((res) => {
        console.log(res);
        console.log("all announcements for tenant: ", res.data);
        setViolations(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchAllViolations();
  }, [auth, navigate]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[22px]">Violations</h1>
      </div>

      {isLoading ? (
        <div className="loadingCont flex text-center justify-items-center h-screen w-full">
          <LoadingSpinner />
        </div>
      ) : violations && violations.length !== 0 ? (
        violations.map((data, index) => (
          // <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
          // <input type="checkbox" />
          // <div className="collapse-title text-[16px] font-semibold">
          //     Click me to show/hide content
          // </div>
          // <div className="collapse-content bg-white">
          //     <p className='text-[16px] mt-4'>hello</p>
          // </div>
          // </div>
          <div
            className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]"
            key={index}
          >
            <input type="checkbox" />
            <div className="collapse-title text-[16px] font-semibold">
              <div className="flex justify-between items-center">
                <p className="text-[20px]">{data.title}</p>
                <div className="bg-white rounded-full px-8 py-2">
                  {data.date.slice(0, 10)}
                </div>
              </div>
            </div>
            <div className="collapse-content  bg-white">
              <div className="flex justify-between items-center mt-4">
                <p className="text-[20px]">{data.description}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-[20px]">Monetary Damage: {data.intensity}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-[20px]">
                  Monetary: Damage: {data.monetaryDamage}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="collapse bg-gray-200 my-4 drop-shadow-lg rounded-[8px]">
          <div className="flex justify-between items-center p-4">
            <p className="text-[20px]">No Violations at the moment</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TenantViolations;
