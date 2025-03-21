const { useState, useEffect } = React;

const roles = [
  "Data Analyst",
  "Data Engineer",
  "Wildlife Photographer",
  "AI Enthusiast"
];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold name">Hi, I'm Veda Bharghav</h1>
        <h2 className="text-2xl mt-4 text-blue-400 font-semibold transition-all duration-500">{roles[roleIndex]}</h2>
      </section>

      {/* Tech Stack */}
      <section id="techstack" className="max-w-4xl w-full py-12">
        <h2 className="section-title">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div>
            <h3 className="text-blue-300 text-xl font-bold mb-2">Programming</h3>
            <p>Python, SQL</p>
          </div>
          <div>
            <h3 className="text-blue-300 text-xl font-bold mb-2">Databases</h3>
            <p>MySQL, SQL Server, PostgreSQL, Snowflake</p>
          </div>
          <div>
            <h3 className="text-blue-300 text-xl font-bold mb-2">Visualization</h3>
            <p>Power BI, Tableau, JMP, Matplotlib, Seaborn</p>
          </div>
          <div>
            <h3 className="text-blue-300 text-xl font-bold mb-2">Statistical Analysis</h3>
            <p>Regression, Hypothesis Testing, Time-Series</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-blue-300 text-xl font-bold mb-2">Certifications</h3>
            <p>Azure AI Fundamentals, IBM Data Science, Statistics with Python</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl w-full py-12">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "AI-Driven Defect Detection & Analytics Dashboard",
              desc: `Automated breakage detection using Cognex Vision Pro. Built pipelines and Power BI dashboards for trend analysis.`
            },
            {
              title: "Inventory Burn Down Tracker",
              desc: `Power BI dashboard integrated with SQL to track module consumption and improve forecasting accuracy by 30%.`
            },
            {
              title: "Accelerometer Data Analytics Dashboard",
              desc: `Analyzed high-frequency accelerometer data using Python and visualized stress impact in Power BI.`
            },
            {
              title: "Retail Analytics Dashboard Development",
              desc: `Optimized data processing in Spark, built ML models and deployed Tableau dashboards for real-time insights.`
            },
            {
              title: "Flight Data Engineering: Real-Time API Integration",
              desc: `Built a pipeline to fetch, store, and visualize real-time global flight data using PostgreSQL, Python, Plotly.`
            }
          ].map((p) => (
            <div className="p-6 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-bold text-blue-400 mb-2">{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photography */}
      <section id="photography" className="max-w-4xl w-full py-12 text-center">
        <h2 className="section-title">Photography</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <img src="photo1.jpg" className="w-40 h-40 rounded shadow-md" />
          <img src="photo2.jpg" className="w-40 h-40 rounded shadow-md" />
          <img src="photo3.jpg" className="w-40 h-40 rounded shadow-md" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-md w-full py-12 text-center">
        <h2 className="section-title">Contact Me</h2>
        <form className="flex flex-col space-y-4 mt-6">
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
