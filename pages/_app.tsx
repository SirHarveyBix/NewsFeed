import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { useApollo } from '../utils/appolloClient';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { user } = pageProps;

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider user={user}>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}
