import { useEffect } from "react";

export const UserProfilePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

return (
  <div className="max-w-4xl mx-auto px-4 py-8">
    {/* User Header */}
    <div className="flex items-center gap-6 border-b pb-6 mb-6">
      <img
        src="/images/avatars/sample-user.jpg"
        alt="Bruno Krizic"
        className="w-24 h-24 rounded-full border shadow"
      />
      <div>
        <h1 className="text-2xl font-bold">Bruno Krizic</h1>
        <p className="text-gray-500">@brkrizic3</p>
        <p className="mt-2 text-gray-700">Full-stack developer, writer, tech enthusiast.</p>
      </div>
    </div>

    {/* User Posts */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Posts by Bruno</h2>
      <div className="grid gap-4">
        <div className="p-4 border rounded hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Understanding React Context</h3>
          <p className="text-gray-600 mt-1">
            A deep dive into React's Context API and how to manage global state.
          </p>
          <p className="text-sm text-gray-400 mt-2">Posted on 2025-06-01</p>
        </div>

        <div className="p-4 border rounded hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Getting Started with Spring Boot</h3>
          <p className="text-gray-600 mt-1">
            Learn how to build REST APIs using Spring Boot in this beginner-friendly guide.
          </p>
          <p className="text-sm text-gray-400 mt-2">Posted on 2025-05-20</p>
        </div>

        <div className="p-4 border rounded hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Deploying Full Stack Apps</h3>
          <p className="text-gray-600 mt-1">
            Strategies and tools for deploying React + Spring Boot apps to production.
          </p>
          <p className="text-sm text-gray-400 mt-2">Posted on 2025-05-10</p>
        </div>
      </div>
    </div>
  </div>
);

}

export default UserProfilePage;
