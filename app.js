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
