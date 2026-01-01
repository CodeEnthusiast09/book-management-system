import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center">
      <Container maxW="md">
        <VStack spacing={8} bg="white" p={10} rounded="lg" shadow="lg">
          <Box textAlign="center">
            <Heading size="2xl" mb={2}>
              📚
            </Heading>
            <Heading size="lg" mb={2}>
              Book Management System
            </Heading>
            <Text color="gray.600">Sign in to manage your book collection</Text>
          </Box>

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={() => loginWithRedirect()}
          >
            Sign In / Sign Up
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Protected by Auth0 Authentication
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
