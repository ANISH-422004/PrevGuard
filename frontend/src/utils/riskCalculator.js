// utils/riskMapper.js

/**
 * Builds a risk report for each shared app by matching it against breach data,
 * including a 'degree' parameter representing a risk level (0-100) for UI.
 *
 * @param {Array} sharedApps
 * Array of objects like:
 * { ... }
 * @param {Array} breaches
 * Array of objects from the breach API, each with:
 * { ... }
 * @returns {Array} riskReport
 * Each element:
 * {
 * appId: "abc123",
 * appName: "Twitter",
 * matchedBreach: { … } or null,
 * riskScore: 0,            // number of matched fields
 * matchedFields: [],       // e.g. ["Email addresses"]
 * tips: [],                 // e.g. ["Change your password"]
 * degree: number           // Risk level percentage (0 to 100) for UI
 * }
 */
function mapAppsToRisk(sharedApps, breaches) {
    // Define what label, tip, & weight go with each sharedData key
    const fieldInfo = {
        email: { label: "Email addresses", tip: "Consider changing or using a unique email.", weight: 10 },
        password: { label: "Passwords", tip: "Change your password and use a password manager.", weight: 30 },
        phoneNumber: { label: "Phone numbers", tip: "Consider using two‑factor authentication.", weight: 15 },
        location: { label: "Geographic locations", tip: "Review location sharing settings in the app.", weight: 5 },
        aadhaarNumber: { label: "Aadhaar numbers", tip: "Monitor for identity theft and consider masking your ID.", weight: 40 },
    };
    const maxPossibleRisk = Object.values(fieldInfo).reduce((sum, info) => sum + info.weight, 0); // Should be 100

    var report = [];

    for (var i = 0; i < sharedApps.length; i++) {
        var app = sharedApps[i];
        var nameLower = app.appName.toLowerCase();
        var matchedBreach = null;
        var matchedFields = [];
        var tips = [];
        var riskScore = 0;
        var calculatedRisk = 0;

        // Find matching breach
        for (var j = 0; j < breaches.length; j++) {
            var b = breaches[j];
            if (b.domain.toLowerCase().includes(nameLower) || b.breachID.toLowerCase().includes(nameLower)) {
                matchedBreach = b;
                break;
            }
        }

        if (matchedBreach) {
            var exposedLower = matchedBreach.exposedData.map(s => s.toLowerCase());
            var keys = Object.keys(app.sharedData);

            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                if (app.sharedData[key] && fieldInfo[key] && exposedLower.includes(fieldInfo[key].label.toLowerCase())) {
                    matchedFields.push(fieldInfo[key].label);
                    tips.push(fieldInfo[key].tip); // Keep the tips!
                    riskScore += 1;
                    calculatedRisk += fieldInfo[key].weight;
                }
            }
        }

        // Calculate the risk percentage (0 to 100)
        const degree = Math.min(100, Math.max(0, calculatedRisk));

        report.push({
            appId: app._id,
            appName: app.appName,
            matchedBreach: matchedBreach,
            riskScore: riskScore,
            matchedFields: matchedFields,
            tips: tips,
            degree: degree,
        });
    }

    return report;
}

export default mapAppsToRisk;