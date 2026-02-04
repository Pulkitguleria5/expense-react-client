import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

export default function GroupCard({ group, onUpdate }) {
  const [showMembers, setShowMembers] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleShowMembers = () => {
    setShowMembers((prev) => !prev);
  };

  const handleAddMember = async () => {
    if (!memberEmail.trim()) {
      setErrors({ message: "Email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(memberEmail)) {
      setErrors({ message: "Enter a valid email" });
      return;
    }

    try {
      const response = await axios.patch(
        `${serverEndpoint}/groups/members/add`,
        {
          groupId: group._id,
          emails: [memberEmail],
        },
        { withCredentials: true }
      );

      // ✅ update parent state correctly
      onUpdate(response.data);

      setMemberEmail("");
      setErrors({});
    } catch (error) {
      setErrors({ message: "Unable to add member" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 relative">
      <div className="p-4">
        <h5 className="text-lg font-semibold">{group.name}</h5>

        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={handleShowMembers}
        >
          {showMembers ? "Hide Members" : "Show Members"}
        </button>
      </div>

      <p className="text-gray-600 mt-2 text-sm">
        {group.description}
      </p>

      {showMembers && (
        <div className="mt-4 border rounded-lg p-3 bg-gray-50">
          <h6 className="font-medium mb-2">Members:</h6>
          {group.members.map((member, index) => (
            <div key={index} className="text-sm text-gray-700">
              {index + 1}. {member}
            </div>
          ))}
        </div>
      )}

      {/* Add Member */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          Add Member
        </label>

        <div className="flex gap-2">
          <input
            type="email"
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            placeholder="Member Email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          
          <button
            type="button"
            onClick={handleAddMember}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {errors.message && (
          <p className="text-red-500 text-xs mt-1">
            {errors.message}
          </p>
        )}
      </div>
    </div>
  );
}
