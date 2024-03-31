import React from 'react';

import { Fallback } from '../common';

import { ErrorLevels } from '@/enums';
import { logError } from '@/utils';

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
  componentDidCatch(error: Error, _: React.ErrorInfo) {
    logError(error, ErrorLevels.Error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <Fallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
