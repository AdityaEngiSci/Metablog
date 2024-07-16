import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import './BlogPage.css'; // Import the CSS file

const blogs = [
    {
        id: 1,
        title: 'The Impact of Technology on the Workplace: How Technology is Changing',
        category: 'Technology',
        imageUrl: '/blog-sample-images/featured-blog.png',
        authorName: 'Tracey Wilson',
        authorImageUrl: '/path/to/author-image.jpg',
        authorInitials: 'TW',
        date: '2022-08-19',
        content: `
        Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. 
        However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore 
        tips and tricks for a memorable journey and how to make the most of your travels.
        
        Research Your Destination
        
        Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, 
        as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid 
        any cultural faux pas.
        
        Plan Your Itinerary
        
        While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time 
        and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid 
        overscheduling and ensure that you have time to relax and enjoy your journey.
        
        Conclusion:
        
        Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most 
        of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.
        `
    }
];

const BlogPage = () => {
    const { blogId } = useParams();
    const blog = blogs.find(b => b.id === parseInt(blogId, 10));

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-10 blog-container">
                <div className="blog-header">
                    <span className="badge">{blog.category}</span>
                    <h1 className="blog-title">{blog.title}</h1>
                    <div className="flex items-center blog-meta">
                        <Avatar>
                            <AvatarImage src={blog.authorImageUrl} />
                            <AvatarFallback>{blog.authorInitials}</AvatarFallback>
                        </Avatar>
                        <span>{blog.authorName}</span>
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <img src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="blog-content">
                    {blog.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;
