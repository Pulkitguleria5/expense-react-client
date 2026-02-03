import { useSelector } from "react-redux";
export default function Dashboard(s) {
    const userdetails = useSelector((state) => state.user);
    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>User Details: {userdetails?.name}</p>

        </div>



    );

}