import React from 'react'
import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
                        <Loader2 className="absolute inset-0 w-16 h-16 text-white animate-spin p-4" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Cargando Reuniones
                    </h2>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                        Preparando tu dashboard de reuniones...
                    </p>
                </div>

                <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}
