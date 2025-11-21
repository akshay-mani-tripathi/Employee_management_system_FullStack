import React from "react";

const FailedTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-red-700 to-red-900 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded-2xl">{data.category}</h3>
        <h4 className="text-xs text-gray-200">{data.date}</h4>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">{data.title}</h2>
      <p className="text-sm text-red-100 mt-2">{data.description}</p>

      <div className="mt-5">
        <button className="bg-red-500 w-full py-2 text-sm rounded-lg">Failed</button>
      </div>
    </div>
  );
};

export default FailedTask;
