const withLoading = (WrappedComponent) => {
  return ({ isLoading, loadingMessage = 'Se încarcă...', ...props }) => {
    if (isLoading) {
      return (
        <div className="loading-spinner">
          <p>{loadingMessage}</p>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
