import React from 'react';
import ".styles/styles.css";
const SignUp = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800 text-white">
            <div className="text-4xl font-bold mb-8">StockEdge MK 📈</div>
            <div className="bg-blue-700 p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Create New Account
                </h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">NAME</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">EMAIL</label>
                        <input
                            type="email"
                            placeholder="Your Email"
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
                    <div className="mb-4">
                        <label className="block text-sm mb-2">DATE OF BIRTH</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                        >
                            <option>Select</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            {/* Додај повеќе опции по потреба */}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
