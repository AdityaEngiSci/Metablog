import React, {useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CreateBlog.css';

const CreateBlog = () => {
    const [blogName, setBlogName] = useState('');
    const [author, setAuthor] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogImage, setBlogImage] = useState(null);
    const [blogImageUrl, setBlogImageUrl] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setBlogImage(file);
        setBlogImageUrl(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log({
            blogName,
            author,
            blogDescription,
            blogContent,
            blogImage,
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 p-4 md:p-10 create-blog-container">
                <div className="create-blog-header">
                    <h1>CREATE BLOG</h1>
                    <p>Subheading for description or instructions</p>
                </div>
                <form onSubmit={handleSubmit} className="create-blog-form">
                    <div className="form-group">
                        <label htmlFor="blogName">Blog Name</label>
                        <input
                            id="blogName"
                            type="text"
                            value={blogName}
                            onChange={(e) => setBlogName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Title</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{gridColumn: 'span 2'}}>
                        <label htmlFor="blogDescription">Blog Description</label>
                        <textarea
                            id="blogDescription"
                            value={blogDescription}
                            onChange={(e) => setBlogDescription(e.target.value)}
                            rows="3"
                        />
                    </div>
                    <div className="form-group blog-image-upload" style={{gridColumn: 'span 2'}}>
                        <div>
                            {blogImageUrl && <img src={blogImageUrl} alt="Blog"/>}
                            <input
                                id="blogImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="blogImage">Choose Blog Image</label>
                        </div>
                        <button type="button" className="bg-black text-white py-2 px-4 rounded-md border-none">UPLOAD</button>
                    </div>
                    <div className="form-group" style={{gridColumn: 'span 2'}}>
                        <label htmlFor="blogContent">Write Your Tech Ideas...</label>
                        <Editor
                            apiKey='ooqeeofdy8us6qptstz4ytj0cmrvbuknkoh73fg2re3j60eu' // Replace with your valid API key
                            id="blogContent"
                            initialValue="<p>Welcome to Meta blogs!!</p>"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={(content) => setBlogContent(content)}
                        />
                    </div>
                    <div className="form-group submit-btn">
                        <button type="submit">Submit Blog</button>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    );
};

export default CreateBlog;
