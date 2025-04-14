// utils/riskMapper.js

/**
 * Builds a risk report for each shared app by matching it against breach data,
 * including a 'degree' parameter representing an angle for UI purposes.
 *
 * @param {Array} sharedApps
 * Array of objects like:
 * {
 * _id: "abc123",
 * appName: "Twitter",
 * sharedData: {
 * email: true,
 * password: true,
 * phoneNumber: false,
 * location: false,
 * aadhaarNumber: false
 * }
 * }
 * @param {Array} breaches
 * Array of objects from the breach API, each with:
 * {
 * breachID: "Twitter",
 * domain: "twitter.com",
 * exposedData: ["Email addresses", "Passwords", ...],
 * ...
 * }
 * @returns {Array} riskReport
 * Each element:
 * {
 * appId: "abc123",
 * appName: "Twitter",
 * matchedBreach: { … } or null,
 * riskScore: 0,            // number of matched fields
 * matchedFields: [],       // e.g. ["Email addresses"]
 * tips: [],                 // e.g. ["Change your password"]
 * degree: number           // Angle in degrees (0 to 360) for UI
 * }
 */
function mapAppsToRisk(sharedApps, breaches) {
    // Define what label & weight go with each sharedData key
    var fieldInfo = {
        email: {
            label: "Email addresses",
            tip: "Consider changing or using a unique email.",
            weight: 10, // Assign a weight out of 100
        },
        password: {
            label: "Passwords",
            tip: "Change your password and use a password manager.",
            weight: 30,
        },
        phoneNumber: {
            label: "Phone numbers",
            tip: "Consider using two‑factor authentication.",
            weight: 15,
        },
        location: {
            label: "Geographic locations",
            tip: "Review location sharing settings in the app.",
            weight: 5,
        },
        aadhaarNumber: {
            label: "Aadhaar numbers",
            tip: "Monitor for identity theft and consider masking your ID.",
            weight: 40,
        },
    };

    var report = [];

    for (var i = 0; i < sharedApps.length; i++) {
        var app = sharedApps[i];
        var nameLower = app.appName.toLowerCase();

        // 1) Find matching breach (domain or breachID contains appName)
        var matchedBreach = null;
        for (var j = 0; j < breaches.length; j++) {
            var b = breaches[j];
            if (
                b.domain.toLowerCase().indexOf(nameLower) !== -1 ||
                b.breachID.toLowerCase().indexOf(nameLower) !== -1
            ) {
                matchedBreach = b;
                break;
            }
        }

        // 2) If there is a matched breach, compare sharedData vs exposedData
        var matchedFields = [];
        var tips = [];
        var riskScore = 0; // Total number of matched fields
        var calculatedRisk = 0; // Risk score out of 100

        if (matchedBreach) {
            // Lowercase all exposedData strings once
            var exposedLower = matchedBreach.exposedData.map(function (s) {
                return s.toLowerCase();
            });

            // For each sharedData field
            var keys = Object.keys(app.sharedData);
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var isShared = app.sharedData[key];
                if (!isShared) {
                    continue;
                }

                var info = fieldInfo[key];
                if (!info) {
                    continue;
                }

                // If the breach exposed that label
                if (exposedLower.indexOf(info.label.toLowerCase()) !== -1) {
                    matchedFields.push(info.label);
                    tips.push(info.tip);
                    riskScore += 1;
                    calculatedRisk += info.weight;
                }
            }
        }

        // Calculate the degree angle (0 to 360) based on the calculated risk (0 to 100)
        const degree = Math.round((calculatedRisk / 100) * 360);

        // Build the report item
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