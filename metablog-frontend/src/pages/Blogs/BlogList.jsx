import { useState } from 'react';
import BlogCard from "../../components/BlogCard";


const BlogList = ({ myBlogs, savedBlogs }) => {
    const [view, setView] = useState('myBlogs');

    const blogsToDisplay = view === 'myBlogs' ? myBlogs : savedBlogs;

    return (
        <div>
            <div className="flex justify-center items-center mb-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogsToDisplay.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} showStatus={view === 'myBlogs'} />
                ))}
            </div>
        </div>
    );
};

export default BlogList;
