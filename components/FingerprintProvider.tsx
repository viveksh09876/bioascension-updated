import { useEffect, useState, createContext, useContext } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface FingerprintContextType {
  fingerprint: string | null;
  isLoading: boolean;
  error: string | null;
}

const FingerprintContext = createContext<FingerprintContextType>({
  fingerprint: null,
  isLoading: true,
  error: null,
});

export const useFingerprint = () => useContext(FingerprintContext);

interface FingerprintProviderProps {
  children: React.ReactNode;
}

export default function FingerprintProvider({ children }: FingerprintProviderProps) {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        
        // Check if fingerprint is valid (not null/undefined)
        if (result.visitorId && result.visitorId !== 'null' && result.visitorId !== 'undefined') {
          setFingerprint(result.visitorId);
        } else {
          setError('Fingerprint not available (incognito mode or browser blocking)');
        }
      } catch (err) {
        console.error('Fingerprint error:', err);
        setError('Failed to generate device fingerprint - incognito mode detected');
      } finally {
        setIsLoading(false);
      }
    };

    initFingerprint();
  }, []);

  return (
    <FingerprintContext.Provider value={{ fingerprint, isLoading, error }}>
      {children}
    </FingerprintContext.Provider>
  );
} 