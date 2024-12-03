import React, { useState } from "react";

const BudgetTool = ({ token }) => {
    const [budget, setBudget] = useState("");
    const [items, setItems] = useState("");
    const [result, setResult] = useState(null);

    const handleCheckBudget = async () => {
        try {
            const response = await fetch("http://localhost:3000/budget-check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    budget: parseFloat(budget),
                    items: items.split(",").map(item => item.trim())
                })
            });
            const data = await response.json();

            if (data.missingItems && data.missingItems.length > 0) {
                alert(`We don't sell these items: ${data.missingItems.join(", ")}`);
            }

            setResult(data);
        } catch (error) {
            console.error("Error checking budget:", error);
        }
    };

    return (
        <div>
            <h2>Budget Planning Tool</h2>
            <div>
                <label>Enter Budget: </label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter your budget"
                />
            </div>
            <div>
                <label>Enter Items (comma-separated): </label>
                <textarea
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    placeholder="e.g., Apple, Banana, Milk"
                />
            </div>
            <button onClick={handleCheckBudget}>Check Budget</button>
            {result && (
                <div>
                    <h3>Budget Summary</h3>
                    <p>Total Budget: ${result.budget}</p>
                    <p>Total Cost: ${result.totalCost}</p>
                    <p>
                        {result.withinBudget
                            ? "The items fit within your budget."
                            : "The items exceed your budget."}
                    </p>
                    {result.availableItems && result.availableItems.length > 0 && (
                        <div>
                            <h4>Available Items:</h4>
                            <ul>
                                {result.availableItems.map((item, index) => (
                                    <li key={index}>{item.name} - ${item.price}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BudgetTool;
