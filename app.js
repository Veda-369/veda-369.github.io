
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
const pngs = Array.from({ length: 18 }, (_, i) => `png${i + 1}.png`);

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 3000);
    const photoInterval = setInterval(() => {
      setPhotoIndex(prev => (prev + 1) % photos.length);
    }, 4000);
    return () => {
      clearInterval(roleInterval);
      clearInterval(photoInterval);
    };
  }, []);

  return (
    <div className="px-4 max-w-6xl mx-auto">
      <section className="text-center mt-12">
        <h1 className="text-4xl name">Hi, I'm Veda Bharghav</h1>
        <h2 className="text-xl mt-2 text-blue-600">{roles[roleIndex]}</h2>
        <img src="images/hero.jpg" alt="Banner" className="hero-image" draggable="false" />
      </section>

      <section id="summary" className="mt-16 text-center fade-up">
        <h2 className="section-title">About Me</h2>
        <p className="max-w-3xl mx-auto">{summaryText}</p>
      </section>

      <div className="scroll-container">
        <div className="scroll-row">
          {pngs.concat(pngs).map((src, i) => (
            <img key={i} src={`images/${src}`} alt={`Tech ${i}`} draggable="false" />
          ))}
        </div>
      </div>

      <section id="techstack" className="mt-20 fade-up">
        <h2 className="section-title">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {Object.entries(techStack).map(([key, values]) => (
            <div key={key} className="bg-gray-100 p-4 rounded-lg shadow w-72">
              <h3 className="font-semibold text-lg mb-2">{key}</h3>
              <p>{values.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mt-20 fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="space-y-10 mt-10">
          {projects.map((project, idx) => (
            <div key={idx} className={`project-zigzag ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="content">
                <h3 className="text-xl font-bold text-blue-900">{project.title}</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  {project.details.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
              <div className="spacer"></div>
            </div>
          ))}
        </div>
      </section>

      <section id="photography" className="mt-20 fade-up text-center">
  <h2 className="section-title">Photography</h2>
  <p className="mb-2 italic text-gray-600">
    "Photography is the story I fail to put into words." – Destin Sparks
  </p>
  <p className="mb-6 text-gray-600">
    These wildlife photographs are captured by me during field explorations. All images © Veda Bharghav.
  </p>
  <img
    src={`images/${photos[photoIndex]}`}
    alt="Wildlife"
    className="photo-img mx-auto"
    draggable="false"
  />
</section>
        <h2 className="section-title">Photography</h2>
        <p className="mb-6">I capture moments in the wild. Here are a few of my favorite shots.</p>
        <img
          src={`images/${photos[photoIndex]}`}
          alt="Wildlife"
          className="photo-img mx-auto"
          draggable="false"
        />
      </section>

      <section id="contact" className="mt-20 fade-up text-center">
        <h2 className="section-title">Contact Me</h2>
        <form action="https://formspree.io/f/yourformid" method="POST" className="max-w-lg mx-auto space-y-4">
          <input type="text" name="name" placeholder="Name" className="w-full p-3 rounded bg-gray-100" required />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 rounded bg-gray-100" required />
          <input type="text" name="phone" placeholder="Contact Number" className="w-full p-3 rounded bg-gray-100" />
          <textarea name="message" placeholder="Message" className="w-full p-3 rounded bg-gray-100" rows="4"></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Send</button>
        </form>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
