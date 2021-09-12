import React, {useState, useEffect} from 'react';

import './App.css';
import Tree from '@naisutech/react-tree'
import io from 'socket.io-client'

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:3005', {transports: ['websocket', 'polling', 'flashsocket']});


function App() {
    const [masterData, setMasterData] = useState([]);
    const [data, setData] = useState([]);
    const [enteringId, setEnteringId] = useState('');
    const [exitingId, setExitingId] = useState('');
    const toastId = React.useRef('');


    useEffect(() => {
        socket.on('tree', (tree) => {
            setMasterData(tree)
            setData(tree)

        });
        socket.on('attach', (deviceId) => {
            setEnteringId(deviceId)
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast("Device Connected!",
                    {
                        toastId: enteringId
                    }) as string
            }
        });
        socket.on('detach', (deviceId) => {
            setExitingId(deviceId)
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast("Device Disconnected!",
                    {
                        toastId: exitingId
                    }) as string
            }
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
                <ToastContainer/>
            </div>

        </div>
    );
}

export default App;
