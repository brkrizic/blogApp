

const AboutPage = () => {
    return(
        <div className="container mx-auto px-4 py-12 max-w-3xl text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">About Us</h1>
    
            <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg mb-4">
                Welcome to <span className="font-semibold">MyBlog</span> — a platform for developers, designers, and creators to share their thoughts, tutorials, and stories with the world.
            </p>
    
            <p className="mb-4">
                This blog was created with React, TypeScript, Tailwind CSS, and Vite to demonstrate modern web development practices. Whether you're here to learn, share, or get inspired — you're in the right place.
            </p>
    
            <p className="mb-4">
                Our mission is to make blogging simple, fast, and beautiful. We believe in clean code, open learning, and building in public.
            </p>
    
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>👩‍💻 Jane Doe – Frontend Engineer & Creator</li>
                <li>🎨 John Smith – UI/UX Designer</li>
                <li>🧠 You – Our awesome community</li>
                </ul>
            </div>
            </div>
        </div>
    );
}
export default AboutPage;