import axios from "axios";
import { useEffect, useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        `${serverEndpoint}/groups/my-groups`,
        { withCredentials: true }
      );
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Groups</h2>
          <p className="text-gray-500 text-sm">
            Manage your shared expenses
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          Create Group
        </button>
      </div>

      {/* Empty State */}
      {groups.length === 0 && (
        <p className="text-gray-500">No groups found. Create one!</p>
      )}

      {/* Grid */}
      {groups.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <GroupCard key={group._id} group={group} />
          ))}
        </div>
      )}

      <CreateGroupModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={fetchGroups}
      />
    </div>
  );
}

export default Groups;
                