"use client";
import { useState } from "react";
import Link from "next/link";

export default function UpdatePage() {
    const [step, setStep] = useState(1);
    //inclused 2 steps ask the serial num   and second show the data and edit
    const [serialNumber, setSerialNumber] = useState("");
    const [appliance, setAppliance] = useState(null);
    const [formData, setFormData] = useState({
        applianceType: "",
        brand: "",
        modelNumber: "",
        purchaseDate: "",
        warrantyExpirationDate: "",
        costOfAppliance: "",
        firstName: "",
        lastName: "",
        address: "",
        mobile: "",
        email: "",
        eircode: ""
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Step 1: Fetch appliance by serial number
    const handleFetchAppliance = async (e) => {
        e.preventDefault();
        setMessage("");
        
        try {
            const res = await fetch(`/api/appliances/${serialNumber}`);
            const data = await res.json();

            if (res.ok) {
                setAppliance(data);
                setFormData({
                    applianceType: data.ApplianceType,
                    brand: data.Brand,
                    modelNumber: data.ModelNumber,
                    purchaseDate: data.PurchaseDate || "",
                    warrantyExpirationDate: data.WarrantyExpirationDate || "",
                    costOfAppliance: data.CostOfAppliance || "",
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    address: data.Address || "",
                    mobile: data.Mobile || "",
                    email: data.Email || "",
                    eircode: data.Eircode
                });
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

    // Step 2: Submit updates
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Client-side validation
        const nameRegex = /^[A-Za-z]{2,50}$/;
        const modelRegex = /^\d{6}-\d{4}$/;
        const eircodeRegex = /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{4}$/;
        
        if (!nameRegex.test(formData.firstName)) {
            setMessage("First name must be 2-50 letters only");
            setMessageType("error");
            return;
        }
        if (!nameRegex.test(formData.lastName)) {
            setMessage("Last name must be 2-50 letters only");
            setMessageType("error");
            return;
        }
        if (!modelRegex.test(formData.modelNumber)) {
            setMessage("Invalid Model format (000000-0000)");
            setMessageType("error");
            return;
        }
        if (!eircodeRegex.test(formData.eircode)) {
            setMessage("Invalid Eircode format (e.g., D09R682)");
            setMessageType("error");
            return;
        }

        try {
            const res = await fetch(`/api/appliances/${serialNumber}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Appliance has been updated successfully!");
                setMessageType("success");
                setStep(1);
                setSerialNumber("");
                setAppliance(null);
            } else {
                setMessage(data.error || "Update failed");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Update failed - server error");
            setMessageType("error");
        }
    };

    return (
        <div className="cinema-card">
            <h1 className="hay">✏️ Update Appliance</h1>

            {step === 1 && (
                <form onSubmit={handleFetchAppliance} className="inven-form">
                    <div className="form-g">
                        <label>Enter Serial Number to Update:</label>
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
                <form onSubmit={handleUpdate} className="inven-form">
                    <h3>User Information</h3>
                    <hr />
                    
                    <div className="form-g">
                        <input
                            placeholder="First Name *"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-g">
                        <input
                            placeholder="Last Name *"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-g">
                        <input
                            placeholder="Address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="form-input"
                        />
                    </div>

                    <div className="form-g">
                        <input
                            placeholder="Mobile (10 digits)"
                            value={formData.mobile}
                            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                            className="form-input"
                        />
                    </div>

                    <div className="form-g">
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="form-input"
                        />
                    </div>

                    <div className="form-g">
                        <input
                            placeholder="Eircode *"
                            value={formData.eircode}
                            onChange={(e) => setFormData({...formData, eircode: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <h3>Appliance Information</h3>
                    <hr />

                    <div className="form-g">
                        <select
                            value={formData.applianceType}
                            onChange={(e) => setFormData({...formData, applianceType: e.target.value})}
                            className="form-select"
                            required
                        >
                            <option>Fridge</option>
                            <option>Washing Machine</option>
                            <option>LED TV</option>
                            <option>Dishwasher</option>
                            <option>Dryer</option>
                            <option>Oven</option>
                            <option>Microwave</option>
                        </select>
                    </div>

                    <div className="form-g">
                        <input
                            placeholder="Brand *"
                            value={formData.brand}
                            onChange={(e) => setFormData({...formData, brand: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-g">
                        <input
                            placeholder="Model Number (000000-0000)"
                            value={formData.modelNumber}
                            onChange={(e) => setFormData({...formData, modelNumber: e.target.value})}
                            className="form-input"
                            required
                            pattern="\d{6}-\d{4}"
                        />
                    </div>

                    <div className="form-g">
                        <label>Purchase Date:</label>
                        <input
                            type="date"
                            value={formData.purchaseDate}
                            onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-g">
                        <label>Warranty Expiration Date:</label>
                        <input
                            type="date"
                            value={formData.warrantyExpirationDate}
                            onChange={(e) => setFormData({...formData, warrantyExpirationDate: e.target.value})}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-g">
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Cost of Appliance (€)"
                            value={formData.costOfAppliance}
                            onChange={(e) => setFormData({...formData, costOfAppliance: e.target.value})}
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="submit-btn">Update Appliance</button>
                    <button type="button" onClick={() => setStep(1)} className="cancel-btn">Cancel</button>
                </form>
            )}

            {message && (
                <div className={`message message-${messageType}`}>
                    {message}
                    {messageType === "success" && <Link href="/" style={{marginLeft: "10px"}}>← Back to Home</Link>}
                </div>
            )}
        </div>
    );
}