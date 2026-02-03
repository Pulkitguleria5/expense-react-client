import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
    return (
        <div>
            <Header />
            {/* <Navbar /> */}
                {children}
            
            <Footer />
        </div>
    );
}
