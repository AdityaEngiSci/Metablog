// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';

const Header = () => {
    return (
        <header className="flex items-center justify-between h-16 px-4 border-b md:px-6 bg-white">
            <div className="flex items-center space-x-10">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                    <img src='/logo-black.svg' alt="MetaBlog Logo" className="w-25 h-25" />
                </Link>
            </div>
            <div>
                <form className="relative w-96">
                    <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4"/>
                    <input type="search" placeholder="Search" className="pl-8 py-1 w-96 border rounded"/>
                </form>

            </div>
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600">
                    Home
                </Link>
                <Link to="/saved" className="text-gray-600">
                    Saved Blogs
                </Link>
                <Link to="/create" className="text-gray-600">
                    Create Blog
                </Link>
                <button className="rounded-full p-2 bg-gray-200">
                    <FiUser className="w-6 h-6 text-gray-600" />
                </button>
            </div>
        </header>
    );
};

export default Header;
