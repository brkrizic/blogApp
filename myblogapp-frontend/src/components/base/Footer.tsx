

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-10">
            <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm">
                &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
            </p>
    
            {/* Footer Links */}
            <div className="flex space-x-4 text-sm">
                <a href="/privacy" className="hover:text-blue-500 transition">
                Privacy Policy
                </a>
                <a href="/contact" className="hover:text-blue-500 transition">
                Contact
                </a>
            </div>
            </div>
        </footer>
    );
}
export default Footer;