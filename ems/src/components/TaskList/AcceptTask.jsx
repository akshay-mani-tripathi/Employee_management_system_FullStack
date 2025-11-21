import React from "react";

const AcceptTask = ({ data, handleStatusChange }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-[#2e2e2e] to-[#1b1b1b] rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <h3 className="bg-yellow-600 text-sm px-3 py-1 rounded-2xl">{data.category}</h3>
        <h4 className="text-xs text-gray-400">{data.date}</h4>
      </div>

      <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-gray-300 mt-2">{data.description}</p>

      <div className="flex justify-between mt-5">
        <button
          onClick={() => handleStatusChange(data._id, "Completed")}
          className="bg-green-600 hover:bg-green-700 py-2 px-3 text-sm rounded-lg transition-colors"
        >
          Mark Completed
        </button>
        <button
          onClick={() => handleStatusChange(data._id, "Failed")}
          className="bg-red-600 hover:bg-red-700 py-2 px-3 text-sm rounded-lg transition-colors"
        >
          Mark Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
