import { useParams, Link } from "react-router-dom";

function GroupExpenses() {
    // 1. Get the groupId from the URL
    const { groupId } = useParams();

    return (
        <div className="max-w-6xl mx-auto px-4 py-5">
            <nav aria-label="breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-slate-500">
                    <li className="inline-flex items-center gap-1">
                        <Link to="/dashboard">Groups</Link>
                    </li>
                    <li className="before:content-['/'] before:mr-2 text-slate-700 font-medium">
                        Expense Details
                    </li>
                </ol>
            </nav>

            <div className="bg-white p-5 rounded-2xl shadow-sm text-center border border-slate-200">
                <div className="mb-4 flex justify-center">
                    <i className="text-6xl text-blue-600 opacity-25">💼</i>
                </div>
                <h2 className="font-bold text-2xl text-slate-900">
                    Group Expense Manager
                </h2>
                <p className="text-slate-500">
                    Working with Group ID:{" "}
                    <code className="bg-slate-100 px-2 rounded">{groupId}</code>
                </p>

                <hr className="my-5 border-t border-slate-200" />

                <div className="inline-block rounded-xl bg-sky-50 border border-sky-100 px-5 py-4 text-left text-slate-800">
                    <h5 className="font-semibold mb-1">🛠️ Student Assignment</h5>
                    <p className="mb-0 text-slate-700">Implement the following here:</p>
                    <ul className="list-disc list-inside text-left mt-3 space-y-1 text-slate-700">
                        <li>
                            Fetch and display group details (Name, Members).
                        </li>
                        <li>
                            Show a list of past transactions for this group.
                        </li>
                        <li>
                            Add a form to create a new expense with title,
                            amount, and split logic.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GroupExpenses;
