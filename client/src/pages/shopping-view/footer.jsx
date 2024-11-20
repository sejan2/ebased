import React from "react";
import img1 from "../../assets/m.jpg";
import img2 from "../../assets/v.png";
import img3 from "../../assets/i.jpg";
import { BsTelephoneFill } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="py-8 border-t border-gray-300 bg-gray-50">
            <div className="container px-4 mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-2 gap-2 mb-6 mx-11 md:grid-cols-5">
                    {/* Categories */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Categories</h3>
                        <ul className="space-y-1">
                            {["Men", "Women", "Kids", "Voucher"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-600 transition-colors duration-300 hover:text-gray-900"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Accounts */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Accounts</h3>
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 transition-colors duration-300 hover:text-gray-900"
                                >
                                    My Account
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Quick Links</h3>
                        <ul className="space-y-1">
                            {[
                                "Store Location",
                                "Shipping & Returns",
                                "Privacy Policy",
                                "Terms & Conditions",
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-gray-600 transition-colors duration-300 hover:text-gray-900"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Support</h3>
                        <p className="mb-2 text-gray-600">
                            <strong>Hours:</strong> 10:00 am - 7:00 pm
                            <p>(Except Friday & Public Holiday)</p>
                        </p>
                        <p className="flex items-center space-x-2 text-gray-600">
                            <BsTelephoneFill />
                            <span>+880 1788999000</span>
                        </p>
                        <p className="flex items-center space-x-2 text-gray-600">
                            <BsTelephoneFill />
                            <span>+880 1982333111</span>
                        </p>
                    </div>

                    {/* Office Address */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-800">Office Address</h3>
                        <address className="mb-2 text-gray-600">


                            <p>Ahmed Tower (9th Floor), 28 & 30,</p>                            <p> Kamal Ataturk Avenue, Banani C/A, Dhaka-1213</p>
                        </address>
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:ecommerce@sgmail.com"
                                className="text-gray-600 transition-colors duration-300 hover:text-gray-900"
                            >
                                ecommerce@sgmail.com
                            </a>
                        </p>
                        <p>Phone: +8802 2222 74913-4</p>
                        <p>Fax: +02-9820913</p>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="my-6 border-gray-300" />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Footer Text */}
                    <p className="text-sm text-center text-gray-500">
                        © E-commerce. All rights reserved. Maintenance by Seejan.
                    </p>

                    {/* Payment Icons */}
                    <div className="flex items-center justify-center space-x-4">
                        {[img1, img2, img3, img2, img1].map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt="Payment Method"
                                className="w-10 h-auto transition-transform duration-300 hover:scale-105"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
