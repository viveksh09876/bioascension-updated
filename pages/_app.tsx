import '../styles/globals.css';
import FingerprintProvider from '../components/FingerprintProvider';

export default function App({ Component, pageProps }) {
  return (
    <FingerprintProvider>
      <Component {...pageProps} />
    </FingerprintProvider>
  );
} 