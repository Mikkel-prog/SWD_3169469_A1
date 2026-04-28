/*Mikkel Marion Diniz
3169469*/

"use client";
import { useState } from "react";

import PartB_C from "./Part-b-c/page"
export default function Home(){

        const [dropdownopen, setdropdownopen] = useState(false);
    
    return (
        <div className="Assig_container">
            <header className="head1">
                <nav className="navbar"> 
                    <div>
                        <a href="/" className="navleft">Home</a>
                    </div>
                    <div><span className="navcenter">SWD - Assignment 2</span></div> 
                    <div className="navright">
                        <div className="drop" onClick={() => setdropdownopen(!dropdownopen)}> 
                            <button className="btn">Ass{dropdownopen ? "^" : "*"}</button>
                            {dropdownopen && (
                                <div className="menu">
                                    <a href="/part-a" className="dropitem" onClick={() => setdropdownopen(false)}>Part-A</a>
                                    <a href="/Part-b-c" className="dropitem" onClick={() => setdropdownopen(false)}>Add Appliance</a>
                                </div>
                            )}
                        </div> 
                    </div>
                </nav>
            </header>

            <div className="imag">
                {/* ADD Appliance */}
                <a href="/Part-b-c" className="im">
                    <div className="image-card">
                        <img src="/add.jpg" className="image"/>
                        <div className="over">
                            <h3>➕ ADD Appliance</h3>
                            <p>Register new household appliance</p>
                        </div>
                    </div>
                </a>
                
                {/* SEARCH Appliance */}
                <a href="/search" className="im">
                    <div className="image-card">
                        <img src="/inevn.jpg" className="image"/>
                        <div className="over">
                            <h3>🔍 SEARCH Appliance</h3>
                            <p>Find appliances by serial number, type, or brand</p>
                        </div>
                    </div>
                </a>

                {/* UPDATE Appliance */}
                <a href="/update" className="im">
                    <div className="image-card">
                        <img src="/update.jpg" className="image"/>
                        <div className="over">
                            <h3>✏️ UPDATE Appliance</h3>
                            <p>Modify appliance or user information</p>
                        </div>
                    </div>
                </a>

                {/* DELETE Appliance */}
                <a href="/delete" className="im">
                    <div className="image-card">
                        <img src="/delete.jpg" className="image"/>
                        <div className="over">
                            <h3>🗑️ DELETE Appliance</h3>
                            <p>Remove appliance from inventory</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );

}