import React,{useState, useEffect} from 'react';

import './App.css';
import Tree, { NodeList } from '@naisutech/react-tree'
import io from 'socket.io-client'


const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });





    function App() {
        let data: { id: number, parentId: any, label:string }[] = [];
        useEffect(()=> {
            socket.on('tree', (tree)=>{
                    data.length = 0;
                    data.push(...tree)
            }
            );
        });
  return (
    <div className="App">
      <header className="App-header">

        <Tree nodes={data} />
      </header>
    </div>
  );
}

export default App;
