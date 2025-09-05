import React from "react";
import Layout from "../layout";

const Subscription: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">
            Business Subscription
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            To extend your business subscription,
            <br />
            please contact:
          </p>
          <div className="text-emerald-700 text-xl font-semibold mb-8">
            +91 884 860 0150
          </div>
          <div className="flex justify-center">
            <a
              href="tel:+918848600150"
              className="bg-emerald-700 text-white px-6 py-2 rounded-md hover:bg-emerald-800 font-semibold shadow"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
