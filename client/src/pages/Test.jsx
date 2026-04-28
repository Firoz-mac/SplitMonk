import React from 'react'

const Test = () => {
    return (
        <div className="min-h-screen bg-[#F6F8FC] flex">

            {/* SIDEBAR (desktop only) */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r p-5">
                <h1 className="text-xl font-bold text-blue-600 mb-8">SplitMonk</h1>

                <nav className="flex flex-col gap-4">
                    <p className="text-blue-500 font-medium">Home</p>
                    <p className="text-gray-500">Expenses</p>
                    <p className="text-gray-500">Groups</p>
                    <p className="text-gray-500">Profile</p>
                </nav>
            </aside>

            {/* MAIN */}
            <main className="flex-1 p-4 lg:p-8">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-sm text-gray-500">24 Friday 2026</p>
                        <h1 className="text-2xl font-semibold">Hey Mac 👋</h1>
                    </div>
                    <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/100" />
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* BALANCE */}
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg">
                            <p className="text-sm opacity-80">This Month</p>
                            <h1 className="text-4xl font-bold">₹31,055</h1>
                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between">
                            {["Add", "Split", "Scan", "Settle"].map((item) => (
                                <button className="flex flex-col items-center gap-2 group">
                                    <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-100 transition">
                                        +
                                    </div>
                                    <p className="text-xs text-gray-600">{item}</p>
                                </button>
                            ))}
                        </div>

                        {/* TRANSACTIONS */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm">
                            <h2 className="font-semibold mb-4">Recent Splits</h2>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3 items-center">
                                            <img src={`https://i.pravatar.cc/150?img=${i}`} className="w-10 h-10 rounded-full" />
                                            <p>Dinner</p>
                                        </div>
                                        <p className="text-green-500 font-semibold">+₹250</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT PANEL */}
                    <div className="space-y-6">

                        <div className="bg-red-50 p-5 rounded-2xl">
                            <p>You Owe</p>
                            <h2 className="text-2xl text-red-500">₹0</h2>
                        </div>

                        <div className="bg-green-50 p-5 rounded-2xl">
                            <p>You Get</p>
                            <h2 className="text-2xl text-green-500">₹0</h2>
                        </div>

                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 rounded-2xl">
                            🎁 Refer & Earn ₹120
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Test