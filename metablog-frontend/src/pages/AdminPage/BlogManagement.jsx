// src/pages/BlogManagement.js
import React, { useState } from 'react';

const blogsData = {
  pending: [
    { id: 1, title: 'Write blog post for demo day', domain: 'Technology', status: 'Pending', date: 'Dec 5', writer: 'John Doe' },
    // ... more data
  ],
  approved: [
    { id: 1, title: 'Approved blog post', domain: 'Technology', status: 'Approved', date: 'Dec 1', writer: 'Jane Doe' },
    // ... more data
  ],
  rejected: [
    { id: 1, title: 'Rejected blog post', domain: 'Technology', status: 'Rejected', date: 'Dec 3', writer: 'Jim Doe' },
    // ... more data
  ]
};

const BlogManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const renderPendingTable = (blogs) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Domain</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Approve</th>
            <th className="py-2 px-4 border-b">Reject</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="py-2 px-4 border-b">{blog.id}</td>
              <td className="py-2 px-4 border-b">{blog.title}</td>
              <td className="py-2 px-4 border-b">{blog.domain}</td>
              <td className="py-2 px-4 border-b">{blog.status}</td>
              <td className="py-2 px-4 border-b">{blog.date}</td>
              <td className="py-2 px-4 border-b">
                <img src="https://via.placeholder.com/40" alt="writer" className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-2 px-4 border-b">
                {blog.status === 'Pending' && <button className="bg-green-500 text-white px-4 py-1 rounded">Approve</button>}
              </td>
              <td className="py-2 px-4 border-b">
                {blog.status === 'Pending' && <button className="bg-red-500 text-white px-4 py-1 rounded">Reject</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStatusTable = (blogs) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Domain</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="py-2 px-4 border-b">{blog.id}</td>
              <td className="py-2 px-4 border-b">{blog.title}</td>
              <td className="py-2 px-4 border-b">{blog.domain}</td>
              <td className="py-2 px-4 border-b">{blog.date}</td>
              <td className="py-2 px-4 border-b">
                <img src="https://via.placeholder.com/40" alt="writer" className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-2 px-4 border-b">{blog.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <header className="flex items-center justify-between h-16 px-4 border-b md:px-6 bg-white">
        <div className="flex items-center space-x-10">
          <img src="/logo-black.svg" alt="MetaBlog Logo" className="w-25 h-25" />
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex space-x-4 mb-4">
          <button className={`py-2 px-4 ${activeTab === 'pending' ? 'border-b-2 border-blue-500 font-semibold' : ''}`} onClick={() => setActiveTab('pending')}>Pending Blogs</button>
          <button className={`py-2 px-4 ${activeTab === 'approved' ? 'border-b-2 border-blue-500 font-semibold' : ''}`} onClick={() => setActiveTab('approved')}>Approved Blogs</button>
          <button className={`py-2 px-4 ${activeTab === 'rejected' ? 'border-b-2 border-blue-500 font-semibold' : ''}`} onClick={() => setActiveTab('rejected')}>Rejected Blogs</button>
        </div>
        {activeTab === 'pending' && renderPendingTable(blogsData.pending)}
        {activeTab === 'approved' && renderStatusTable(blogsData.approved)}
        {activeTab === 'rejected' && renderStatusTable(blogsData.rejected)}
      </div>
    </div>
  );
};

export default BlogManagement;