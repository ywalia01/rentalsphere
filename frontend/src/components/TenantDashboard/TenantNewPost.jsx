import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsData } from "../../Utils/sampleDataHarsh.jsx";

const TenantNewPost = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    name: "",
    description: "",
    contactNumber: "",
    address: "",
    price: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // setBase64Image(reader.result);
        setPostData({ ...postData, image: reader.result });
      };
    }
  };

  const sendNewRequest = async () => {
    try {
      // const result = await Axios.post(
      //   "http://localhost:8000/products",
      //   postData
      // );
      const result = productsData;
      console.log(result, "resultresult");

      if (result.status) {
        alert("New post published successfully!");
        navigate("/community");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="bg-white drop-shadow-md rounded-[8px] p-6">
        <h3 className="font-semibold text-[22px]">Create new post</h3>

        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="name" className="font-medium text-[16px]">
            Name
          </label>
          <input
            type="text"
            value={postData.requestSubject}
            onChange={(e) => handleInputChange(e)}
            placeholder="Name"
            name="name"
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="description" className="font-medium text-[16px]">
            Description
          </label>
          <input
            type="text"
            value={postData.requestType}
            onChange={(e) => handleInputChange(e)}
            placeholder="Description"
            name="description"
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="contactNumber" className="font-medium text-[16px]">
            Contact Number
          </label>
          <input
            type="number"
            value={postData.contactNumber}
            onChange={(e) => handleInputChange(e)}
            placeholder="Contact Number"
            name="contactNumber"
            className="input appearance-none input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="price" className="font-medium text-[16px]">
            Price
          </label>
          <input
            type="number"
            value={postData.price}
            onChange={(e) => handleInputChange(e)}
            placeholder="Price"
            name="price"
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="font-medium text-[16px]">
            Address
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={postData.address}
            onChange={(e) => handleInputChange(e)}
            name="address"
            placeholder="Address"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="font-medium text-[16px]">
            Select image
          </label>
          <input
            type="file"
            name="signature"
            onChange={(e) => handleFileChange(e)}
          />
        </div>

        <button
          onClick={() => sendNewRequest()}
          className="bg-green-700 text-white tracking-wider rounded-full  mt-6 px-10 py-2"
        >
          Publish new post
        </button>
      </div>
    </>
  );
};

export default TenantNewPost;
