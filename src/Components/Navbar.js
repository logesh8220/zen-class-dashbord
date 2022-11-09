import React from 'react'

function Navbar() {
    return (
        <div>
            <nav class="navbar bg-white p-3 card nav" style={{ borderRadius: "0px",position: "static"}}>
                <div class="container-fluid">
                    <h1 class="ps-5">Dashboard</h1>
                    <div class="d-flex align-items-center">
                        <span style={{ fontSize: "25px" }}>Logesh T</span>
                        <i class="bi bi-person-circle text-muted ps-4" style={{ fontSize: "50px" }}></i>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar