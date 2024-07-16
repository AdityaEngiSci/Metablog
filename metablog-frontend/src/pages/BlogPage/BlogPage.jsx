import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const staticBlogs = [
    {
        id: 1,
        imageUrl: "/images/featured-blog.jpg",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/images/authors/tracey-wilson.jpg",
        authorInitials: "TW",
        authorName: "Tracey Wilson",
        date: "2022-08-20",
        content: "Your full blog content goes here...",
    },
    {
        id: 2,
        imageUrl: "/images/blog1.jpg",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/images/authors/tracey-wilson.jpg",
        authorInitials: "TW",
        authorName: "Tracey Wilson",
        date: "2022-08-20",
        content: "Your full blog content goes here...",
    },
    {
        id: 3,
        imageUrl: "/images/blog2.jpg",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/images/authors/jason-francisco.jpg",
        authorInitials: "JF",
        authorName: "Jason Francisco",
        date: "2022-08-20",
        content: "Your full blog content goes here...",
    },
    // Add more static blogs here
];

function BlogPage() {
    const { id } = useParams();
    const blog = staticBlogs.find(blog => blog.id === parseInt(id));

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-10">
            <div className="mb-4">
                <span className="badge">{blog.category}</span>
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <div className="flex items-center space-x-2 mt-2">
                    <Avatar>
                        <AvatarImage src={blog.authorImageUrl} />
                        <AvatarFallback>{blog.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span>{blog.authorName}</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
            </div>
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto mb-4" />
            <div className="prose">
                {blog.content}
            </div>
        </div>
    );
}

export default BlogPage;
