import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import './BlogPage.css'; 
import { useState } from "react";
import { useEffect } from "react";

const BlogPage = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                const response = await axios.get(`${base_url}/blogs/${blogId}`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                setBlog(response.data.data); 
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError("Error fetching blog. Please try again later.");
            }
        };

        fetchBlog();
    }, [blogId, base_url]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-10 blog-container">
                <div className="blog-header">
                    {/* <span className="badge">{blog.category}</span> */}
                    <h1 className="blog-title">{blog.title}</h1>
                    <div className="flex items-center blog-meta">
                        {/* <Avatar> */}
                            <img src={blog.author_image_url} className="blog-author-image"/>
                            <span>{blog.author}</span>
                        {/* </Avatar> */}
                        <span>{blog.authorName}</span>
                        <span>{new Date(blog.createdOn).toLocaleDateString(undefined,{ year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                    <img src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="blog-content" dangerouslySetInnerHTML={{__html:blog.content}}>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;
