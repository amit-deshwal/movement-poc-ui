"use client";
import React from "react";
import withErrorBoundary from "../components/ErrorBoundary"; // Import the HOC
import Playground from "../components/playground/Playground";

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow">
        <Playground />
      </main>
    </div>
  );
};

export default withErrorBoundary(App);
