import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userProfile from './assets/user-profile.png'; 

function Signup(){
      const [userinfo, setUserinfo] = useState({name: "", password : ""});
      const navigate = useNavigate();
        const handleSend = async(e)=>{
            e.preventDefault();
            const res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userinfo),
                credentials: "include"
            });
            console.log("signup response", await res.text());
            if(res.ok){
                navigate("/login");
            }
            else{
                alert("signup Failed"+ res.text);
            }
        }

    return (<>
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <form 
      onSubmit={handleSend}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl"
    >
      {/* Header with Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden border-4 border-blue-50">
          <img 
            src={userProfile} 
            alt="User profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-500 mt-1">Join our community today</p>
      </div>

      {/* Name Input */}
      <div className="mb-5">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={userinfo.name}
            onChange={(e) => setUserinfo({ ...userinfo, name: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder-gray-400"
            placeholder="John Doe"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none placeholder-gray-400"
            placeholder="At least 8 characters"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Use a strong, unique password</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Account
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          className="py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
          </svg>
          Facebook
        </button>
        <button
          type="button"
          className="py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.143-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-.67-.069-1.325-.195-1.955h-9.805z" />
          </svg>
          Google
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </form>
  </div>
</div>
    </>);
}

export default Signup