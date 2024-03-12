import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select
} from '@mantine/core';
import { notifications } from "@mantine/notifications";
import classes from './AuthenticationTitle.module.css';
import { useEffect, useState } from "react";
import * as React from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import axios from "axios";
import NumberSelect from './NumberSelect';

function Login() {
  const { setCurrentUser} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfileId, setUserProfileId] = useState(-1);
  const [profileOptions, setProfileOptions] = useState([]);


  const navigate = useNavigate();

  console.log('Value:', userProfileId);

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

  function login(event: any) {
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
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          notifications.show({
            title: "Error",
            message: error.response.data,
            color: "red",
          });
        });
  }

  return (
    <form className="loginForm" onSubmit={login}>
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
        label="Email" 
        placeholder="user@gmail.com" 
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required />

        <PasswordInput 
        label="Password" 
        value={password}
        placeholder="Your password" 
        onChange={(event) => setPassword(event.currentTarget.value)}
        required mt="md" />

        <NumberSelect
          className="profileField"
          data={profileOptions}
          value={userProfileId as number}
          placeholder="Login As"
          onChange={setUserProfileId as any}
          required
        />

        <Button className ="loginBtn" type = "submit" fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
    </form>

  );
}

export default Login;