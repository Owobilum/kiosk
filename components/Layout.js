import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }) => {

    return (
        <div style={{
            backgroundColor: "#F5F5F5",
            border: 'solid 1px #F5F5F5'
        }}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout