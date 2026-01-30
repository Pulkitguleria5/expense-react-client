// export default function Logout(props) {
//     // Clear user details on logout
//     props.setUserdetails(null);
    
// }



import { useEffect } from "react";
import axios from "axios";

function Logout(props) {

    const logout = async () => {
      try {
        await axios.post("http://localhost:5001/auth/logout",{},{ withCredentials: true });
      } catch (error) {
        console.log(error);
      }
      props.setUser(null);
    };
  useEffect(() => {
           logout();
  }, []);

  return null;
}

export default Logout;

