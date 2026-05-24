import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Something went wrong' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container page-center">
          <div className="card" style={{ maxWidth: 480, textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <p className="text-muted">{this.state.message}</p>
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
