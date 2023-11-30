import { Component, ComponentType, ErrorInfo, PropsWithChildren, createElement } from 'react';

export type FallbackComponentProps = {
  error: unknown;
  reset: () => void;
};

export type ErrorBoundaryProps = PropsWithChildren<{
  onError?: (error: Error, info: ErrorInfo) => void;
  fallbackComponent: ComponentType<FallbackComponentProps>;
}>;

export type ErrorBoundaryState =
  | {
      hasError: true;
      error: unknown;
    }
  | {
      hasError: false;
      error: null;
    };

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    const { children, fallbackComponent } = this.props;
    const { hasError, error } = this.state;

    let childrenComponentsToRender = children;

    if (hasError) {
      const props: FallbackComponentProps = {
        error,
        reset: this.reset.bind(this),
      };
      childrenComponentsToRender = createElement(fallbackComponent, props);
    }

    return childrenComponentsToRender;
  }

  private reset() {
    const { error } = this.state;

    if (error) {
      this.setState(initialState);
    }
  }
}
