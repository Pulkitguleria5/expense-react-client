import { useState, useEffect } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

function AddExpenseModal({ show, onHide, group, onSuccess }) {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        paidBy: "",
    });
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [splitAmounts, setSplitAmounts] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (group && group.membersEmail.length > 0 && !formData.paidBy) {
            setFormData(prev => ({ ...prev, paidBy: group.membersEmail[0] }));
        }
    }, [group]);

    const handleMemberToggle = (email) => {
        if (selectedMembers.includes(email)) {
            setSelectedMembers(selectedMembers.filter(e => e !== email));
            const newSplitAmounts = { ...splitAmounts };
            delete newSplitAmounts[email];
            setSplitAmounts(newSplitAmounts);
        } else {
            setSelectedMembers([...selectedMembers, email]);
            if (!splitAmounts[email]) {
                setSplitAmounts({ ...splitAmounts, [email]: "" });
            }
        }
    };

    const handleSplitAmountChange = (email, amount) => {
        setSplitAmounts({ ...splitAmounts, [email]: amount });
        if (errors.split) {
            setErrors({ ...errors, split: null });
        }
    };

    const calculateEqualSplit = () => {
        if (!formData.amount || selectedMembers.length === 0) return;
        const amount = parseFloat(formData.amount);
        const perPerson = amount / selectedMembers.length;
        const newSplitAmounts = {};
        selectedMembers.forEach(email => {
            newSplitAmounts[email] = perPerson.toFixed(2);
        });
        setSplitAmounts(newSplitAmounts);
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }
        
        if (!formData.paidBy) {
            newErrors.paidBy = "Please select who paid";
        }
        
        if (selectedMembers.length === 0) {
            newErrors.split = "Please select at least one member to split with";
        }
        
        const totalSplit = selectedMembers.reduce((sum, email) => {
            const amount = parseFloat(splitAmounts[email] || 0);
            return sum + amount;
        }, 0);
        
        const totalAmount = parseFloat(formData.amount || 0);
        if (Math.abs(totalSplit - totalAmount) > 0.01) {
            newErrors.split = `Split amounts (${totalSplit.toFixed(2)}) must equal total amount (${totalAmount.toFixed(2)})`;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            const split = selectedMembers.map(email => ({
                userEmail: email,
                splitAmount: parseFloat(splitAmounts[email])
            }));

            await axios.post(
                `${serverEndpoint}/expenses/create`,
                {
                    groupId: group._id,
                    description: formData.description,
                    amount: parseFloat(formData.amount),
                    date: formData.date,
                    paidBy: formData.paidBy,
                    split
                },
                { withCredentials: true }
            );

            setFormData({
                description: "",
                amount: "",
                date: new Date().toISOString().split('T')[0],
                paidBy: group?.membersEmail[0] || "",
            });
            setSelectedMembers([]);
            setSplitAmounts({});
            setErrors({});
            onSuccess();
            onHide();
        } catch (error) {
            console.error("Error creating expense:", error);
            setErrors({ 
                message: error.response?.data?.message || "Failed to create expense" 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            description: "",
            amount: "",
            date: new Date().toISOString().split('T')[0],
            paidBy: group?.membersEmail[0] || "",
        });
        setSelectedMembers([]);
        setSplitAmounts({});
        setErrors({});
        onHide();
    };

    if (!show || !group) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center" 
            tabIndex="-1" 
            style={{ 
                backgroundColor: "rgba(15, 23, 42, 0.6)", 
                backdropFilter: "blur(4px)" 
            }}
        >
            <div className="w-full max-w-2xl px-4 max-h-[90vh] overflow-y-auto">
                <div className="bg-white border-0 rounded-2xl shadow-lg p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-start gap-3 pb-3 border-b border-slate-200 mb-4">
                            <div className="bg-blue-600/10 p-2 rounded-lg text-blue-600">
                                <i className="text-2xl">💰</i>
                            </div>
                            <h5 className="font-bold mb-0 flex-1 text-xl">Add New Expense</h5>
                            <button
                                type="button"
                                className="ml-auto h-6 w-6 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 focus:outline-none before:content-['×'] before:text-xl before:leading-none"
                                onClick={handleClose}
                            ></button>
                        </div>

                        {errors.message && (
                            <div className="mb-4 rounded-md border-0 bg-red-50 px-3 py-2 text-sm text-red-700">
                                {errors.message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Dinner at Restaurant"
                                    className={`w-full rounded-lg bg-slate-100 border border-transparent px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.description ? "border-red-500 focus:ring-red-500" : ""
                                    }`}
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData({ ...formData, description: e.target.value });
                                        if (errors.description) setErrors({ ...errors, description: null });
                                    }}
                                />
                                {errors.description && (
                                    <div className="mt-1 pl-1 text-sm text-red-600">{errors.description}</div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                                        Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className={`w-full rounded-lg bg-slate-100 border border-transparent px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.amount ? "border-red-500 focus:ring-red-500" : ""
                                        }`}
                                        value={formData.amount}
                                        onChange={(e) => {
                                            setFormData({ ...formData, amount: e.target.value });
                                            if (errors.amount) setErrors({ ...errors, amount: null });
                                        }}
                                    />
                                    {errors.amount && (
                                        <div className="mt-1 pl-1 text-sm text-red-600">{errors.amount}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-lg bg-slate-100 border border-transparent px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                                    Paid By
                                </label>
                                <select
                                    className={`w-full rounded-lg bg-slate-100 border border-transparent px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.paidBy ? "border-red-500 focus:ring-red-500" : ""
                                    }`}
                                    value={formData.paidBy}
                                    onChange={(e) => {
                                        setFormData({ ...formData, paidBy: e.target.value });
                                        if (errors.paidBy) setErrors({ ...errors, paidBy: null });
                                    }}
                                >
                                    {group.membersEmail.map((email) => (
                                        <option key={email} value={email}>
                                            {email}
                                        </option>
                                    ))}
                                </select>
                                {errors.paidBy && (
                                    <div className="mt-1 pl-1 text-sm text-red-600">{errors.paidBy}</div>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-xs font-bold text-slate-500 uppercase">
                                        Split Among Members
                                    </label>
                                    {selectedMembers.length > 0 && formData.amount && (
                                        <button
                                            type="button"
                                            onClick={calculateEqualSplit}
                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Split Equally
                                        </button>
                                    )}
                                </div>
                                {errors.split && (
                                    <div className="mb-2 text-sm text-red-600">{errors.split}</div>
                                )}
                                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3">
                                    {group.membersEmail.map((email) => (
                                        <div key={email} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedMembers.includes(email)}
                                                onChange={() => handleMemberToggle(email)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <label className="flex-1 text-slate-900">{email}</label>
                                            {selectedMembers.includes(email) && (
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    className="w-24 rounded-lg bg-slate-50 border border-slate-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={splitAmounts[email] || ""}
                                                    onChange={(e) => handleSplitAmountChange(email, e.target.value)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 mt-4">
                            <button
                                type="button"
                                className="rounded-full bg-white border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-full bg-blue-600 px-5 py-2 font-bold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent mr-2 align-middle"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Adding...
                                    </>
                                ) : (
                                    "Add Expense"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddExpenseModal;

