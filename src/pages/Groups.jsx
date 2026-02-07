import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";
import { usePermissions } from "../rbac/userPermissions";

function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
        const permissions = usePermissions();                                 

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

    const handleGroupUpdateSuccess = (data) => {
        setGroups((prevGroups) => {
            const exists = prevGroups.some((group) => group._id === data._id);
            if (exists) {
                return prevGroups.map((group) =>
                    group._id === data._id ? data : group
                );
            } else {
                return [data, ...prevGroups];
            }
        });
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    if (loading) {
        return (
            <div
                className="max-w-6xl mx-auto px-4 py-5 flex flex-col items-center justify-center"
                style={{ minHeight: "60vh" }}
            >
                <div
                    className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-3 text-slate-500 font-medium">
                    Syncing your circles...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-5 px-4 md:px-5">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
                <div className="w-full md:w-2/3 text-center md:text-left mb-3 md:mb-0">
                    <h2 className="font-bold text-slate-900 text-4xl">
                        Manage <span className="text-blue-600">Groups</span>
                    </h2>
                    <p className="text-slate-500 mb-0">
                        View balances, invite friends, and settle shared
                        expenses in one click.
                    </p>
                </div>
                {permissions.canCreateGroups && (
                <div className="w-full md:w-1/3 text-center md:text-right">
                    <button
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 font-bold text-white shadow-sm hover:bg-blue-700"
                        onClick={() => setShow(true)}
                    >
                        <i className="mr-2 text-lg font-bold">+</i>
                        New Group
                    </button>
                </div>
                )}
            </div>

            <hr className="mb-5 border-t border-slate-200 opacity-50" />

            {groups.length === 0 && (
                <div className="text-center py-5 bg-slate-100 rounded-[1.5rem] border border-dashed border-blue-600/25 shadow-inner">
                    <div className="bg-white rounded-full inline-flex p-4 mb-4 shadow-sm">
                        <i
                            className="text-blue-600"
                            style={{ fontSize: "3rem" }}
                        >
                            👥
                        </i>
                    </div>
                    <h4 className="font-bold text-slate-900">No Groups Found</h4>
                    <p
                        className="text-slate-500 mx-auto mb-4"
                        style={{ maxWidth: "400px" }}
                    >
                        You haven't joined any groups yet. Create a group to
                        start splitting bills with your friends or roommates!
                    </p>
                    <button
                        className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-600 px-4 py-2 font-medium hover:bg-blue-50"
                        onClick={() => setShow(true)}
                    >
                        Get Started
                    </button>
                </div>
            )}

            {groups.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate__animated animate__fadeIn">
                    {groups.map((group) => (
                        <div className="w-full" key={group._id}>
                            <GroupCard
                                group={group}
                                onUpdate={handleGroupUpdateSuccess}
                            />
                        </div>
                    ))}
                </div>
            )}

            <CreateGroupModal
                show={show}
                onHide={() => setShow(false)}
                onSuccess={handleGroupUpdateSuccess}
            />
        </div>
    );
}

export default Groups;
