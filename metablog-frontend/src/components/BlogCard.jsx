import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

const handleClick = () => {
    history.push(`/blog/${blog.id}`);
};

const BlogCard = ({ blog }) => {
    return (
        <div className="card" onClick={handleClick}>
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto" />
            <div className="card-content p-4">
                <span className="badge">{blog.category}</span>
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <div className="flex items-center space-x-2">
                    <Avatar >
                        <AvatarImage src={blog.authorImageUrl} className="w-8 h-8" />
                        <AvatarFallback>{blog.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span>{blog.authorName}</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
