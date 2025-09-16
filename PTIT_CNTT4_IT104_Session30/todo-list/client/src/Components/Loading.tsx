import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center py-6">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );
}
