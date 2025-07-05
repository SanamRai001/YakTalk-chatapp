    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import userProfile from './assets/user-profile.png';


    function Login(){
        const [userinfo, setUserinfo] = useState({name: "", password : ""});
        const navigate = useNavigate(); 

        const handleSend = async(e)=>{
            e.preventDefault();
            if(userinfo.password <8){
              alert("Password must be of atleast 8 characters!");
            }
            const res = await fetch("https://yaktalk-chatapp.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userinfo),
                credentials: "include"
            });
            if(res.ok){
                localStorage.setItem("name",userinfo.name);
                navigate("/chat");
            }
            else{
                alert("Login Failed"+ res.text);
            }
            console.log("Login response", await res.text());
        }

        return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <form 
      onSubmit={handleSend}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl"
    >
      {/* Logo/Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4 overflow-hidden border-4 border-indigo-50">
          <img 
            src={userProfile} 
            alt="User profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-500 mt-1">Sign in to your account</p>
      </div>

      {/* Name Input */}
      <div className="mb-5">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={userinfo.name}
            onChange={(e) => setUserinfo({ ...userinfo, name: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="Enter your username"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={userinfo.password}
            onChange={(e) => setUserinfo({ ...userinfo, password: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="••••••••"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Sign In
      </button>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </form>
  </div>
</div>
        );
    }

    export default Login