/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { theme1, theme2 } from "../helpers/theme";
import Registration from "../components/Registration";
import Login from "../components/Login";
import {
  Box,
  Container,
  Text,
  Switch,
} from "@chakra-ui/react";
import '../styles/auth.scss'


const Authentication = () => {

  const [isLoginActive, setIsLoginActive] = useState(false);
  const isTheme1 = true;
  const theme = isTheme1 ? theme1 : theme2;

  const handleSwitchChange = () => {
    setIsLoginActive(!isLoginActive);
  };

  return (
    <Box>
      <Container
        mt={"10vh"}
        maxW="2xl"
        bg={theme.colors.primary[1]}
        padding={10}
        borderRadius={20}
        borderColor={theme.colors.primary[2]}
        className="borderForm"
      >
       
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          transition="all 0.3s"
        >
          <Text
            fontSize="xl"
            opacity={isLoginActive ? 0.5 : 1}
            cursor="pointer"
            onClick={handleSwitchChange}
            color={'#7DD2E6'}
          >
            Registration
          </Text>
          <Switch
            colorScheme="teal"
            size="lg"
            margin={2}
            isChecked={isLoginActive}
            onChange={handleSwitchChange}
          />
          <Text
            fontSize="xl"
            opacity={isLoginActive ? 1 : 0.5}
            cursor="pointer"
            onClick={handleSwitchChange}
            color={'#81E6D9'}
          >
            Login
          </Text>
        </Box>

        <Box
          transition="all 0.3s"
          opacity={isLoginActive ? 0 : 1}
          maxHeight={isLoginActive ? "0" : "1000px"}
          overflow="hidden"
        >
          <Registration />
        </Box>

        <Box
          transition="all 0.3s"
          opacity={isLoginActive ? 1 : 0}
          maxHeight={isLoginActive ? "1000px" : "0"}
          overflow="hidden"
        >
          <Login />
        </Box>
      </Container>
    </Box>
  );
};

export default Authentication;