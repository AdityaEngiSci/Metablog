import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BlogList from './BlogList';

const myBlogs = [
    // Example data
    {
        id: 2,
        imageUrl: "blog-sample-images/blog-image-1.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "TW",
        authorName: "Tracey Wilson",
        date: "2022-08-20",
        status: 'Approved' },
    {
        id: 3,
        imageUrl: "blog-sample-images/blog-image-2.png",
        category: "Technology",
        title: "The Impact of Technology on the Workplace: How Technology is Changing",
        authorImageUrl: "/img.png",
        authorInitials: "JF",
        authorName: "Jason Francisco",
        date: "2022-08-20",
        status: 'Approved'
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
        status: 'Pending'
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
        status: 'Rejected'
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
        status: 'Pending'
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
        status: 'Rejected'
    }
    // Add more blogs here
];

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
    return (
        <div>
            <Header />
            <main className="container mx-auto px-4">
                <BlogList myBlogs={myBlogs} savedBlogs={savedBlogs} />
            </main>
            <Footer />
        </div>
    );
};

export default UserBlogs;
