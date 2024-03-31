import React from 'react';

import { Fallback } from '../common';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // log error to an error reporting service
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <Fallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
