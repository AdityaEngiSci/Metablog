import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import Avatar from 'react-avatar';
import {AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";


function BlogsListing() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("https://api.yourwebsite.com/blogs")
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error("Error fetching blogs:", error));
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 p-4 md:p-10">
                <div className="grid gap-4">
                    {blogs.length > 0 && (
                        <div className="relative card">
                            <img src={blogs[0].imageUrl} alt="Featured Blog" className="w-full h-auto"/>
                            <div
                                className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                                <span className="badge">{blogs[0].category}</span>
                                <h2 className="text-xl font-bold">{blogs[0].title}</h2>
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src={blogs[0].authorImageUrl}/>
                                        <AvatarFallback>{blogs[0].authorInitials}</AvatarFallback>
                                    </Avatar>
                                    <span>{blogs[0].authorName}</span>
                                    <span>{new Date(blogs[0].date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.slice(1).map((blog) => (
                            <BlogCard key={blog.id} blog={blog}/>
                        ))}
                    </div>
                    <button className="mx-auto btn-outline">
                        Load More
                    </button>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default BlogsListing;
