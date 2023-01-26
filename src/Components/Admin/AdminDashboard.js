
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { api } from '../config';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import EditClass from './EditClass';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
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
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([])
  const [isdisabled, setdisabled] = useState(false)
  const [day, setday] = useState(1)
  const [classTitles, settitles] = useState(sample)
  console.log(classTitles)
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowedit(true);
  const [ShowEdit, setShowedit] = useState(false);
  const formik = useFormik({
    initialValues: {
      Title: "",
      Date: "",
      StartTime: "",
      EndTime: "",
      Contents: "",
      PreRead: "",
      ClassType: "",
      Task: "",
      Zoom: ""
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`${api.classes}`, values)
        setShow(false)
        toast.success("Message sent", {
          className: "tost-massage"
        })
        LoadData()
        resetForm({ values: "" })
      } catch (error) {
        console.log(error)
      }
    }

  })

  let handleday = (day) => {
    setday(day)
    setdisabled(false)
    let result = data.filter(data => data.Day === day)
    settitles(result[0])

  }
  let handladditional = (date, type) => {
    setday(date)
    setdisabled(true)
    let result = data.filter(data => data.Date === date)
    settitles(result[0])

  }

  useEffect(() => {
    LoadData()
  }, [])

  let LoadData = async () => {
    let data = await axios.get(`${api.classes}`)
    setdata(data.data.data)
  }
  let updateClass = async (Day) => {
    let data = await axios.put(`${api.classes}/Status?Day=${Day}`,)
    toast.success("Updated", {
      className: "tost-massage"
    })
  }
  let logout = () =>{
    window.localStorage.clear()
    navigate('/login')
  }
  const handleClose = () => setShow(false);
  return (
    <div>
      <div style={{ marginLeft: "3%" }} class="ms-5 ">
        <div>
          <nav class="navbar bg-white p-3 card nav" style={{ borderRadius: "0px", position: "static" }}>
            <div class="container-fluid">
              <h1 class="ps-5">Zen Class</h1>
              <div class="d-flex align-items-center">
                <i class="bi bi-box-arrow-in-left text-muted ps-4" onClick={()=> logout()} style={{ fontSize: "50px",cursor:"pointer"}}></i>
              </div>
            </div>
          </nav>
        </div>


        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Add Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Session Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Session Title"
                  autoFocus
                  name='Title' required
                  onChange={formik.handleChange}
                  value={formik.values.Title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Schedule</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  name='Date' required
                  onChange={formik.handleChange}
                  value={formik.values.Date}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  autoFocus
                  name='StartTime' required
                  onChange={formik.handleChange}
                  value={formik.values.StartTime}

                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  autoFocus
                  name='EndTime' required
                  onChange={formik.handleChange}
                  value={formik.values.EndTime}

                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Conntents</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contents"
                  autoFocus
                  name='Contents' required
                  onChange={formik.handleChange}
                  value={formik.values.Contents}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>PreRead</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="preread"
                  autoFocus
                  name='PreRead'
                  onChange={formik.handleChange}
                  value={formik.values.PreRead}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tasks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tasks"
                  autoFocus
                  name='Task' required
                  onChange={formik.handleChange}
                  value={formik.values.Task}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Zoom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zoom Link"
                  autoFocus
                  name='Zoom' required
                  onChange={formik.handleChange}
                  value={formik.values.Zoom}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> Class Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Primary / Additional"
                  name='ClassType' required
                  onChange={formik.handleChange}
                  value={formik.values.ClassType}
                />
              </Form.Group>
              <Button type='submit' variant="primary">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <EditClass SetShowEdit={setShowedit} ShowEdit={ShowEdit} classTitles={classTitles} Day={day} settitles={settitles} />
        <div className='row text-light '>
          {

            <div className='col-lg-9' >
              <div style={{ backgroundColor: "#4b0dba", borderRadius: "10px", height: "auto" }} className="ms-5 my-5 d-flex justify-content-between p-4">
                <h4>Join the class on time</h4>
                <a href='https://us06web.zoom.us/rec/play/MRrmZ-dvsbh5l1RbCwUUuv8wcTlOPnPCSo-75oCtSbfNtLhBxJ3hWUTscXAkwdciXQkh8Gh5QhINn7rA.n_Xdty9rAglu-Q6r?continueMode=true&_x_zm_rtaid=ySbgwe7qTkyMWoRjyutFUA.1673594247962.fe1b4db92aca74a2306fbab3a71db766&_x_zm_rhtaid=36' rel='noreferrer' target="_blank" className='btn-success btn '>Start Class</a>
              </div>

              <div className='card ms-5 text-dark' >
                <div className='card-header text-muted d-flex justify-content-between'>
                  <div>
                    <h4 className='' style={{ color: "#555ba3" }}>{classTitles.Title}</h4>
                    <h6 style={{ color: "#555ba3" }}>{classTitles.Date} {classTitles.StartTime} AM : {classTitles.EndTime} PM</h6>
                  </div>
                  <div>
                    {
                      isdisabled || classTitles.Status === "Started" ? "✅" :
                        <button className='btn-success btn ms-3 my-3' onClick={() => updateClass(classTitles.Day)}>Mark As Finished</button>
                    }
                    {
                      isdisabled ? "" :
                        <Button className='btn-success m-3' variant="primary" onClick={handleShowEdit}> Edit Class </Button>
                    }

                  </div>
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
                  <div className='col-8'>
                    <h6 className='py-4 ps-3'>{classTitles.Task} </h6>
                  </div>
                  <div>
                    <button className=' my-4 btn btn-success m-3'>EditTask</button>

                  </div>
                </div>


              </div>
            </div>
          }
          <div className='col-lg-3 '>

            <div className='col-10 mt-5 mb-5 ms-5 card-header' style={{ height: "auto", border: "1px solid lightgray", borderRadius: "10px" }}>
              <div className='p-2' style={{ backgroundColor: "#f7f5fc", borderRadius: "10px 10px 0px 0px" }}>
                <h4 className='p-1' style={{ color: "#556ba3" }}>Session Roadmap</h4>
              </div>
              <div className=' d-flex flex-wrap p-3'>
                {
                  data.map((classes, index) => {
                    if (classes.ClassType !== "Additional")
                      return (

                        <div key={index} className='roadmap text-center text-light'><h4 onClick={() => handleday(classes.Day)} className='p-2'>{classes.Day}</h4></div>
                      )
                  })
                }

              </div>

            </div>
            <div className='col-10 ms-5 card-header' style={{ height: "55vh", border: "1px solid lightgray", borderRadius: "10px", backgroundColor: "#f7f5fc" }}>
              <div className='p-2 d-flex justify-content-between overflow-y-auto' style={{ backgroundColor: "#f7f5fc", borderRadius: "10px 10px 0px 0px" }}>
                <h4 className='mt-1' style={{ color: "#556ba3" }}>Additional Sessions</h4>
                <Button className='btn-success' variant="primary" onClick={handleShow}>Add Class </Button>
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
      <ToastContainer />
    </div>
  )
}

export default AdminDashboard