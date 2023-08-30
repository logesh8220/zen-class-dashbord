import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from './config'
function Class() {
    let sample = {
        ClassType
            :
            "Primary",
        Contents
            :
            "Introduction to Web Browser,DOM tree CSS,Browser internals ,Ports & Evolution of HTTPinternals IP – MAC address,JavaScript V8 engine Layout engine or rendering engine JS engine,CSS parser- HTML parser,",
        Date
            :
            "20/01/2023",
        Day
            :
            1,
        EndTime
            :
            "13:00",
        PreRead
            :
            "No preread available",
        StartTime
            :
            "10:00",
        Task
            :
            "https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages https://stackoverflow.com/questions/17253545/scripting-language-vs-programming-language https://cs.lmu.edu/~ray/notes/paradigms/",
        Title
            :
            "Javascript - Day -1 : Introduction to Browser & web",
        Zoom
            :
            "https://us06web.zoom.us/rec/play/cphR6s6qk79F4fJagAH810aUSOmP-JtCB8k7f06FnA0l_9CP2ZOfyfYDQ1M0t0uHfvuKYXEBC9mSdpvQ.vr-BUnnld39tPbBI?continueMode=true&_x_zm_rtaid=e3VDKyzIQBSCAP2-BgGuLw.1674283299698.88ef4f18810fc06fcb3b4b6586158e3a&_x_zm_rhtaid=134",
        __v
            :
            0,
        _id
            :
            "63cb8f4dfdaaf0debba6f00a",
    }
    let navigate = useNavigate()
    const [data, setdata] = useState([])
    const [day, setday] = useState("")
    const [classTitles, settitles] = useState(sample)
    useEffect(() => {
        LoadData()
    }, [])
    let LoadData = async () => {
        let data = await axios.get(`${api.classes}`)
        setdata(data.data.data)
    }
    let handleday = (day) => {

        setday(day)
        let result = data.filter(data => data.Day === day)
        settitles(result[0])

    }
    let handladditional = (date, type) => {
        setday(date)
        let result = data.filter(data => data.Date === date)
        settitles(result[0])

    }
    let logout = () => {
        window.localStorage.clear()
        navigate('/login')
    }
    return (
        <div>
            <div style={{ marginLeft: "3%" }} class="ms-5 ">
                <div>
                    <nav class="navbar bg-white p-3 card nav" style={{ borderRadius: "0px", position: "static" }}>
                        <div class="container-fluid">
                            <h1 class="ps-5">Zen Class</h1>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-box-arrow-in-left text-muted ps-4" onClick={() => logout()} style={{ fontSize: "50px", cursor: "pointer" }}></i>
                            </div>
                        </div>
                    </nav>
                </div>


                <div className='row text-light '>
                    {

                        <div className='col-lg-9' >
                            <div style={{ backgroundColor: "#4b0dba", borderRadius: "10px", height: "auto" }} className="ms-5 my-5 d-flex justify-content-between p-4">
                                <h4>Join the class on time</h4>
                                <a href={classTitles.Zoom} target="_blank" className='btn-success btn '>{classTitles.Status === "Started" ? "Join Class" : "Reacording"}</a>
                            </div>

                            <div className='card ms-5 text-dark' >
                                <div className='card-header text-muted'>
                                    <h4 className='' style={{ color: "#555ba3" }}>{classTitles.Title}</h4>
                                    <h6 style={{ color: "#555ba3" }}>{classTitles.Date} {classTitles.StartTime} AM : {classTitles.EndTime} PM</h6>
                                </div>
                                <div className='card-body'>
                                    <h5 className="text-dark">contents:</h5>
                                    {
                                        classTitles.Contents.split(",").map((title) => {
                                            return (
                                                <h6 className='text-muted ms-3'>{title}</h6>
                                            )
                                        })
                                    }
                                    <h5 className="text-dark">Pre-Read:</h5>
                                    <h6 className='text-muted ms-3'>{classTitles.PreRead}</h6>
                                </div>
                            </div>
                            <h2 className='ms-5' style={{ color: "#4b0dba" }}>Activities</h2>
                            <div className='card  ms-5 ' style={{ color: "#556ba3" }} >
                                <div className='d-flex justify-content-between'>
                                    <h6 className='p-3 overflow-auto'>{classTitles.Task} </h6>
                                </div>


                            </div>
                        </div>
                    }
                    <div className='col-lg-3 '>

                        <div className='col-10 mt-5 mb-5 ms-5 card-header' style={{ height: "40vh", border: "1px solid lightgray", borderRadius: "10px" }}>
                            <div className='p-2' style={{ backgroundColor: "#f7f5fc", borderRadius: "10px 10px 0px 0px" }}>
                                <h4 style={{ color: "#556ba3" }}>Session Roadmap</h4>
                            </div>
                            <div className=' d-flex flex-wrap p-3'>
                                {
                                    data.map((classes, index) => {
                                        if (classes.ClassType !== "Additional" && classes.Status === "Up Comming")
                                            return (

                                                <div key={index} style={{ backgroundColor: "lightgray" }} className='roadmap text-center text-light'><h4 className='p-2'>{classes.Day}</h4></div>
                                            )
                                        else if (classes.Status === "Started") {
                                            return (

                                                <div key={index} style={{ backgroundColor: "#4b0dba" }} className='roadmap text-center text-light'><h4 onClick={() => handleday(classes.Day)} className='p-2'>{classes.Day}</h4></div>
                                            )
                                        }
                                    })
                                }

                            </div>

                        </div>
                        <div className='col-10 ms-5 card-header' style={{ height: "40vh", border: "1px solid lightgray", borderRadius: "10px", backgroundColor: "#f7f5fc" }}>
                            <div className='p-2 d-flex justify-content-between overflow-y-auto' style={{ backgroundColor: "#f7f5fc", borderRadius: "10px 10px 0px 0px" }}>
                                <h4 style={{ color: "#556ba3" }}>Additional Sessions</h4>
                            </div>
                            <div className=''>
                                {
                                    data.map((data => {
                                        if (data.ClassType === "Additional") {
                                            return (
                                                <div className='text-dark p-2 addition-session' onClick={() => handladditional(data.Date, data.ClassType)}>
                                                    <h4 style={{ color: "#556ba3" }} >{data.Title} - {data.Date} @ {data.StartTime}</h4>
                                                    <h6 style={{ color: "#556ba3" }}> {data.Date} - {data.StartTime} - {data.EndTime}</h6>
                                                </div>
                                            )
                                        }
                                    }))
                                }

                            </div>

                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Class