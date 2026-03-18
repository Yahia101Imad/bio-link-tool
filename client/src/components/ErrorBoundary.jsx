import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Global Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-100 p-6 rounded shadow">
            <h2 className="text-red-600 font-bold text-lg">
              Something went wrong!
            </h2>
            <p className="text-red-500 mt-2">
              {this.state.error?.message || "Unknown Error"}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}