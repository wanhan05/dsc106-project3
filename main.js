// main.js — start here, build up gradually

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 60 };

// Create SVG
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create tooltip div
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip");

// Load data — put a test CSV in data/ folder first
d3.csv("data/global_temp.csv").then(data => {

  // Parse
  data.forEach(d => {
    d.year = +d.year;
    d.tas  = +d.tas;
  });

  console.log("Data loaded!", data.slice(0, 3)); // sanity check

  // Scales
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.tas))
    .range([height - margin.bottom, margin.top]);

  // Axes
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));

  // Line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(d => x(d.year))
      .y(d => y(d.tas))
    );

}).catch(err => console.error("Data failed to load:", err));