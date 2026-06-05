import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import HomePage from './pages/HomePage';
import { AppError } from './types';

type AppState = 'loading' | 'error' | 'success';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('loading');
  const [error, setError] = useState<AppError | null>(null);

  // Simulate initial app load
  useEffect(() => {
    const loadApp = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate occasional errors - remove this in production
        // const shouldError = Math.random() > 0.7;
        // if (shouldError) {
        //   throw new Error('Error simulado para demostración');
        // }

        setAppState('success');
      } catch (err) {
        setError({
          code: 'APP_LOAD_ERROR',
          message: err instanceof Error ? err.message : 'Error desconocido',
          details: 'No se pudo inicializar la aplicación',
          timestamp: new Date().toISOString(),
        });
        setAppState('error');
      }
    };

    loadApp();
  }, []);

  const handleRetry = () => {
    setAppState('loading');
    setError(null);
    
    // Reset and retry
    setTimeout(() => {
      setAppState('success');
    }, 2000);
  };

  const handlePageError = (err: Error) => {
    setError({
      code: 'PAGE_ERROR',
      message: err.message,
      details: 'Ocurrió un error al cargar la página',
      timestamp: new Date().toISOString(),
    });
    setAppState('error');
  };

  return (
    <main>
      {appState === 'loading' && <LoadingScreen />}
      {appState === 'error' && error && (
        <ErrorScreen error={error.message} onRetry={handleRetry} />
      )}
      {appState === 'success' && (
        <HomePage onError={handlePageError} />
      )}
    </main>
  );
};

export default App;
