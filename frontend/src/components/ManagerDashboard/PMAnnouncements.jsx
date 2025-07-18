import React, { useState } from "react";
import { sampleAnnouncements } from "../../Utils/SampleData.jsx";
import { FiEdit, FiTrash } from "react-icons/fi";

const PMAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedAnnouncements = announcements.map((announcement) =>
        announcement.id === selectedAnnouncement.id
          ? { ...announcement, title, content }
          : announcement
      );
      setAnnouncements(updatedAnnouncements);
    } else {
      handleCreateAnnouncement({ title, content });
    }
    setTitle("");
    setContent("");
    setEditMode(false);
    setSelectedAnnouncement(null);
  };

  const handleCreateAnnouncement = (newAnnouncement) => {
    const id = announcements.length + 1;
    const date = new Date().toISOString().slice(0, 10);
    const announcement = { ...newAnnouncement, id, date };
    setAnnouncements([announcement, ...announcements]);
    document.getElementById("my_modal_3").close();
  };

  const handleEditAnnouncement = (announcement) => {
    setEditMode(true);
    setSelectedAnnouncement(announcement);
    setTitle(announcement.title);
    setContent(announcement.content);
    document.getElementById("my_modal_3").showModal();
  };

  const handleDeleteAnnouncement = (announcementId) => {
    const updatedAnnouncements = announcements.filter(
      (announcement) => announcement.id !== announcementId
    );
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div>
      <div className="flex justify-between mb-10 items-center p-4">
        <h1 className="text-2xl font-bold">Property Manager Announcements</h1>
        <button
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Create Announcement
        </button>
      </div>

      <div className="divide-y divide-gray-200 p-10">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="py-4 relative">
            <h2 className="text-lg font-semibold">{announcement.title}</h2>
            <p className="text-sm text-gray-600">{announcement.content}</p>
            <p className="text-xs text-gray-400">{announcement.date}</p>
            <button
              className="absolute right-0 top-0 mr-2 mt-2 btn btn-sm btn-ghost btn-circle"
              onClick={() => handleEditAnnouncement(announcement)}
            >
              <FiEdit />
            </button>
            <button
              className="absolute right-8 top-0 mr-2 mt-2 btn btn-sm btn-ghost btn-circle text-red-500"
              onClick={() => handleDeleteAnnouncement(announcement.id)}
            >
              <FiTrash />
            </button>
          </div>
        ))}
      </div>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setTitle("");
                setContent("");
                setEditMode(false);
                setSelectedAnnouncement(null);
                document.getElementById("my_modal_3").close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">
            {editMode ? "Edit Announcement" : "Create New Announcement"}
          </h3>

          <div className="modal-action flex flex-col justify-center ">
            <form method="dialog" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input input-bordered input-primary w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-4"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  className="input input-bordered input-primary w-full h-40"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {editMode ? "Update Announcement" : "Create Announcement"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PMAnnouncements;
