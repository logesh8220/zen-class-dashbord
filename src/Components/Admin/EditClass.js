import axios from 'axios';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { api } from '../config';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function EditClass({ SetShowEdit, ShowEdit, Day,classTitles }) {
    const handleClose = () => SetShowEdit(false);
    const formik = useFormik({
        initialValues: {
            Title: classTitles.Title,
            Date: classTitles.Date,
            StartTime: classTitles.StartTime,
            EndTime: classTitles.EndTime,
            Contents: classTitles.Contents,
            PreRead: classTitles.PreRead,
            ClassType: classTitles.ClassType,
            Task: classTitles.Task,
            Zoom: classTitles.Zoom,
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.put(`${api.classes}?Day=${Day}`, values)
                SetShowEdit(false)
                toast.success("Updated Succesfully", {
                    className: "tost-massage"
                })
                resetForm({ values: "" })
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <div>
            <Modal show={ShowEdit} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Class</Modal.Title>
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
                                disabled
                            />
                        </Form.Group>
                        <Button type='submit' variant="primary">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditClass