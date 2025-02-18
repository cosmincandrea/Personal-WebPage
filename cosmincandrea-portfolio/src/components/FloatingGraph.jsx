import React, { useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const nodes = [
  { id: "projects", name: "Projects", icon: "📁" },
  { id: "experience", name: "Experience", icon: "💼" },
  { id: "education", name: "Education", icon: "🎓" },
  { id: "research", name: "Research", icon: "🔬" }
];

const links = [
  { source: "research", target: "projects" },
  { source: "education", target: "projects" },
  { source: "projects", target: "experience" },
  { source: "education", target: "research" }
];

const graphData = { nodes, links };

export default function FloatingGraph() {
  const fgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [nodePositions, setNodePositions] = useState({});

  useEffect(() => {
    if (!fgRef.current) return;
    fgRef.current.d3Force("charge").strength(-1000);

    const initialPositions = {};
    graphData.nodes.forEach((node) => {
      initialPositions[node.id] = {
        x: node.x || Math.random() * 300,
        y: node.y || Math.random() * 300,
        offsetX: 0,
        offsetY: 0
      };
    });

    setNodePositions(initialPositions);

    // Floating effect
    const interval = setInterval(() => {
      setNodePositions((prevPositions) => {
        const updatedPositions = { ...prevPositions };
        Object.keys(updatedPositions).forEach((id) => {
          updatedPositions[id].offsetX = Math.sin(Date.now() * 0.001 + id.length) * 3;
          updatedPositions[id].offsetY = Math.cos(Date.now() * 0.001 + id.length) * 3;
        });
        return updatedPositions;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        backgroundColor="transparent"
        linkColor={() => "#00ff00"} // Neon Green Links
        enablePanInteraction={false}
        enableZoomInteraction={false}
        linkWidth={1.5}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx) => {
          const isHovered = hoveredNode?.id === node.id;
          const screenFactor = window.innerWidth < 768 ? 0.25 : 0.45; // Adjust size for responsiveness
          const r = isHovered ? 50 * screenFactor : 30 * screenFactor;
          const posX = node.x + (nodePositions[node.id]?.offsetX || 0);
          const posY = node.y + (nodePositions[node.id]?.offsetY || 0);

          ctx.fillStyle = "black"; // Black Node Background
          ctx.strokeStyle = "#00ff00"; // Neon Green Border
          ctx.lineWidth = 1.5;
          ctx.font = `${isHovered ? "14px" : "12px"} sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          if (isHovered) {
            // Animated transition to rectangle
            ctx.beginPath();
            ctx.roundRect(posX - 35, posY - 12, 70, 24, 10);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#fff";
            ctx.fillText(node.name, posX, posY);
          } else {
            // Regular Circle
            ctx.beginPath();
            ctx.arc(posX, posY, r, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();

            // Render the icon inside
            ctx.fillStyle = "#fff";
            ctx.fillText(node.icon, posX, posY);
          }
        }}
        onNodeHover={(node) => {
          setHoveredNode(node || null);
          document.body.style.cursor = node ? "pointer" : "auto";
        }}
        onNodeClick={(node) => {
          const element = document.getElementById(node.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}
