import LogoutButton from "./LogoutButton";
import { Space, Text  } from "@mantine/core";
  
export function ManagerOnly () {
    return (
        <div>
            <Text>Hi I am in ManagerOnlyPage, unable to be accessed by User or through URL.</Text>
            <Space h="xl" />
            <LogoutButton />
        </div>
    );
  }
  
  export default ManagerOnly;