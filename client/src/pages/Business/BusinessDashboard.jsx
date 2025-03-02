import React from "react";

function BusinessDashboard() {
  const requests = [
    { title: "Total", value: "05" },
    { title: "Accepted", value: "03" },
    { title: "Pending", value: "02" },
  ];
  return (
    <div className="lg:mt-8 lg:ml-8">
      <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-16">
        <div className="container-2 bg-green-400/20 border-green-600">
          <h2 className="head-2">Total Views:</h2>
          <span className="text-5xl font-semibold  ">1200</span>
        </div>
        <div className="container-2 bg-blue-400/20 border-blue-600 ">
          <h2 className="head-2">Total Listings:</h2>
          <span className="text-5xl font-semibold  ">120</span>
        </div>
        <div className="container-2 bg-orange-400/20 border-orange-600">
          <h2 className="head-2">Self pick-up requests:</h2>
          <div className="flex flex-col gap-2 justify-center">
            {requests.map((req) => (
              <h3 className="head-2 flex items-center gap-2">
                {req.title}: <span className="head-1 ">{req.value}</span>
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDashboard;
