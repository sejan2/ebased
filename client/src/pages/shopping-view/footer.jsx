import { Button } from "@/components/ui/button";
import React from "react";

const Footer = () => {
    return (
        <footer className="py-8 mt-12 bg-gray-300 shadow-lg">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Company</h3>
                        <ul>
                            <li><a href="#" className="hover:text-blue-500">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-500">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-500">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-500">Contact</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Customer Service</h3>
                        <ul>
                            <li><a href="#" className="hover:text-blue-500">FAQs</a></li>
                            <li><a href="#" className="hover:text-blue-500">Returns</a></li>
                            <li><a href="#" className="hover:text-blue-500">Shipping</a></li>
                            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Connect with Us</h3>
                        <ul>
                            <li><a href="#" className="hover:text-blue-500">Facebook</a></li>
                            <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
                            <li><a href="#" className="hover:text-blue-500">Twitter</a></li>
                            <li><a href="#" className="hover:text-blue-500">LinkedIn</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Newsletter</h3>
                        <p>Sign up for our newsletter to get the latest updates.</p>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </div>
            <div className="py-4 text-center text-gray-500">
                &copy; 2024 Your Company. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;