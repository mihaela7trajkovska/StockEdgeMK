import React from 'react';
import ".styles/styles.css";

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
            <div className="text-4xl font-bold mb-8">StockEdge MK 📈</div>
            <div className="bg-blue-800 p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">EMAIL</label>
                        <input
                            type="email"
                            placeholder="hello@reallygreatsite.com"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">PASSWORD</label>
                        <input
                            type="password"
                            placeholder="******"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                        <a href="#" className="text-blue-300 hover:underline">
                            Don’t have an account?
                        </a>
                        <a href="#" className="text-blue-300 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
