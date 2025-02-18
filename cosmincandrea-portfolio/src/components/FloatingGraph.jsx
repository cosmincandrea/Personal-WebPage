// src/components/FloatingGraph.jsx
import React, { useRef } from "react";
import "../styles/FloatingGraph.css";
import ForceGraph2D from "react-force-graph-2d";


const nodes = [
    { id: 0, name: "Home",       icon: "🏠", top: "20%", left: "25%" },
    { id: 1, name: "Projects",   icon: "📁", top: "60%", left: "30%" },
    { id: 2, name: "Experience", icon: "💼", top: "50%", left: "50%" },
    { id: 3, name: "Education",  icon: "🎓", top: "30%", left: "70%" },
    { id: 4, name: "Research",   icon: "🔬", top: "70%", left: "70%" },
  ];
  
  const edges = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
  ];
  
  /** Node diameter in CSS = 40px, so radius = 20. */
  const NODE_RADIUS = 20;
  
  function FloatingGraph() {
    const containerRef = useRef(null);
  
    // Convert a node's top/left (%) into actual x/y in the <svg> coordinate space
    const getNodeCenter = (node) => {
      const container = containerRef.current;
      if (!container) return { x: 0, y: 0 };
  
      const w = container.clientWidth;
      const h = container.clientHeight;
  
      const topVal = parseFloat(node.top) / 100;   // e.g. 0.20 for "20%"
      const leftVal = parseFloat(node.left) / 100; // e.g. 0.25 for "25%"
  
      return {
        x: leftVal * w + NODE_RADIUS,
        y: topVal * h + NODE_RADIUS,
      };
    };
  
    return (
      <div className="floating-graph-container" ref={containerRef}>
        {/* The SVG for the lines */}
        <svg className="graph-lines">
          {edges.map((edge, i) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;
  
            const { x: x1, y: y1 } = getNodeCenter(fromNode);
            const { x: x2, y: y2 } = getNodeCenter(toNode);
  
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
  
        {/* The nodes themselves */}
        {nodes.map((node) => (
          <a
            key={node.id}
            href={`#${node.name.toLowerCase()}`}
            className="graph-node"
            style={{ top: node.top, left: node.left }}
          >
            <span className="node-icon" role="img" aria-label={node.name}>
              {node.icon}
            </span>
            <span className="node-label">{node.name}</span>
          </a>
        ))}
      </div>
    );
  }

  export default FloatingGraph;