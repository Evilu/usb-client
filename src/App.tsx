import React from 'react';

import './App.css';
import Tree from '@naisutech/react-tree'

const data = [
    {
        "id": 12345678,
        "parentId": null,
        "label": "My parent node",
        "items": [
            {
                "id": 87654321,
                "label": "My file",
                "parentId": 12345678
            }
        ]
    },
    {
        "id": 56789012,
        "parentId": 12345678,
        "label": "My child node"
    }
]

    function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Tree nodes={data}  />
      </header>
    </div>
  );
}

export default App;
