import {
  openServiceRequestsData,
  outstandingBalancesData,
  tenantApprovalsData,
} from "../../Utils/SampleData.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function PMOverview() {
  const navigate = useNavigate();
  // Calculate total outstanding balance
  const totalBalance = outstandingBalancesData.reduce(
    (acc, curr) => acc + curr.balance,
    0
  );
  return (
    <div>
      <div className="flex justify-end mb-10">
        <button
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/managerdashboard/newproperty");
          }}
        >
          New Property Listing
        </button>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 grid-auto-rows-auto">
        {/* Outstanding Balances Card Element */}
        <div className="bg-white p-4 shadow rounded-lg mb-4 h-min">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Outstanding Balances</h3>
            {/* <button className="text-blue-600 hover:underline">View</button> */}
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to={"/managerdashboard/rentmanagement"}
            >
              View
            </Link>
          </div>
          <p className="mb-4">Total Outstanding Balance: ${totalBalance}</p>
          <ul>
            {outstandingBalancesData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{`${item.name} - ${item.unit}`}</span>
                <span>${item.balance}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outstanding Balances Card Element */}
        <div className="bg-white p-4 shadow rounded-lg mb-4 h-min">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Outstanding Balances</h3>
            <button className="text-blue-600 hover:underline">View</button>
          </div>
          <p className="mb-4">Total Outstanding Balance: ${totalBalance}</p>
          <ul>
            {outstandingBalancesData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{`${item.name} - ${item.unit}`}</span>
                <span>${item.balance}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Tenant Requests Card Element */}
        <div className="bg-white p-4 shadow rounded-lg mb-4 h-1/3 scroll-smooth overflow-scroll">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tenant Approval</h3>
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to={"/managerdashboard/tenantapprovals"}
            >
              View
            </Link>
          </div>
          <ul>
            {tenantApprovalsData.map((request, index) => (
              <li key={index} className="border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{request.tenantName}</h4>
                    <p className="text-gray-600">{request.email}</p>
                  </div>
                  <span className="text-gray-600">{request.date}</span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Unit:</span> {request.unit}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Move-in Date:</span>{" "}
                    {request.moveInDate}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Duration:</span>{" "}
                    {request.duration}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">
                      Reason for Application:
                    </span>{" "}
                    {request.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Open Service Requests Card Element */}
        <div className="bg-white p-4 shadow rounded-lg h-1/3 scroll-smooth overflow-scroll">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Open Service Requests</h3>
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to={"/managerdashboard/servicerequests"}
            >
              View
            </Link>
          </div>

          {openServiceRequestsData.map((request) => (
            <div
              key={request.id}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <h4 className="font-semibold">{request.serviceTitle}</h4>
              <p className="text-gray-600">
                <span className="font-semibold">Tenant:</span>{" "}
                {request.tenant.name} - {request.tenant.unit}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Description:</span>{" "}
                {request.serviceDescription}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span> {request.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
