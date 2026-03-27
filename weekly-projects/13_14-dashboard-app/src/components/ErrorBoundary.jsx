import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  // Step 1: Trigger fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Step 2: Log error (for debugging / monitoring)
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error);
    console.error("Error info:", errorInfo);

    // In real apps:
    // send to logging service (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>🚨 Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
