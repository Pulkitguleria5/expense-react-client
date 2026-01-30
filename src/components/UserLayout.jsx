import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

export default function UserLayout({children}) {

    return (
        <div>
            <UserHeader />
            {children}
            <UserFooter />

        </div>
    );
}