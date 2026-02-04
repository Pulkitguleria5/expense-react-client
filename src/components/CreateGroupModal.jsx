import axios from "axios";
import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";

function CreateGroupModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  if (!show) return null;

  const validate = () => {
    let newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Group name must be at least 3 characters";
    }

    if (formData.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(
        `${serverEndpoint}/groups/create`,
        formData,
        { withCredentials: true }
      );

      // ✅ pass created group back
      onSuccess(response.data);

      // reset + close
      setFormData({ name: "", description: "" });
      setErrors({});
      onHide();
    } catch (error) {
      setErrors({ message: "Unable to create group. Try again." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create Group</h2>
          <button
            onClick={onHide}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* API Error */}
        {errors.message && (
          <p className="text-red-500 text-sm mb-3">{errors.message}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Group Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2
                ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={onChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2
                ${
                  errors.description
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onHide}
              className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
