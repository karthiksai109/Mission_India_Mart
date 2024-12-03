const API_URL = "http://localhost:3000";

export const setBudget = async (userId, token, budget) => {
    const response = await fetch(`${API_URL}/user/${userId}/budget`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ budget })
    });
    return response.json();
};

export const getBudget = async (userId, token) => {
    const response = await fetch(`${API_URL}/user/${userId}/budget`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
};

export const validateCartBudget = async (userId, token) => {
    const response = await fetch(`${API_URL}/user/${userId}/cart/check-budget`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
};
