import LogoutButton from "./LogoutButton";
  
export function ManagerOnly () {
    return (
        <div>
            Hi I am in ManagerOnlyPage, unable to be accessed by User or through URL.
            <LogoutButton />
        </div>
    );
  }
  
  export default ManagerOnly;