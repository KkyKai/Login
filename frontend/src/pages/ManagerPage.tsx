import LogoutButton from "./LogoutButton";
import {Link} from "react-router-dom";
  
export function ManagerPage () {
    return (
        <div>
            Hi Manager
            <Link to="/ManagerOnly"> ManagerOnlyPage </Link>
            <LogoutButton />
        </div>
    );
  }
  
  export default ManagerPage;