const { useState, useEffect } = React;

const roles = ["Data Analyst", "Data Engineer", "Wildlife Photographer", "AI Enthusiast"];

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
      <header className="fixed top-0 w-full bg-[#2d2d2d] p-4 flex justify-between items-center z-50 shadow-md">
        <h1 className="text-xl font-bold text-[#fefefe]">Portfolio</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl">&#9776;</button>
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-[#444] p-4 rounded shadow-md space-y-2 z-50">
            <a href="#techstack" className="block text-white hover:text-yellow-300">Tech Stack</a>
            <a href="#projects" className="block text-white hover:text-yellow-300">Projects</a>
            <a href="#photography" className="block text-white hover:text-yellow-300">Photography</a>
            <a href="#contact" className="block text-white hover:text-yellow-300">Contact</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center pt-20">
        <h1 className="text-5xl font-bold name">Hi, I'm Veda Bharghav</h1>
        <h2 className="text-2xl mt-4 text-gray-800 font-semibold">{roles[roleIndex]}</h2>
      </section>

      {/* Tech Stack */}
      <section id="techstack" className="max-w-5xl w-full py-12">
        <h2 className="section-title">Tech Stack</h2>
        <div className="step-container">
          {[
            ["Programming", "SQL, Python"],
            ["Databases", "MySQL, SQL Server, PostgreSQL, Snowflake"],
            ["Visualization", "Power BI, Tableau, JMP, Matplotlib, Seaborn"],
            ["Statistical Analysis", "Regression, Hypothesis Testing, Time-Series"],
            ["Certifications", "Azure AI Fundamentals, IBM Data Science, Statistics with Python"]
          ].map(([title, desc], i) => (
            <div className="step" key={i}>
              <div className="step-content">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl w-full py-12">
        <h2 className="section-title">Projects</h2>
        <div className="step-container">
          {[
            ["AI-Driven Defect Detection", "Automated breakage detection using Cognex Vision Pro. Integrated Power BI dashboards for root-cause analysis."],
            ["Inventory Burn Down Tracker", "Real-time Power BI + SQL dashboard for tracking module consumption. Improved forecasting by 30%."],
            ["Accelerometer Data Analytics", "Python-powered sensor analysis. Identified failure thresholds and visualized impact forces in Power BI."],
            ["Retail Analytics Dashboard", "Spark-based pipeline with ML forecasting. Tableau dashboards integrated with Azure SQL."],
            ["Flight Data Engineering", "Live flight data via API → PostgreSQL → Plotly dashboard. Global traffic insights delivered in real-time."]
          ].map(([title, desc], i) => (
            <div className="step" key={i}>
              <div className="step-content">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photography */}
      <section id="photography" className="max-w-4xl w-full py-12 text-center">
        <h2 className="section-title">Photography</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <img src="photo1.jpg" className="w-40 h-40 object-cover rounded shadow-md" />
          <img src="photo2.jpg" className="w-40 h-40 object-cover rounded shadow-md" />
          <img src="photo3.jpg" className="w-40 h-40 object-cover rounded shadow-md" />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-md w-full py-12 text-center">
        <h2 className="section-title">Contact Me</h2>
        <form className="flex flex-col space-y-4 mt-6 px-2">
          <input type="text" placeholder="Name" className="p-3 rounded bg-white text-black" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-white text-black" />
          <input type="tel" placeholder="Contact Number" className="p-3 rounded bg-white text-black" />
          <textarea placeholder="Message" rows="4" className="p-3 rounded bg-white text-black"></textarea>
          <button className="bg-[#00bfa6] py-3 rounded text-white font-bold hover:bg-[#01998b] transition">Send</button>
        </form>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
