import React from "react";
import StatsCards from "../components/statsCards/StatsCards";
import TodaysClasses from "../components/todaysClasses/TodaysClasses";
import TopProfessors from "../components/topProfessors/TopProfessors";
import TopCourses from "../components/TopCourses/TopCourses";
import TopTardyTeachers from "../components/percentageProfesors/PercentageProfesors.jsx";

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <StatsCards />

            <div className="grid grid-cols-1 xl:grid-cols-7 gap-4 items-start"> {/* Cambiamos a 7 columnas para más granularidad */}
                {/* Columna izquierda - ahora 2.5/7 (era 3/6) */}
                <div className="xl:col-span-2 space-y-4">
                    <TopProfessors />
                    <TopCourses />
                </div>

                {/* Columna central - ahora 2.5/7 (era 2/6) */}
                <div className="xl:col-span-3"> {/* Aumentado a 3 columnas */}
                    <TodaysClasses />
                </div>

                {/* Columna derecha - mantiene proporción similar (2/7 vs antes 2/6) */}
                <div className="xl:col-span-2 space-y-3">
                    <TopTardyTeachers />
                </div>
            </div>
        </div>
    );
};