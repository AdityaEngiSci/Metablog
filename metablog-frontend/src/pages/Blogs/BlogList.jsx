import { useState } from 'react';
import BlogCard from "../../components/BlogCard/BlogCard";
import {AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import Avatar from "react-avatar";
import { FaFacebookF, FaTwitter, FaInstagram , FaGithub, FaLinkedin,FaYoutube, FaGlobe} from 'react-icons/fa';


const BlogList = ({ myBlogs, savedBlogs ,onUnsave }) => {
    const [view, setView] = useState('myBlogs');

    const blogsToDisplay = view === 'myBlogs' ? myBlogs : savedBlogs;

    const user = {
        name: 'Tracey Wilson',
        bio: 'Frontend Developer',
        initials: 'TW',
        socialLinks: [
            { platform: 'Twitter', url: 'https://twitter.com' },
            { platform: 'LinkedIn', url: 'https://linkedin.com' },
            { platform: 'GitHub', url: 'https://github.com' },
            { platform: 'Instagram', url: 'https://instagram.com' },
            { platform: 'YouTube', url: 'https://youtube.com' },
            { platform: 'Facebook', url: 'https://facebook.com' },

        ]
    }
    return (
        <div>
            {/* User profile section */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-8 mx-auto md:w-3/5">
                <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                        <AvatarImage src="/img.png" className="w-16 h-16 rounded-full"/>
                        <AvatarFallback
                            className="w-16 h-16 rounded-full bg-gray-300 text-center text-gray-700 text-2xl font-medium">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-semibold">{user.name}</h1>
                        <p className="text-gray-600">{user.title}</p>
                    </div>
                </div>

                <p className="text-gray-800 mb-4">{user.bio}</p>

                <div className="flex space-x-4">
                    {user.socialLinks.map((link, index) => {
                        let Icon;
                        switch (link.platform) {
                            case 'Facebook':
                                Icon = FaFacebookF;
                                break;
                            case 'Twitter':
                                Icon = FaTwitter;
                                break;
                            case 'Instagram':
                                Icon = FaInstagram;
                                break;
                            case 'LinkedIn':
                                Icon = FaLinkedin;
                                break;
                            case 'YouTube':
                                Icon = FaYoutube;
                                break;
                            case 'GitHub':
                                Icon = FaGithub;
                                break;
                            default:
                                // Handle unsupported platforms if needed (e.g., display a generic icon or skip)
                                Icon = FaGlobe;
                                break;
                        }

                        return (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Icon size={20}/>
                            </a>
                        );
                    })}
                </div>
            </div>
            {/* Blog view toggle buttons */}
            <div className="flex justify-center items-center mb-4 md:p-5">
                <button
                    className={`px-4 py-2 ${view === 'myBlogs' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setView('myBlogs')}
                >
                    My Blogs
                </button>
                <button
                    className={`ml-2 px-4 py-2 ${view === 'savedBlogs' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => setView('savedBlogs')}
                >
                    Saved Blogs
                </button>
            </div>
            {/* Blog cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogsToDisplay.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        showStatus={view === 'myBlogs'}
                        isSavedBlog={view === 'savedBlogs'}
                        onUnsave={view === 'savedBlogs' ? () => onUnsave(blog.id) : null}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlogList;
