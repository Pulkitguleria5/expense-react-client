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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(3); // Number of groups per page                     

    const fetchGroups = async (page = 1) => {
        try {
            const response = await axios.get(
                `${serverEndpoint}/groups/my-groups?page=${page}&limit=${limit}`,
                { withCredentials: true }
            );
            setGroups(response?.data?.groups);
            setTotalPages(response?.data?.pagination?.totalPages);
            setCurrentPage(response?.data?.pagination?.currentPage);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGroupUpdateSuccess = (data) => {
        fetch(currentPage); // Refetch groups to get the latest data after update
    };

    useEffect(() => {
        fetchGroups(currentPage);
    }, [currentPage]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }



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

            {totalPages > 1 && (
                <>
                    <nav className="flex justify-center items-center mt-6">
                        <button
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((num, index) => (         // it gives a array of length totalPages with no values, so we can use index to get the page number   
                            <button
                                key={index + 1}
                                className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-300 text-white hover:bg-blue-700'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )

                        )}
                        <button
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </nav>


                    <footer className="flex justify-center items-center mt-4">
                        <select
                            className="ml-4 px-3 py-1 rounded-md border border-gray-300"
                            value={limit}
                            onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </footer>
                </>


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
