import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BlogList from './BlogList';
import { useEffect } from "react";
import axios from "axios";  
import { useState } from "react";

const savedBlogs = [
    // Example data
    {id: 2,
    imageUrl: "blog-sample-images/blog-image-1.png",
    category: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    authorImageUrl: "/img.png",
    authorInitials: "TW",
    authorName: "Tracey Wilson",
    date: "2022-08-20"
    },
    {
        id: 3,
        imageUrl: "blog-sample-images/blog-image-2.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "JF",
        authorName: "Jason Francisco",
        date: "2022-08-20",
    },
    {
        id: 4,
        imageUrl: "blog-sample-images/blog-image-3.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "TW",
        authorName: "Tracey Wilson",
        date: "2022-08-20",
    },
    {
        id: 5,
        imageUrl: "blog-sample-images/blog-image-3.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "TW",
        authorName: "Tracey Wilson",
        date: "2022-08-20",
    },
    {
        id: 6,
        imageUrl: "blog-sample-images/blog-image-1.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "TW",
        authorName: "Tracey Wilson",
        date: "2022-08-20",
    },
    {
        id: 7,
        imageUrl: "blog-sample-images/blog-image-2.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "JF",
        authorName: "Jason Francisco",
        date: "2022-08-20",
    }
];

const UserBlogs = () => {
    const [userBlogs, setUserBlogs] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("accessToken");
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try{
                axios.get(`${base_url}/blogs/my-blogs`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setUserBlogs(response.data.data);
                }).catch(error => {
                    setError("Error fetching user blogs. Please try again later.");
                });
            } catch (error) {
                setError("Error fetching user blogs. Please try again later.");
            }
        };
        fetchUserBlogs();
    }, []);

    return (
        <div>
            <Header />
            <main className="container mx-auto px-4">
                <BlogList myBlogs={userBlogs} savedBlogs={savedBlogs} />
            </main>
            <Footer />
        </div>
    );
};

export default UserBlogs;
