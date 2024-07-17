import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const handleCardClick = (blogId) => {
    history.push(`/blog/${blogId}`);
};

const BlogCard = ({ blog, showStatus }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <ClockIcon className="w-5 h-5 text-yellow-500" />;
            case 'Approved':
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            case 'Rejected':
                return <XCircleIcon className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="card border rounded-lg shadow-lg overflow-hidden" onClick={() => handleCardClick(blog.id)}>
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover" />
            <div className="card-content p-4">
                <span className="badge bg-blue-500 text-white px-2 py-1 rounded">{blog.category}</span>
                <h3 className="text-sm font-bold mt-2">{blog.title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                    <Avatar>
                        <AvatarImage src={blog.authorImageUrl} className="w-6 h-6 rounded-full" />
                        <AvatarFallback className="w-6 h-6 rounded-full bg-gray-300 text-center">{blog.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{blog.authorName}</span>
                    <span className="text-xs text-gray-500">{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                {showStatus && (
                    <div className="flex items-center space-x-1 mt-2">
                        <span className={`text-xs ${blog.status === 'Pending' ? 'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800' : blog.status === 'Approved' ? 'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-green-500 bg-green-100' : 'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-red-500 bg-red-100'}`}>
                            {blog.status}{getStatusIcon(blog.status)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogCard;
