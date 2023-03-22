import React, {useEffect, useState} from 'react'
import {
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";
import '../App.css'

const Directory = () => {
    const [data, setData] = useState([])
        const [editAgent, setEditAgent] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState({})
    const [updateAgentInfo, setUpdateAgentInfo] = useState({name:'', forwardingNumber:'',  email:'', index:''})


    const getAgents = async () => {
        await fetch('data.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((agent) => { 
            agent.json()
            .then((ag) =>{ 
                setData(ag)
              })
          })
          .catch((error) => {
              console.error(error);
            });
    }

    useEffect(() => {
        getAgents()
    },[])

    const updateAgent = async(ag, index) => {
        setSelectedAgent(ag), selectedAgent.sid = index
                setEditAgent(!editAgent)
    }

    const updateAgentFunc = () => {
        data[selectedAgent.sid].name = updateAgentInfo.name
            data[selectedAgent.sid].email = updateAgentInfo.email
        data[selectedAgent.sid].forwarding_number = updateAgentInfo.forwardingNumber
        window.localStorage.setItem("data", JSON.stringify(data))
        setEditAgent(false)
        const newData = localStorage.getItem('data')
        setData(JSON.parse(newData))
    }
    
        return (
            <div style={{
                backgroundColor: "white",
                color: "white",
                width: "100%",
            }}>
                <div style={{ overflowX:'hidden', color:'black' }}>
                    <div style={{fontWeight:"Bolder", fontSize:'17px', padding:'40px'}}> Agent Directory</div>
                    <SelectionFilter/>
                    <div style={{position:'absolute'}}onClick={() => {
                        setData({})
                    }}><button>Clear Agents</button></div>
                    {editAgent !== false && (
                        <div className="selectedAgentContainer">
                            <div>
                            Name: 
                            <input className="editAgentInput" value={updateAgentInfo.name} onChange={(e) => {
                                setUpdateAgentInfo({name:e.target.value, forwardingNumber:updateAgentInfo.forwardingNumber, email:updateAgentInfo.email, sid: selectedAgent.sid})
                            }}></input>
                            </div> 
                            <div>
                            Number: 
                            <input className="editAgentInput" value={updateAgentInfo.forwardingNumber} onChange={(e) => {
                                setUpdateAgentInfo({name:updateAgentInfo.name, forwardingNumber:e.target.value, email:updateAgentInfo.email, sid: selectedAgent.sid})
                            }}></input>
                            </div>
                            <div>
                            Email: 
                            <input className="editAgentInput" value={updateAgentInfo.email} onChange={(e) => {
                                setUpdateAgentInfo({name:updateAgentInfo.name, forwardingNumber:updateAgentInfo.forwardingNumber, email:e.target.value, sid: selectedAgent.sid})
                            }}></input>
                            </div>
                            <div>
                                <button onClick={() => {updateAgentFunc()}}>Save</button>
                                <button onClick={() => {
                                    setEditAgent(false)
                                    updateAgentInfo.name = ''
                                    updateAgentInfo.forwardingNumber = ''
                                    updateAgentInfo.email = ''
                                }}>Cancel</button>
                            </div>
                        </div>
                    )}
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{color:'black !imoprtant'}}>Extension</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        {data ? (
                            <TableBody>
                                {data.map((ag, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {ag.extension}
                                        </TableCell>
                                        <TableCell>
                                            {ag.name}
                                        </TableCell>
                                        <TableCell>
                                            {ag.forwarding_number}
                                        </TableCell>
                                        <TableCell>
                                            {ag.state}
                                        </TableCell>
                                        <TableCell>
                                            {ag.email.name}
                                        </TableCell>
                                        <TableCell>
                                            <div className="editAgent" onClick={() => {
                                                updateAgent(ag, index)
                                            }}></div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <div>No Content</div>
                        )}
                    </Table>
                </div>
            </div>
        )

}
export default Directory;