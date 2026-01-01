import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider } from "@apollo/client/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { createApolloClient } from "./services/graphql/client";
import { useMemo } from "react";

const AppContent = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Create Apollo Client with Auth0 token
  const apolloClient = useMemo(
    () => createApolloClient(getAccessTokenSilently),
    [getAccessTokenSilently]
  );

  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ApolloProvider>
  );
};

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE!;

  return (
    <ChakraProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
          scope: "openid profile email",
        }}
      >
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Auth0Provider>
    </ChakraProvider>
  );
}

export default App;
