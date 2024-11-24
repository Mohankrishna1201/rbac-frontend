import React from "react";
import { FaGithub, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-[#0a0b10] text-[#010309] dark:text-[#f9fafb] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Developer Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-semibold text-[#098dfb] mb-1">Mohan Krishna Kattamuri</h3>
                        <p className="text-gray-700 dark:text-gray-300">MERN Stack Developer & Problem Solver</p>
                    </div>

                    {/* Links Section */}
                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/Mohankrishna1201"
                            className="text-[#098dfb] hover:text-[#010309] dark:hover:text-[#f9fafb] text-lg font-medium flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub className="mr-2" /> GitHub
                        </a>

                        <a
                            href="https://www.kattamuri.me/"
                            className="text-[#098dfb] hover:text-[#010309] dark:hover:text-[#f9fafb] text-lg font-medium flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaExternalLinkAlt className="mr-2" /> Portfolio
                        </a>

                        <a
                            href="mailto:kattamurimohankrishna.2004@gmail.com"
                            className="text-[#098dfb] hover:text-[#010309] dark:hover:text-[#f9fafb] text-lg font-medium flex items-center"
                        >
                            <FaEnvelope className="mr-2" /> Contact Me
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8">
                    <hr className="border-t border-gray-300 dark:border-gray-700" />
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Code4Fun. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
