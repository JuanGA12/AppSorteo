import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CSVContext, useCSVContextState } from '../context/csvContext';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      delay: 300,
      duration: 800,
    });
  });

  const csvValues = useCSVContextState();
  return (
    <CSVContext.Provider value={csvValues}>
      <Component {...pageProps} />
    </CSVContext.Provider>
  );
}

export default MyApp;
