import React from "react";

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      {/* Skeleton según UI KIT */}
      <div className="skeleton-map"></div>
      <div className="skeleton-list">
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
      </div>
    </div>
  );
}