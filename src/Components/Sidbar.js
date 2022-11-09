import React from 'react'

function Sidbar() {
    return (
        <div  class="side-nav card">
            <div style={{ borderRadius: "0px" }}>
                <div class="">
                    {/* <i class="bi bi-person-circle text-muted ps-3 " style={{ fontSize: "50px" }}></i> */}
                    <img class="p-1" src='./download.png' style={{maxWidth:"70px",minWidth:"40px"}} alt="zen logo"></img>
                </div>
                <div class="mt-5 pt-3 ">
                {/* <i class="bi bi-journal-check icon-div p-4" style={{fontSize:"25px"}}></i> */}
                <i class=' icon-div p-4 bx bxs-notepad text-muted'style={{fontSize:"25px"}}></i>
                </div>
            </div>
        </div>
    )
}

export default Sidbar