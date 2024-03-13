import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import classes from './AuthenticationTitle.module.css';
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import axios from "axios";
import NumberSelect from './NumberSelect';

function Login() {
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfileId, setUserProfileId] = useState(-1);
  const [profileOptions, setProfileOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewuserprofile/all")
      .then(({ data }) => {
        if (data) {
          const options = data
            .map((profile: { id: any; profileName: any; }) => ({
              value: String (profile.id),
              label: profile.profileName,
            }));
          setProfileOptions(options);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function login(event : any) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        profile: { id: userProfileId },
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        const token = response.data;
        const decodedToken = jose.decodeJwt(token);
        localStorage.setItem("jwt", token);
        setCurrentUser(decodedToken);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        notifications.show({
          title: "Welcome!",
          message: "Login successful",
        });
        // Redirect based on role
        const { role } = decodedToken;
        navigate(role === 'manager' ? '/ManagerPage' : '/UserPage');
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid userid or password.");
      });
  }

  return (
    <form className="loginForm" onSubmit={login}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back Ky!
        </Title>


        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Password"
            value={password}
            placeholder="Your password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            mt="md"
          />

          <NumberSelect
            className="profileField"
            data={profileOptions}
            value={userProfileId}
            placeholder="Login As"
            onChange={setUserProfileId}
            required
            mt="md"
          />

          <Button className="loginBtn" type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
}

export default Login;
