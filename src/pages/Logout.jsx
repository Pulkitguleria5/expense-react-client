// export default function Logout(props) {
//     // Clear user details on logout
//     props.setUserdetails(null);
    
// }


import { serverEndpoint } from "../config/appConfig";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/user/userSlice";

function Logout() {
  // const { setUserdetails } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${serverEndpoint}/auth/logout`, {}, { withCredentials: true });
        // setUserdetails(null);
        dispatch(clearUser());
      } catch (error) {
        console.log(error);
      }
    };

    logout();
  }, [setUserdetails]);

  return null;
}

export default Logout;

