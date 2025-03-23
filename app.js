
const { useState, useEffect } = React;

const roles = ["Data Analyst", "Data Engineer", "Wildlife Photographer", "AI Enthusiast"];

const summaryText = "Data Analyst with expertise in data visualization, statistical analysis, and predictive modeling. Skilled in automation, real-time analytics, and data-driven decision-making across tools like SQL, Power BI, Snowflake, and Python.";

const techStack = {
  Programming: ["SQL", "Python"],
  Databases: ["MySQL", "SQL Server", "PostgreSQL", "Snowflake"],
  Visualization: ["Power BI", "Tableau", "JMP", "Matplotlib", "Seaborn"],
  "Statistical Analysis": ["Regression", "Hypothesis Testing", "Time-Series"],
  Certifications: ["Azure AI Fundamentals", "IBM Data Science", "Statistics with Python"]
};

const projects = [
  {
    title: "AI-Driven Defect Detection & Analytics Dashboard",
    details: [
      "Engineered an AI-powered defect detection system using Cognex Vision Pro.",
      "Automated breakage identification and measurement recording.",
      "Developed interactive Power BI dashboards for trend analysis."
    ]
  },
  {
    title: "Inventory Burn Down Tracker",
    details: [
      "Created real-time Power BI dashboards integrated with SQL inventory data.",
      "Improved forecast accuracy by 30% through predictive modeling.",
      "Reduced waste by 40% by tracking test authorizations and asset usage."
    ]
  },
  {
    title: "Accelerometer Data Analytics",
    details: [
      "Processed high-frequency sensor data with Python for stress analysis.",
      "Built Power BI dashboards to visualize impact forces and durability.",
      "Identified critical failure thresholds and packaging optimizations."
    ]
  },
  {
    title: "Retail Analytics Dashboard",
    details: [
      "Optimized Spark jobs on Databricks for retail demand forecasting.",
      "Implemented ML models (Random Forest, Time-Series) for accuracy.",
      "Built Tableau dashboards with Azure SQL integration for insights."
    ]
  },
  {
    title: "Flight Data Engineering",
    details: [
      "Built a pipeline to fetch live flight data via OpenSky API.",
      "Stored in PostgreSQL and visualized with Plotly and Matplotlib.",
      "Analyzed flight patterns, delays, and air traffic trends."
    ]
  }
];

const photos = ["photo1.jpg", "photo2.jpg", "photo3.jpg"];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [revealed, setRevealed] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chars = summaryText.split("");
    chars.forEach((_, i) => {
      setTimeout(() => {
        setRevealed((prev) => [...prev, i]);
      }, 30 * i);
    });
  }, []);

  useEffect(() => {
    const slideshow = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(slideshow);
  }, []);

  return (
    <div>
      <section id="home" className="text-center mt-32">
        <h1 className="name text-4xl sm:text-5xl mb-2">Hi, I'm Veda Bharghav</h1>
        <h2 className="text-xl text-blue-700 font-semibold mb-6">{roles[roleIndex]}</h2>
        <img src="images/banner.jpeg" alt="Banner" className="mx-auto w-full max-w-screen-xl rounded-xl mb-6" />
      </section>

      <section id="about" className="text-center mb-12">
        <h2 className="section-title">About Me</h2>
        <p className="letter-reveal max-w-4xl mx-auto text-lg">
          {summaryText.split("").map((char, i) => (
            <span key={i} className={revealed.includes(i) ? "visible" : ""}>
              {char}
            </span>
          ))}
        </p>
      </section>

      <section id="techstack" className="text-center py-10 fade-up">
        <h2 className="section-title">Tech Stack</h2>
        <div className="flex flex-wrap justify-center items-start gap-4 max-w-5xl mx-auto">
          {Object.entries(techStack).map(([title, items]) => (
            <div key={title} className="bg-slate-800 text-white px-6 py-4 rounded-lg w-72 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-blue-200">{title}</h3>
              <p className="text-sm">{items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="text-center py-10 fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="flex flex-col gap-10 items-center max-w-6xl mx-auto px-4">
          {projects.map((project, index) => (
            <div key={index} className={\`bg-white border border-gray-300 p-6 shadow-md rounded-xl w-full sm:w-5/6 md:w-3/4 lg:w-2/3 text-left transition transform hover:scale-[1.01] \${index % 2 === 0 ? "self-start" : "self-end"}\`}>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{project.title}</h3>
              <ul className="list-disc list-inside text-gray-700">
                {project.details.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="photography" className="text-center py-10 fade-up">
        <h2 className="section-title">Photography</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Wildlife photography captures the raw beauty of nature in motion. Here are a few of my best shots.
        </p>
        <div className="mx-auto w-full max-w-md relative h-[300px]">
          <img
            src={\`images/\${photos[currentPhoto]}\`}
            alt="Slideshow"
            className="w-full h-full object-cover rounded-xl transition-opacity duration-700 ease-in-out"
            style={{ opacity: 1 }}
          />
        </div>
      </section>

      <section id="contact" className="text-center py-10 fade-up">
        <h2 className="section-title">Contact Me</h2>
        <form className="max-w-xl mx-auto flex flex-col gap-4">
          <input type="text" placeholder="Name" className="p-3 rounded-md border" required />
          <input type="email" placeholder="Email" className="p-3 rounded-md border" required />
          <input type="text" placeholder="Contact Number" className="p-3 rounded-md border" />
          <textarea placeholder="Message" rows="4" className="p-3 rounded-md border" required></textarea>
          <button className="bg-blue-700 text-white font-bold py-2 rounded-md hover:bg-blue-900 transition">Send</button>
        </form>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
