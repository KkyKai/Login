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
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import { useEffect, useState } from "react";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="loginForm" onSubmit={Login}>
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
        placeholder="ky@gmail.com" 
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required />
        <PasswordInput 
        label="Password" 
        value={password}
        placeholder="Your password" 
        onChange={(event) => setPassword(event.currentTarget.value)}
        required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button className ="loginBtn" type = "submit" fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
    </form>

  );
}

export default Login;