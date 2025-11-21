import React from "react";

const CompleteTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <h3 className="bg-green-600 text-sm px-3 py-1 rounded-2xl">{data.category}</h3>
        <h4 className="text-xs text-gray-200">{data.date}</h4>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">{data.title}</h2>
      <p className="text-sm text-green-100 mt-2">{data.description}</p>

      <div className="mt-5">
        <button className="bg-green-500 w-full py-2 text-sm rounded-lg">Completed</button>
      </div>
    </div>
  );
};

export default CompleteTask;
