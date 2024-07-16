import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

const BlogCard = ({ blog }) => {
    return (
        <div className="card">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto" />
            <div className="card-content">
                <span className="badge">{blog.category}</span>
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={blog.authorImageUrl} />
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
