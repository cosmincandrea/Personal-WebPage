import React, { useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

// Define Nodes & Edges
const nodes = [
  { id: "projects", name: "Projects", icon: "📁" },
  { id: "experience", name: "Experience", icon: "💼" },
  { id: "education", name: "Education", icon: "🎓" },
  { id: "research", name: "Research", icon: "🔬" }
];

var links;

links = [
  { source: "research", target: "projects" },
  { source: "education", target: "projects" },
  { source: "projects", target: "experience"},
  { source: "education", target: "research" }
]

const graphData = { nodes, links };

export default function FloatingGraph() {
  const fgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    if (!fgRef.current) return;

    fgRef.current.d3Force("charge").strength(-500);
  }, []);

  return (
    <div className="graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        backgroundColor="transparent"
        linkColor={() => "#00ffff"}
        enablePanInteraction={false} // No manual panning
        enableZoomInteraction={false} // No zooming
       // enableNodeDrag={false} // Nodes stay fixed
        linkWidth={2}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx) => {
          const isHovered = hoveredNode?.id === node.id;
          const r = isHovered ? 22 : 18; // Proportional size

          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = isHovered ? "#555" : "#444"; // Darker on hover
          ctx.fill();

          ctx.fillStyle = "#fff";
          ctx.font = `${isHovered ? "1.2vw" : "1vw"} sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(isHovered ? node.name : node.icon, node.x, node.y + 1);
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
