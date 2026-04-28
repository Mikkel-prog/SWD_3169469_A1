"use client";
import { useState } from "react";
import Link from "next/link";

export default function DeletePage() {
    const [serialNumber, setSerialNumber] = useState("");
    const [appliance, setAppliance] = useState(null);
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    //need to fetch appliance to confirm delete
    const handleFetchAppliance = async (e) => {
        e.preventDefault();
        setMessage("");//clearn previous message 
        
        try {
            //sends get request 
            const res = await fetch(`/api/appliances/${serialNumber}`);
           // await for response 
            const data = await res.json();

            if (res.ok) {
                setAppliance(data);
                setStep(2);
            } else {
                setMessage(data.error || "Appliance not found!");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Failed to fetch appliance");
            setMessageType("error");
        }
    };

    //so step 2 is to confirm 
    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/appliances/${serialNumber}`, {
                method: "DELETE"
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Appliance Deleted successfully!");
                setMessageType("success");
                setStep(3);
            } else {
                setMessage(data.error || "Delete failed");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Delete failed - server error");
            setMessageType("error");
        }
    };

    return (
        <div className="cinema-card">
            <h1 className="hay">🗑️ Delete Appliance</h1>

            {step === 1 && (
                <form onSubmit={handleFetchAppliance} className="inven-form">
                    <div className="form-g">
                        <label>Enter Serial Number to Delete:</label>
                        <input
                            type="text"
                            placeholder="Serial Number (format: 00000000-0000)"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            className="form-input"
                            required
                            pattern="\d{8}-\d{4}"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Find Appliance</button>
                    <div style={{marginTop: "10px"}}>
                        <Link href="/">← Back to Home</Link>
                    </div>
                </form>
            )}

            {step === 2 && appliance && (
                <div>
                    <h3>⚠️ Confirm Deletion</h3>
                    <p>Are you sure you want to delete this appliance?</p>
                    
                    <table className="appliance-table">
                        <tbody>
                            <tr><td><strong>Serial Number:</strong></td><td>{appliance.SerialNumber}</td></tr>
                            <tr><td><strong>Appliance Type:</strong></td><td>{appliance.ApplianceType}</td></tr>
                            <tr><td><strong>Brand:</strong></td><td>{appliance.Brand}</td></tr>
                            <tr><td><strong>Model Number:</strong></td><td>{appliance.ModelNumber}</td></tr>
                            <tr><td><strong>Owner:</strong></td><td>{appliance.FirstName} {appliance.LastName}</td></tr>
                            <tr><td><strong>Eircode:</strong></td><td>{appliance.Eircode}</td></tr>
                            <tr><td><strong>Purchase Date:</strong></td><td>{appliance.PurchaseDate}</td></tr>
                            <tr><td><strong>Warranty Date:</strong></td><td>{appliance.WarrantyExpirationDate}</td></tr>
                            <tr><td><strong>Cost:</strong></td><td>€{appliance.CostOfAppliance || '-'}</td></tr>
                        </tbody>
                    </table>
                    
                    <button onClick={handleDelete} className="submit-btn" style={{backgroundColor: "#dc3545"}}>
                        ✅ Confirm Delete
                    </button>
                    <button onClick={() => setStep(1)} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <p className="message-success">{message}</p>
                    <Link href="/">← Back to Home</Link>
                </div>
            )}

            {message && step !== 3 && (
                <div className={`message message-${messageType}`}>
                    {message}
                    <Link href="/" style={{marginLeft: "10px"}}>← Back to Home</Link>
                </div>
            )}
        </div>
    );
}