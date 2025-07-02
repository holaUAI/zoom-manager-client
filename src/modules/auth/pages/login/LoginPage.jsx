import Login from "../../components/login/view/Login";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-100 flex items-center justify-center p-4">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          </div>
          <div className="relative z-10 w-full">

          <Login /> 
          
          </div>
        </div>
      );
}
