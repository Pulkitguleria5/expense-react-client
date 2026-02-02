// export default function Logout(props) {
//     // Clear user details on logout
//     props.setUserdetails(null);
    
// }



import { useEffect } from "react";
import axios from "axios";

function Logout(props) {
  const { setUserdetails } = props;

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("http://localhost:5001/auth/logout", {}, { withCredentials: true });
      } catch (error) {
        console.log(error);
      }
      setUserdetails(null);
    };

    logout();
  }, [setUserdetails]);

  return null;
}

export default Logout;

