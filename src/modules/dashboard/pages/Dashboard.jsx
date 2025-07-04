import React from "react";
import StatsCards from "../components/statsCards/StatsCards";
import TodaysClasses from "../components/todaysClasses/TodaysClasses";
import TopProfessors from "../components/topProfessors/TopProfessors";
import TopCourses from "../components/TopCourses/TopCourses";

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <StatsCards />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
                {/* Columna izquierda */}
                <div className="space-y-4">
                    <TopProfessors />
                    <TopCourses />
                </div>

                {/* Columna central (toma 2 columnas) */}
                <div className="xl:col-span-2">
                    <TodaysClasses />
                </div>
            </div>
        </div>
    );
};
