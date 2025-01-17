'use client';

import { useState } from 'react';

import { Link } from 'lucide-react';
import {
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaTiktok,
} from 'react-icons/fa6';

const SocialMediaLinks = [
    {
        icon: FaFacebook,
        username: 'Gina Experiences',
        href: 'https://www.facebook.com/ginaexperiences',
        color: 'ginaYellow',
    },
    {
        icon: FaInstagram,
        username: '@ginaexperiences',
        href: 'https://www.instagram.com/ginaexperiences/',
        color: 'ginaOrange',
    },
    {
        icon: FaTiktok,
        username: '@ginaexperiences',
        href: 'https://www.tiktok.com/@ginaexperiences',
        color: 'ginaGreen',
    },
    {
        icon: FaLinkedin,
        username: 'Gina Experiences',
        href: 'https://www.linkedin.com/company/ginaexperiences/',
        color: 'ginaBlue',
    },
];

const Contacts = [
    {
        icon: FaEnvelope,
        username: 'ginatravel.ph@gmail.com',
        href: 'mailto:ginatravel.ph@gmail.com?subject=Travel%20Inquiry&body=Hello%20Team',
        color: 'ginaYellow',
    },
    {
        icon: FaPhone,
        username: '+63 917 108 6757',
        href: 'tel:+63-917-108-6757',
        color: 'ginaOrange',
    },
];

export default function ContactLinks() {
    const [showNotification, setShowNotification] = useState(false);

    return (
        <div className="flex flex-col bg-ginaWhite lg:w-1/2 h-full shadow-lg lg:shadow-none items-start justify-center space-y-4 lg:rounded-3xl p-12 lg:p-8 md:p-24 mb-8">
            <span className="leading-none">
                Get in touch with
                <h1 className="text-3xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                    GINA EXPERIENCES
                </h1>{' '}
            </span>
            <p className="">
                Partner with Gina Experiences to create unforgettable
                adventures. Connect with us to explore collaboration
                opportunities and be part of our vibrant community.
            </p>
            <div className="lg:grid grid-cols-2 lg:space-x-8">
                <div className="flex flex-col space-y-2 mb-8">
                    <h2 className="font-bold text-xl my-2">Follow Us!</h2>
                    {SocialMediaLinks.map((link, index) => {
                        const IconComponent = link.icon;
                        const handleCopyLink = () => {
                            const copiedLink = link.username;
                            navigator.clipboard
                                .writeText(copiedLink)
                                .then(() => {
                                    setShowNotification(true);
                                    setTimeout(() => {
                                        setShowNotification(false);
                                    }, 3000);
                                });
                        };
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <a
                                    href={link.href}
                                    target="_blank"
                                    className={`flex items-center gap-3`}
                                >
                                    {IconComponent ? (
                                        <IconComponent
                                            size={40}
                                            className={`bg-${link.color} text-ginaWhite p-2 rounded-full`}
                                        />
                                    ) : (
                                        <span>Icon not found</span>
                                    )}
                                    <span className="font-medium text-xs lg:text-sm truncate">
                                        {link.username}
                                    </span>
                                </a>
                                <button onClick={handleCopyLink}>
                                    <Link
                                        className={`text-${link.color}`}
                                    ></Link>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="font-bold text-xl my-2">Contact Us!</h2>
                    {Contacts.map((link, index) => {
                        const IconComponent = link.icon;
                        const handleCopyLink = () => {
                            const copiedLink = link.username;
                            navigator.clipboard
                                .writeText(copiedLink)
                                .then(() => {
                                    setShowNotification(true);
                                    setTimeout(() => {
                                        setShowNotification(false);
                                    }, 3000);
                                });
                        };
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <a
                                    href={link.href}
                                    target="_blank"
                                    className={`flex items-center gap-3 truncate`}
                                >
                                    {IconComponent ? (
                                        <IconComponent
                                            size={40}
                                            className={`bg-${link.color} text-ginaWhite p-2 rounded-full`}
                                        />
                                    ) : (
                                        <span>Icon not found</span>
                                    )}
                                    <span className="font-medium text-xs lg:text-sm truncate">
                                        {link.username}
                                    </span>
                                </a>
                                <button onClick={handleCopyLink}>
                                    <Link
                                        className={`text-${link.color}`}
                                    ></Link>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
