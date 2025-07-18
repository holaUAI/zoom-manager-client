import React from 'react'

export const MetricCard = ({ label, value, icon, color }) => {
    const colors = {
        purple: "from-purple-500 to-purple-600 text-purple-600 border-purple-100",
        green: "from-green-500 to-green-600 text-green-600 border-green-100",
        yellow: "from-yellow-500 to-yellow-600 text-yellow-600 border-yellow-100",
        red: "from-red-500 to-red-600 text-red-600 border-red-100",
    };

    return (
        <div
            className={`bg-white/80 p-4 shadow-lg rounded-xl border backdrop-blur-sm ${colors[color]}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium text-gray-500">{label}</p>
                    <p className={`text-2xl font-bold ${colors[color].split(" ")[2]}`}>{value}</p>
                </div>
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${colors[color]}`}
                >
                    <span className='text-white'>{icon}</span>
                </div>
            </div>
        </div>
    );
};
