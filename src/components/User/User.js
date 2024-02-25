import { useState,useEffect } from "react";
const User = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   
    useEffect(() => {
        const isTokenSet = localStorage.getItem("demo-token");
        setIsLoggedIn(isTokenSet);
        document.title = isTokenSet ? "Welcome User" : "Please Login"
        
    },[isLoggedIn])
    const handleLogin = () => {
        localStorage.setItem("demo-token",true);
        setIsLoggedIn(true);
    }
    const handleLogout = () => {
        localStorage.removeItem("demo-token");
        setIsLoggedIn(false);
    }
    return (
        <div>
            <h1>{isLoggedIn ? "Welcome User!" : "Please Login"}</h1>
            {
                isLoggedIn ?<button onClick={handleLogout}>Logout</button>
            :
                    <button onClick={handleLogin}>Login</button>
            }
        </div>
    )
}
export default User;