import React, { useState } from "react";
import { sampleTenantReqs } from "../../Utils/SampleData.jsx";

const PMTenantRequests = () => {
  // State for managing tenant approval requests
  const [requests, setRequests] = useState(sampleTenantReqs);
  // State for managing selected request details
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Function to handle click on request item
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    document.getElementById("my_modal_3").showModal();
    // setShowDialog(true);
  };

  // Function to handle approval action (can be modified to perform actual approval)
  const handleApprove = (request) => {
    console.log("Approving request:", request);
  };

  // Function to handle denial action (can be modified to perform actual denial)
  const handleDeny = (request) => {
    console.log("Denying request:", request);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-10">
        Property Manager Tenant Requests
      </h1>
      {/* Tenant approval requests list */}
      <div className="divide-y divide-gray-200">
        {requests.map((request) => (
          <div
            key={request.id}
            className="py-4 flex justify-between items-center"
          >
            <div onClick={() => handleRequestClick(request)}>
              <h2 className="text-lg font-semibold cursor-pointer">
                {request.name}
              </h2>
              <p className="text-sm text-gray-600">{request.details}</p>
            </div>
            {/* Approve and Deny buttons */}
            <div className="flex space-x-4">
              <button
                className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleApprove(request)}
              >
                Approve
              </button>
              <button
                className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeny(request)}
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Dialog for displaying request details */}
      {/* {showDialog && ( */}
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              // onClick={() => setShowDialog(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Request Details</h3>
          <div className="p-4">
            <h2 className="text-lg font-semibold">
              {selectedRequest && selectedRequest.name}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedRequest && selectedRequest.details}
            </p>
          </div>
        </div>
      </dialog>
      {/* )} */}
    </div>
  );
};

export default PMTenantRequests;
