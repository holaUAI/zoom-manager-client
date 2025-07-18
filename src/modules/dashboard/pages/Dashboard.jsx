import React from "react";
import StatsCards from "../components/statsCards/StatsCards";
import TodaysClasses from "../components/todaysClasses/TodaysClasses";
import TopProfessors from "../components/topProfessors/TopProfessors";
import TopCourses from "../components/TopCourses/TopCourses";
import TopTardyTeachers from "../components/percentageProfesors/PercentageProfesors.jsx";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../shared/atoms/sidebarAtom";

export const Dashboard = () => {
    const [open] = useAtom(sidebarOpenAtom);

    return (
        <div className="relative">
            {/* Logo fijo en la esquina superior izquierda */}
            <div 
                className={`top-4 transition-all duration-300 ease-in-out ${
                    open ? "left-[17rem]" : "left-[4.5rem]"
                }`}
            >
                <img 
                    src="/tutor.IA.png" 
                    alt="Tutor IA Logo" 
                    className="h-10" // Ajusta el tamaño según necesites
                />
            </div>

            {/* Contenido principal SIN padding izquierdo */}
            <div className={`pt-16 ${open ? "ml-05" : "ml-05"} transition-all duration-300 ease-in-out`}>
                <div className="space-y-6 px-4"> {/* Añade padding horizontal si es necesario */}
                    <StatsCards />

                    <div className="grid grid-cols-1 xl:grid-cols-7 gap-4 items-start">
                        <div className="xl:col-span-2 space-y-4">
                            <TopProfessors />
                            <TopCourses />
                        </div>

                        <div className="xl:col-span-3">
                            <TodaysClasses />
                        </div>

                        <div className="xl:col-span-2 space-y-3">
                            <TopTardyTeachers />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};