import React, {useState, useEffect} from 'react';

import './App.css';
import Tree from '@naisutech/react-tree'
import io from 'socket.io-client'


const socket = io('http://localhost:3005', {transports: ['websocket', 'polling', 'flashsocket']});


function App() {
    const [masterData, setMasterData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on('tree', (tree) => {
            setMasterData(tree)
            setData(tree)
        });
    });


    return (
        <div className="App">
            <div className="App-header">
                <div className="">
                    <button onClick={() => setData(masterData.filter(item => item["bDeviceClass"] === 9))}>Show Only
                        Hubs
                    </button>
                    <button onClick={() => setData(masterData)}>Show All</button>
                </div>
                <Tree nodes={data}/>
            </div>

        </div>
    );
}

export default App;
