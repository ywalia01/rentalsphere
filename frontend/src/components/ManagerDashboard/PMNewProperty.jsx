import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import axios from "axios";

export default function PMNewProperty() {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    propertyDescription: "",
    monthlyRent: "",
    numBathrooms: "",
    numBedrooms: "",
    propertyAddress: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    licenseNumber: "",
    phoneNumber: "",
    availableMoveInDate: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      e.target.type === "date" ? new Date(value).toISOString() : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(typeof files);
    const updatedImages = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          updatedImages.push(reader.result);
          if (updatedImages.length === files.length) {
            setFormData({ ...formData, images: updatedImages });
          }
        };
      }
    }
  };

  const handleSubmit = async () => {
    console.log("jhgjhgjhggjhgjhgg");
    // e.preventDefault();
    const localToken = window.localStorage.getItem("token");
    console.log("hereeeee", localToken);
    console.log("hhjhjhjhjhjhjhjh");
    if (auth && auth.email) {
      setFormData({ ...formData, email: auth.email });
      console.log("hgfhgfjhgfjhgfjhf");
    }

    const form = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "images") {
          for (const file of formData[key]) {
            form.append(key, file);
          }
        } else {
          form.append(key, formData[key]);
        }
      }
    }

    // const headers = {
    //   'Authorization': "Bearer " + auth.token,
    // };

    // const headers = {
    //   'Content-Type': 'multipart/form-data',
    //   'Authorization': 'Bearer ' + auth.token,
    // };

    // console.log(headers);
    // const headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data')
    // headers.append('Authorization', `'Bearer ${auth.token}` )

    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };
    console.log(JSON.stringify(config));
    const customAxios = axios.create({
      headers: {
        Authorization: "Bearer " + auth.token,
        "Content-Type": "multipart/form-data",
      },
    });
    try {
      const response = await customAxios.post(
        "http://localhost:8080/property/register",
        formData
      );

      // const response = httpPost("http://localhost:8080/property/register", form, {'Content-Type': 'multipart/form-data',
      // 'Authorization': 'Bearer ' + auth.token, });

      console.log(response);
      alert("Form submitted successfully!");
      setFormData({
        email: "",
        propertyDescription: "",
        monthlyRent: "",
        numBathrooms: "",
        numBedrooms: "",
        propertyAddress: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
        licenseNumber: "",
        phoneNumber: "",
        date: "",
        availableMoveInDate: "",
        images: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <form
      className="min-h-screen p-6 bg-gray-100 flex items-center justify-center"
      // onSubmit={handleSubmit}
    >
      {/* <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"> */}
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div className="mt-4 md:col-span-5">
              <label htmlFor="propertyDescription">Property Description</label>
              <textarea
                name="propertyDescription"
                className="h-24 border mt-1 rounded px-2 w-full bg-gray-50 resize-none pt-2"
                value={formData.propertyDescription}
                maxLength={80}
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </div>
            <div className="mt-4 md:col-span-2">
              <label htmlFor="monthlyRent">Monthly Rent</label>
              <input
                type="text"
                name="monthlyRent"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.monthlyRent}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mt-4 md:col-span-1">
              <label htmlFor="numBathrooms">No. of Bathrooms</label>
              <input
                type="text"
                name="numBathrooms"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.numBathrooms}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="mt-4 md:col-span-1">
              <label htmlFor="numBedrooms">No. of Bedrooms</label>
              <input
                type="text"
                name="numBedrooms"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.numBedrooms}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mt-4 md:col-span-3">
              <label htmlFor="propertyAddress">Address/Street</label>
              <input
                type="text"
                name="propertyAddress"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.propertyAddress}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="mt-4 md:col-span-2">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.city}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mt-4 md:col-span-2">
              <label htmlFor="country">Country/Region</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="country"
                  placeholder="Country"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  value={formData.country}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mt-4 md:col-span-2">
              <label htmlFor="state">State/Province</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="state"
                  placeholder="State"
                  type="text"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  value={formData.state}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            <div className="mt-4 md:col-span-1">
              <label htmlFor="zipCode">Zipcode</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.zipCode}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mt-4 md:col-span-3">
              <label htmlFor="LicenseNumber">Identification Number</label>
              <input
                type="text"
                name="licenseNumber"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="mt-4 md:col-span-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            {/* <div className="mt-4 md:col-span-1">
                  <label htmlFor="Date">Date</label>
                  <input
                    type="Date"
                    name="date"
                    id="zipcode"
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-36 bg-gray-50"
                    value={formData.date}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div> */}

            {/* New fields */}

            <div className="mt-4 md:col-span-2">
              <label htmlFor="availableMoveInDate">Move In Date</label>
              <input
                type="date"
                name="availableMoveInDate"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                // value={formData.availableMoveInDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="mt-4 md:col-span-5 flex flex-col">
              <label htmlFor="images" className="">
                Upload Images (up to 4)
              </label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                className="mt-4"
              />
            </div>

            {/* <div className="mt-4 md:col-span-5">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="billing_same"
                      id="billing_same"
                      className="form-checkbox"
                    />
                    <label htmlFor="billing_same" className="mt-5">
                      I accept the Terms & Conditions
                    </label>
                  </div>
                </div> */}

            {/* Display uploaded images as thumbnails */}
            <div className="md:col-span-5 mt-4">
              {formData.images.length > 0 && (
                <div className="flex flex-wrap -mx-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="w-1/4 px-2 mb-4">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-auto rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 md:col-span-5">
              <div className="inline-flex items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}

      {/* <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" className="md:absolute bottom-0 right-0 p-4 float-right">
            <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"/>
          </a> */}
    </form>
  );
}
