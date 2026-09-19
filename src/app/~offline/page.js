"use client";

export default function OfflinePage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center p-4">
      <h1 className="fw-bold mb-3">You are offline</h1>
      <p className="text-muted mb-4">
        Please check your internet connection to access live features.
        Previously visited pages are still accessible.
      </p>
      <button
        className="btn btn-success"
        onClick={() => window.location.reload()}
      >
        Retry Connection
      </button>
    </div>
  );
}
