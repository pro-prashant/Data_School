
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShowSchool = () => {
  const [schools, setSchools] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // form states
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState(""); 
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const handleGetListing = async () => {
    try {
      const response = await axios.get("/api/schoolDataGet");
      if (response.data.success) {
        setSchools(response.data.rows || []);
      } else {
        setSchools([]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setSchools([]);
    }
  };

  // ✅ Delete Function 
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/deleteData/${id}`);
      if (response.data.success) {
        toast("Deleted Data")
        alert("School deleted successfully");
        handleGetListing();
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ✅ Update: load data into form
  const handleUpdate = (school) => {
    setEditingId(school.id);
    setSchoolName(school.name);
    setAddress(school.address);
    setCity(school.city);
    setStateName(school.state);
    setContact(school.contact);
    setEmail(school.email_id);
    setImage(null);
  };

  // ✅ Image handler
  const handleImageOnchange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Submit update
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", schoolName);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", stateName);
      formData.append("contact", contact);
      formData.append("email_id", email);
      if (image) formData.append("image", image);

      await axios.put(`/api/updateData/${editingId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Updated Data");
      alert("School updated successfully");
      setEditingId(null);
      handleGetListing();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  useEffect(() => {
    handleGetListing();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Schools</h2>

      {schools.length === 0 ? (
         <div className="flex items-center justify-center">
  <button
    type="button"
    className="flex items-center px-4 py-2 rounded-md bg-indigo-500 text-white disabled:opacity-70"
    disabled
  >
    <svg
      className="mr-2 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    Loading…
  </button>
</div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition p-4"
            >
              {editingId === school.id ? (
                // ✅ Update Form
                <form onSubmit={handleSubmitUpdate} className="grid gap-4">
                  <input
                    type="text"
                    placeholder="School Name"
                    className="border p-2 rounded"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="border p-2 rounded"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="border p-2 rounded"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="border p-2 rounded"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Contact"
                    className="border p-2 rounded"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input type="file" onChange={handleImageOnchange} />

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // ✅ Normal Card
                <div>
                  <img
                    src={school.image || "https://via.placeholder.com/300x200"}
                    alt={school.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">{school.name}</h3>
                  <p className="text-gray-600 text-sm">{school.address}</p>
                  <p className="text-gray-800 font-medium">{school.city}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Added on:{" "}
                    {school.created_at
                      ? new Date(school.created_at).toLocaleString()
                      : "N/A"}
                  </p>

                  <div className="flex justify-between gap-2 mt-3">
                    <button
                      onClick={() => handleUpdate(school)}
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(school.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowSchool;
