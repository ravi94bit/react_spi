import React from "react";
import HomeLayout from "../Layout/HomeLayout";


const Home = () => {
    return (
        <HomeLayout>
        <div className="container justify-content-center mt-5">
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our website.</p>
        </div>
        </HomeLayout>
    );
}
export default Home;