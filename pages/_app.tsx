import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      delay: 300,
      duration: 800,
    });
  });
  return <Component {...pageProps} />;
}

export default MyApp;
