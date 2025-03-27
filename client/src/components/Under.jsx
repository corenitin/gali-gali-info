import React from "react";

const UnderMaintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-3.3rem)] text-center p-4">
      <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-lg dark:shadow-slate-400/20">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-400">🚧 Under Maintenance 🚧</h1>
        <p className="text-gray-600 mt-2">We're currently working on improvements. Please check back later.</p>
      </div>
    </div>
  );
};

export default UnderMaintenance;