import LogoutButton from "./LogoutButton";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { TextInput, Space, Text  } from "@mantine/core";
  
export function UserPage () {
    const { id } = useParams();
    const location = useLocation();
    const data = location.state;

    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState("");

    async function getAccountAndInfo() {
        try {
          const userAccountResponse = await axios.get(
            `http://localhost:8080/viewuseraccount/2`
          );
          const loadedUserAccount = userAccountResponse.data;
          setName(loadedUserAccount.name);
          setEmail(loadedUserAccount.email);
          setUserName(loadedUserAccount.userName);
          setProfile(loadedUserAccount.profile.profileName);
    
          console.log(id);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        getAccountAndInfo();
      }, []);

    return (
        <div>
            <Text>Hi User, Welcome!</Text>
            <Space h="xl" />
            <TextInput readOnly
            label="Email"
            value={email}
            />
            <TextInput readOnly
            label="Name"
            value={name}
            />
            <TextInput readOnly
            label="UserName"
            value={username}
            />
            <TextInput readOnly
            label="Role"
            value={profile}
            />
            <Space h="xl" />
            <LogoutButton />
        </div>
    );
  }
  
  export default UserPage;