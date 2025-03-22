const { useState, useEffect } = React;

const roles = [
  "Data Analyst",
  "Data Engineer",
  "Wildlife Photographer",
  "AI Enthusiast"
];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center px-4">

      {/* Navbar */}
      <header className="fixed top-0 w-full bg-gray-900 p-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="text-xl font-bold text-blue-300">Portfolio</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl">&#9776;</button>
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-gray-700 p-4 rounded shadow-md space-y-2 z-50">
            <a href="#techstack" className="block hover:text-blue-400">Tech Stack</a>
            <a href="#projects" className="block hover:text-blue-400">Projects</a>
            <a href="#photography" className="block hover:text-blue-400">Photography</a>
            <a href="#contact" className="block hover:text-blue-400">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center pt-20">
        <h1 className="text-5xl font-bold name">Hi, I'm Veda Bharghav</h1>
        <h2 className="text-2xl mt-4 text-blue-400 font-semibold">{roles[roleIndex]}</h2>
      </section>

      {/* Tech Stack */}
      <section id="techstack" className="max-w-5xl w-full py-12 text-center">
        <h2 className="section-title">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {[
            { title: "Programming", desc: "SQL, Python" },
            { title: "Databases", desc: "MySQL, SQL Server, PostgreSQL, Snowflake" },
            { title: "Visualization", desc: "Power BI, Tableau, JMP, Matplotlib, Seaborn" },
            { title: "Statistical Analysis", desc: "Regression, Hypothesis Testing, Time-Series" },
            { title: "Certifications", desc: "Azure AI Fundamentals, IBM Data Science, Statistics with Python" }
          ].map((item, idx) => (
            <div className="bg-gray-700 p-4 rounded-lg card-hover" style={{ animationDelay: `${idx * 0.3}s` }}>
              <h3 className="text-blue-300 font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl w-full py-12">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {[
            {
              title: "AI-Driven Defect Detection",
              desc: `Used Cognex Vision Pro for breakage identification. Power BI dashboards.`
            },
            {
              title: "Inventory Burn Down Tracker",
              desc: `Real-time Power BI + SQL dashboard. Improved forecasting and reduced waste.`
            },
            {
              title: "Accelerometer Analytics",
              desc: `Processed sensor data in Python. Visualized results in Power BI.`
            },
            {
              title: "Retail Analytics Dashboard",
              desc: `Spark + ML for forecasting. Tableau dashboards integrated with Azure.`
            },
            {
              title: "Flight Data Engineering",
              desc: `Fetched live flight data via API. Stored in PostgreSQL. Visualized in Plotly.`
            }
          ].map((proj, idx) => (
            <div className="bg-gray-700 p-4 rounded-lg card-hover" style={{ animationDelay: `${idx * 0.3}s` }}>
              <h3 className="text-blue-300 font-bold mb-2">{proj.title}</h3>
              <p>{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photography */}
      <section id="photography" className="max-w-4xl w-full py-12 text-center">
        <h2 className="section-title">Photography</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <img src="images/photo1.jpg" className="w-40 h-40 object-cover rounded shadow-md" />
          <img src="images/photo2.jpg" className="w-40 h-40 object-cover rounded shadow-md" />
          <img src="images/photo3.jpg" className="w-40 h-40 object-cover rounded shadow-md" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-md w-full py-12 text-center">
        <h2 className="section-title">Contact Me</h2>
        <form className="flex flex-col space-y-4 mt-6 px-2">
          <input type="text" placeholder="Name" className="p-3 rounded bg-gray-700 text-white" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-gray-700 text-white" />
          <input type="tel" placeholder="Contact Number" className="p-3 rounded bg-gray-700 text-white" />
          <textarea placeholder="Message" rows="4" className="p-3 rounded bg-gray-700 text-white"></textarea>
          <button className="bg-blue-600 py-3 rounded text-white font-bold hover:bg-blue-700 transition">Send</button>
        </form>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
