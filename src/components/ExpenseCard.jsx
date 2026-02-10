function ExpenseCard({ expense }) {
    return (
        <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-slate-900">{expense.description}</h4>
                    <p className="text-sm text-slate-500">
                        Paid by {expense.paidBy.split("@")[0]} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg text-slate-900">₹{expense.amount.toFixed(2)}</p>
                    {expense.settled && (
                        <span className="text-xs text-green-600">Settled</span>
                    )}
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2">Split among:</p>
                <div className="flex flex-wrap gap-2">
                    {expense.split.map((splitItem, idx) => (
                        <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {splitItem.userEmail.split("@")[0]}: ₹{splitItem.splitAmount.toFixed(2)}
                        </span>
                    ))}
                </div>
                {expense.excludedMembers && expense.excludedMembers.length > 0 && (
                    <p className="text-xs text-slate-400 mt-2">
                        Excluded: {expense.excludedMembers.join(", ")}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ExpenseCard;

