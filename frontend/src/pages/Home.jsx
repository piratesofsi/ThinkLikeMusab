
import { posts } from "../data/Post";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center text-center min-h-screen bg-black text-white px-4 py-8 md:py-16 overflow-x-hidden">

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center py-16 md:py-32 max-w-4xl">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white animate-fadeUp">
                    ThinkLikeMusab
                </h1>

                <p className="text-gray-400 text-base md:text-lg lg:text-xl mb-4 max-w-2xl px-4">
                    Not just solutions. Learn how to think.
                </p>

                <p className="text-gray-500 mb-8 text-sm md:text-base">
                    From Confusion → Clarity → Code
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/" className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-sm md:text-base">
                        Explore Posts
                    </Link>

                    <Link to="/about" className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition text-sm md:text-base">
                        Start Learning
                    </Link>
                </div>

            </div>

            {/* Posts Section */}
            <div className="w-full max-w-4xl pb-16 px-4">

                <h2 className="text-lg md:text-xl text-gray-400 mb-6 text-center">
                    Recent Posts
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <div className="h-full text-center p-4 rounded-lg border border-gray-800 hover:border-gray-600 cursor-pointer hover:text-white text-gray-400 transition transform hover:-translate-y-1">
                                <h3 className="text-base md:text-lg font-medium mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm md:text-base">
                                    {post.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Home;