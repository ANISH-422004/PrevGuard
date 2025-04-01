import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";


const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item, index) => (
                <div key={index} className="flex items-center text-xs transition duration-200 ease-in-out">
                    {item.met ? (
                        <span className="text-green-500 mr-2"><AiOutlineCheck /></span> // Right icon
                    ) : (
                        <span className="text-red-500 mr-2"><AiOutlineClose/></span> // Wrong icon
                    )}
                    <span className={item.met ? "text-green-500 transition duration-200 ease-in-out" : "text-gray-400"}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PasswordStrength = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;

        if (pass.length >= 6) strength++;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;

        return strength;
    };

    const strength = getStrength(password);

    const getStrengthText = () => {
        switch (strength) {
            case 0:
                return "Very Weak";
            case 1:
                return "Weak";
            case 2:
                return "Moderate";
            case 3:
                return "Strong";
            default:
                return "Very Strong";
        }
    };

    return (
        <div className="mt-1">
            <div>
                <span className="text-xs text-gray-400">Password Strength: </span>
                <span className="text-xs text-gray-400">{getStrengthText()}</span>
            </div>

            <div className="h-1 w-full bg-gray-200 rounded-full mt-1 transition duration-200 ">
                <div
                    className={`h-full rounded-full ${
                        strength === 0
                            ? "bg-red-500"
                            : strength === 1
                            ? "bg-yellow-500"
                            : strength === 2
                            ? "bg-blue-500"
                            : "bg-green-500"
                    }`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                ></div>
            </div>

            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrength;
