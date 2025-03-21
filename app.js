const { useState, useEffect } = React;

// Roles for Animation
const roles = ["Data Analyst", "Data Engineer", "Wildlife Photographer", "AI Enthusiast"];

function App() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* Hamburger Menu */}
            <nav className="fixed top-0 w-full bg-gray-900 p-4 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold">Veda Bharghav</h1>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">&#9776;</button>
                {menuOpen && (
                    <div className="absolute top-12 right-4 bg-gray-700 p-4 rounded shadow-lg text-white space-y-2">
                        <a href="#techstack" className="block">Tech Stack</a>
                        <a href="#photography" className="block">Photography</a>
                        <a href="#contact" className="block">Contact</a>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="h-screen flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl font-bold text-blue-400">
                    Hi, I'm <span className="text-yellow-400">Veda Bharghav</span>
                </h1>
                <h2 key={roleIndex} className="text-3xl mt-4 text-yellow-500 font-semibold">
                    {roles[roleIndex]}
                </h2>
            </div>

            {/* Sections */}
            <div id="techstack"><TechStack /></div>
            <div id="photography"><Photography /></div>
            <div id="contact"><Contact /></div>
        </div>
    );
}

// Tech Stack Section
function TechStack() {
    return (
        <div className="section">
            <h2 className="text-4xl font-bold text-blue-400">Tech Stack</h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 bg-gray-700 rounded-lg">SQL</div>
                <div className="p-4 bg-gray-700 rounded-lg">Python</div>
                <div className="p-4 bg-gray-700 rounded-lg">Power BI</div>
                <div className="p-4 bg-gray-700 rounded-lg">Tableau</div>
            </div>
        </div>
    );
}

// Photography Section
function Photography() {
    return (
        <div className="section">
            <h2 className="text-4xl font-bold text-blue-400">Photography</h2>
            <div className="mt-6 flex justify-center gap-4">
                <img src="photo1.jpg" alt="Wildlife 1" className="w-40 h-40 rounded-lg shadow-md" />
                <img src="photo2.jpg" alt="Wildlife 2" className="w-40 h-40 rounded-lg shadow-md" />
                <img src="photo3.jpg" alt="Wildlife 3" className="w-40 h-40 rounded-lg shadow-md" />
            </div>
        </div>
    );
}

// Contact Section
function Contact() {
    return (
        <div className="section">
            <h2 className="text-4xl font-bold text-blue-400">Contact Me</h2>
            <form className="mt-6 flex flex-col items-center">
                <input type="text" placeholder="Your Name" className="p-3 rounded-md bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-400 mb-3" />
                <input type="email" placeholder="Your Email" className="p-3 rounded-md bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-400 mb-3" />
                <input type="text" placeholder="Your Contact Number" className="p-3 rounded-md bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-400 mb-3" />
                <textarea placeholder="Your Message" className="p-3 rounded-md bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-400 mb-3" rows="4"></textarea>
                <button className="px-6 py-3 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-600 transition">Send</button>
            </form>
        </div>
    );
}

// Render the React App
ReactDOM.render(<App />, document.getElementById("root"));
