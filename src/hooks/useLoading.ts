import { useState, useEffect } from 'react';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
      // Add a minimum loading time to prevent flashing
      return new Promise(resolve => setTimeout(resolve, 1000));
    };

    const stopLoading = () => {
      setIsLoading(false);
    };

    // Expose the loading state to the window object
    window.__loadingState = {
      start: startLoading,
      stop: stopLoading,
    };

    return () => {
      delete window.__loadingState;
    };
  }, []);

  return { isLoading, setIsLoading };
};

export default useLoading; 