import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TenantCommunity = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const result = await Axios.get("http://localhost:8000/products");
    setProductsData(result.data);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[22px]">Community</h1>
        <button
          onClick={() => navigate("/tenantdashboard/community/new-post")}
          className="bg-green-700 text-white tracking-wider rounded-full px-10 py-2 self-start"
        >
          Add post
        </button>
      </div>

      {productsData?.length === 0 ? (
        <div>No Data Found</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {productsData &&
            productsData.map((data, index) => (
              <>
                <div className="w-[25%] mt-6 card card-compact bg-base-100 shadow-xl">
                  <figure>
                    <img
                      className="h-[200px] w-full object-cover "
                      src={data?.image}
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{data.name}</h2>
                    <p>{data.description}</p>
                    <div className="flex justify-between items-center card-actions">
                      <h2 className="font-bold text-[22px]">$ {data?.price}</h2>
                      <button
                        onClick={() => sendNewRequest()}
                        className="bg-green-700 text-white tracking-wider rounded-full px-10 py-2"
                      >
                        Enquiry now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      )}
    </>
  );
};

export default TenantCommunity;
