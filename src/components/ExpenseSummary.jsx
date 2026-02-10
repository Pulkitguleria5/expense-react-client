function ExpenseSummary({ summary }) {
    if (!summary) {
        return (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-xl text-slate-900 mb-4">Expense Summary</h3>
                <p className="text-slate-500">No expenses yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-xl text-slate-900 mb-4">Expense Summary</h3>
            <div className="space-y-3">
                {summary.summary.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center justify-between p-2 rounded-lg" 
                        style={{ 
                            backgroundColor: item.netBalance === 0 
                                ? "#f0fdf4" 
                                : item.netBalance > 0 
                                    ? "#dbeafe" 
                                    : "#fef2f2" 
                        }}
                    >
                        <span className="text-slate-900 font-medium">
                            {item.userEmail.split("@")[0]}
                        </span>
                        <span 
                            className={`font-bold ${
                                item.netBalance === 0 
                                    ? "text-green-600" 
                                    : item.netBalance > 0 
                                        ? "text-blue-600" 
                                        : "text-red-600"
                            }`}
                        >
                            {item.netBalance === 0 
                                ? "Settled" 
                                : item.netBalance > 0 
                                    ? `+₹${item.netBalance.toFixed(2)}` 
                                    : `-₹${Math.abs(item.netBalance).toFixed(2)}`
                            }
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpenseSummary;

