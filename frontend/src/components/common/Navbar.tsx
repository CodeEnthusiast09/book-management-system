import {
  Box,
  Flex,
  Heading,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { user, logout } = useAuth0();

  return (
    <Box bg="blue.600" px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md" color="white">
          Book Management Dashboard
        </Heading>

        <Flex alignItems="center" gap={4}>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" name={user?.name} src={user?.picture} />
            </MenuButton>
            <MenuList>
              <MenuItem isDisabled>
                <Box>
                  <Box fontWeight="bold">{user?.name}</Box>
                  <Box fontSize="sm" color="gray.500">
                    {user?.email}
                  </Box>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};
