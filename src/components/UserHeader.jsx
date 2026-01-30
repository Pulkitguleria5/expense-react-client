import{Link} from 'react-router-dom';
export default function UserHeader(){
    return(
        <div className="container">
            <Link to="/dashboard">Dashboard</Link> 
            <Link to="/logout">Logout</Link> 
            </div>
    );

}