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

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4">
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold name">Hi, I'm Veda Bharghav</h1>
        <h2 className="text-2xl mt-4 text-gray-700 font-semibold">{roles[roleIndex]}</h2>
      </section>

      <section id="summary" className="py-10 text-center fade-up">
        <h2 className="section-title">About Me</h2>
        <p className="max-w-3xl mx-auto text-lg letter-reveal text-gray-700">
          {summaryText}
        </p>
      </section>

      <section id="techstack" className="py-12 fade-up">
        <h2 className="section-title">Tech Stack</h2>
        <img src="techstack.jpg" alt="Tech Stack" className="mx-auto mb-8 w-32" />
        <div className="flex flex-wrap justify-center gap-6">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="text-center">
              <h3 className="text-lg font-bold mb-2">{category}</h3>
              <div>
                {items.map(item => (
                  <span className="tech-pill" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-12 fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <div key={i} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {project.details.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="photography" className="py-12 text-center fade-up">
        <h2 className="section-title">Photography</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-700">
          Wildlife photography captures raw beauty, emotion, and the untamed wonders of nature. Here's a glimpse of my lens at work:
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {photos.map((src, i) => (
            <img key={i} src={src} alt={`Photo ${i + 1}`} className="photo-img" />
          ))}
        </div>
      </section>

      <section id="contact" className="py-12 text-center fade-up">
        <h2 className="section-title">Contact Me</h2>
        <form className="max-w-md mx-auto flex flex-col gap-4 mt-6">
          <input type="text" placeholder="Name" className="p-3 rounded bg-white border border-gray-300" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-white border border-gray-300" />
          <input type="tel" placeholder="Contact Number" className="p-3 rounded bg-white border border-gray-300" />
          <textarea rows="4" placeholder="Message" className="p-3 rounded bg-white border border-gray-300" />
          <button className="bg-[#00bfa6] text-white py-3 rounded font-bold hover:bg-[#01998b] transition">Send</button>
        </form>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
