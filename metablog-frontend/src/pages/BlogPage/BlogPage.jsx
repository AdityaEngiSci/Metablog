import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import "./BlogPage.css";
import { useState } from "react";
import { useEffect } from "react";

const BlogPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${base_url}/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Error fetching blog. Please try again later.");
      }
    };

    const fetchComments = () => {
      // Simulated comments data
      const commentsData = [
        {
          id: 1,
          content: "Great post!",
          authorName: "Alice",
          createdOn: "2024-07-24T08:00:00Z",
        },
        {
          id: 2,
          content: "Thanks for sharing.",
          authorName: "Bob",
          createdOn: "2024-07-24T09:30:00Z",
        },
      ];
      setComments(commentsData);
    };
    fetchBlog();
    fetchComments();
  }, [blogId, base_url]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Simulated API call to post a new comment
    const newCommentData = {
      id: comments.length + 1,
      content: newComment,
      authorName: "Current User",
      createdOn: new Date().toISOString(),
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  const handleSaveBlog = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${base_url}/users/save-blog`,
        { blogId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog saved successfully!");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-10 blog-container">
        <div className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="flex items-center blog-meta">
            <img src={blog.author_image_url} className="blog-author-image" />
            <span>{blog.author}</span>
            <span>{blog.authorName}</span>
            <span>
              {new Date(blog.createdOn).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <button
            onClick={handleSaveBlog}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg save-button"
          >
            Save
          </button>
          </div>
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
        <div className="comments-section bg-white p-6 mt-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form mb-4">
            <textarea
              className="comment-textarea w-full p-3 border rounded-lg mb-2"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              required
            />
            <button
              type="submit"
              className="comment-submit-button bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Post Comment
            </button>
          </form>
          <div className="comments-list space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comment p-4 bg-gray-100 rounded-lg flex items-start"
              >
                <img
                //   src={comment.author_image_url}
                  src={blog.author_image_url}
                  className="comment-author-image w-10 h-10 rounded-full mr-4"
                  alt="Comment Author"
                />
                <div>
                  <p className="mb-2">{comment.content}</p>
                  <div className="text-sm text-gray-500">
                    <span>{comment.authorName}</span> &bull;{" "}
                    <span>
                      {new Date(comment.createdOn).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
