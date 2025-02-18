// src/components/FloatingGraph.jsx
import React, { useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

// Define Nodes & Edges
const nodes = [
  { id: "home", name: "Home", icon: "🏠" },
  { id: "projects", name: "Projects", icon: "📁" },
  { id: "experience", name: "Experience", icon: "💼" },
  { id: "education", name: "Education", icon: "🎓" },
  { id: "research", name: "Research", icon: "🔬" }
];

const links = nodes.flatMap((source, i) =>
  nodes.slice(i + 1).map(target => ({ source: source.id, target: target.id }))
);

const graphData = { nodes, links };

export default function FloatingGraph() {
  const fgRef = useRef(null);
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!fgRef.current) return;

    // Spread nodes apart
    fgRef.current.d3Force("charge").strength(-700);

    // Set starting position to center
    setTimeout(() => {
      setOriginalPosition({
        x: fgRef.current.centerAt().x,
        y: fgRef.current.centerAt().y
      });
    }, 500);
  }, []);

  // Reset Graph Position to Center
  const resetPosition = () => {
    if (fgRef.current) {
      fgRef.current.centerAt(originalPosition.x, originalPosition.y, 1000);
    }
  };

  return (
    <div className="graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        backgroundColor="transparent"
        linkColor={() => "#00ffff"}
        enablePanInteraction={false} // Disable panning
        enableZoomInteraction={false} // Disable zooming
        linkWidth={2}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx) => {
          const isHover = node.id === originalPosition?.id;
          const r = isHover ? 22 : 18;

          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = "#444";
          ctx.fill();

          ctx.fillStyle = "#fff";
          ctx.font = `${isHover ? 14 : 16}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(isHover ? node.name : node.icon, node.x, node.y + 1);
        }}
        onNodeHover={(node) => {
          document.body.style.cursor = node ? "pointer" : "auto";
        }}
        onNodeClick={(node) => {
          const element = document.getElementById(node.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onEngineStop={resetPosition} // Auto reset after dragging
      />
    </div>
  );
}
