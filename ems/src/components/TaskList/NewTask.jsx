import React from "react";

const NewTask = ({ data, handleStatusChange }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <h3 className="bg-blue-600 text-sm px-3 py-1 rounded-2xl">{data.category}</h3>
        <h4 className="text-xs text-gray-400">{data.date}</h4>
      </div>

      <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
      <p className="text-sm text-gray-300 mt-2">{data.description}</p>

      <div className="flex justify-center mt-5">
        <button
          onClick={() => handleStatusChange(data._id, "Accepted")}
          className="bg-green-500 hover:bg-green-600 py-2 px-4 text-sm font-medium rounded-lg transition-colors"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
