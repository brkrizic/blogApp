
export default function Comments() {
return (
  <div className="mt-4 border-t pt-4">
    <h4 className="text-md font-semibold mb-2">2 Comments</h4>
        {/* Add comment input */}
    <form className="mt-3 flex gap-2" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
    <ul className="space-y-2">
      <li className="bg-gray-50 p-2 rounded">
        <p className="text-sm">
          <span className="font-semibold">Alice:</span> Great post! Really clarified things.
        </p>
      </li>
      <li className="bg-gray-50 p-2 rounded">
        <p className="text-sm">
          <span className="font-semibold">Bob:</span> Thanks for sharing!
        </p>
      </li>
    </ul>
  </div>
);

}
