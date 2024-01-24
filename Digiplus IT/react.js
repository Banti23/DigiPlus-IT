import React, { useState } from 'react';

function Node({ node, onAddChild, onAddParent }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChildren = () => setIsOpen(!isOpen);

  return (
    <li>
      <span className="node" onClick={toggleChildren}>
        {node.text}
      </span>
      {isOpen && (
        <ul>
          {node.children.map((child) => (
            <Node key={child.id} node={child} onAddChild={onAddChild} onAddParent={onAddParent} />
          ))}
          <button onClick={() => onAddChild(node)}>Add Child</button>
          {node.parentNode && <button onClick={() => onAddParent(node)}>Add Parent</button>}
        </ul>
      )}
    </li>
  );
}

function App() {
  const [data, setData] = useState({
    id: 1,
    text: 'Root Node',
    children: [],
  });

  const addChild = (parentNode) => {
    const newNode = {
      id: Math.random(),
      text: 'New Node',
      children: [],
      parentNode,
    };
    setData((prevState) => {
      const newChildren = [...prevState.children, newNode];
      if (parentNode) {
        const parentIndex = prevState.children.indexOf(parentNode);
        newChildren[parentIndex].children.push(newNode);
      }
      return { ...prevState, children: newChildren };
    });
  };

  const addParent = (node) => {
    const parentNode = {
      id: Math.random(),
      text: 'New Parent',
      children: [node],
    };
    setData((prevState) => {
      if (node.parentNode) {
        const parentIndex = prevState.children.indexOf(node.parentNode);
        prevState.children[parentIndex].children.splice(
          prevState.children[parentIndex].children.indexOf(node),
          1,
          parentNode
        );
        node.parentNode = parentNode;
      } else {
        return parentNode;
      }
      return prevState;
    });
  };

  return (
    <div className="App">
      <h1>Hierarchical Tree Formation</h1>
      <ul>
        <Node key={data.id} node={data} onAddChild={addChild} onAddParent={addParent} />
      </ul>
    </div>
  );
}

export default App;