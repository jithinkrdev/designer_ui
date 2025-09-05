import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50">
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-emerald-500 mb-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-7 4h10a2 2 0 002-2V7a2 2 0 00-2-2h-5.586a2 2 0 01-1.414-.586l-2.414-2.414A2 2 0 005.586 3H5a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
          <line
            x1="6"
            y1="12"
            x2="18"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="9" cy="15" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="1" fill="currentColor" />
        </svg>
        <h1 className="text-4xl font-bold text-emerald-700 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-emerald-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Oops! The page you are looking for does not exist or has been moved.
          <br />
          Please check the URL or return to the dashboard.
        </p>
        <a
          href="/dashboard"
          className="bg-emerald-700 text-white px-6 py-2 rounded-md hover:bg-emerald-800 font-semibold shadow"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
