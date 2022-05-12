import SSRProvider from 'react-bootstrap/SSRProvider';
import axios from "axios";
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
// own css files here
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
export default MyApp;
