// utils/riskCalculator.js
const severityMap = {
    "Email & Password": 10,
    "Username & Password": 10,
    "Phone Number & Address": 20,
    "Financial Data (Credit Card Info)": 30,
    "Medical Records": 30,
    "Social Security Number": 40,
    "Authentication Tokens": 25,
    "Biometric Data": 40,
    "Browsing History": 10,
};

export function calculateEmailRiskScore(breaches = []) {
    let score = 0;
    const now = new Date();

    for (const breach of breaches) {
        const severity = severityMap[breach.type] || 10;
        const daysOld = (now - new Date(breach.date)) / (1000 * 60 * 60 * 24);
        const recencyMultiplier = daysOld < 180 ? 1.5 : daysOld < 365 ? 1.2 : 1;

        score += severity * recencyMultiplier;
    }

    return Math.min(100, Math.round(score));
}
