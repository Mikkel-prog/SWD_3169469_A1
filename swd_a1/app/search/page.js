"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {
    const [searchType, setSearchType] = useState("serialNumber");//what to search the type 
    const [searchValue, setSearchValue] = useState("");//for waht the user types in the box
    const [result, setResult] = useState(null);//for search result
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        //clearn all message 
        setLoading(true);
        setMessage("");
        setResult(null);

        try {
            const res = await fetch(`/api/search?type=${searchType}&value=${encodeURIComponent(searchValue)}`);
            const data = await res.json();//converts 

            if (res.ok) {
                setResult(data.appliances);
                setMessage(`Found ${data.appliances.length} appliance(s)`);
            } else {
                setMessage(data.message || "No matching appliance found!");
                setResult(null);
            }
        } catch (error) {
            setMessage("Search failed - please try again");
        } finally {
            setLoading(false);
        }
    };

    ///for date 
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); 
    };

    return (
        <div className="cinema-card">
            
            <h1 className="hay"> Search Appliance</h1>
            
            <form onSubmit={handleSearch} className="inven-form">
                <div className="form-g">
                    <label>Search by:</label>
                    <select 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                        className="form-select"
                    >
                        <option value="serialNumber">Serial Number</option>
                        <option value="applianceType">Appliance Type</option>
                        <option value="brand">Brand</option>
                    </select>
                </div>

                <div className="form-g">
                    <input
                        type="text"
                        placeholder={`Enter ${searchType === 'serialNumber' ? 'Serial Number (00000000-0000)' : searchType === 'applianceType' ? 'Appliance Type (e.g., Fridge)' : 'Brand (e.g., Samsung)'}`}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {message && (
                <div className={`message ${result ? 'message-success' : 'message-error'}`}>
                    {message}
                    {!result && <Link href="/" style={{marginLeft: "10px"}}>← Back to Home</Link>}
                </div>
            )}

            {result && result.length > 0 && (
                <div className="results-table">
                    <h3 style={{color: "#667eea", marginBottom: "15px"}}>📋 Search Results:</h3>
                    <div className="table-wrapper">
                        <table className="appliance-table">
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Type</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Purchase Date</th>
                                    <th>Warranty Date</th>
                                    <th>Cost (€)</th>
                                    <th>Owner</th>
                                    <th>Eircode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((appliance) => (
                                    <tr key={appliance.ApplianceID}>
                                        <td className="serial-cell">{appliance.SerialNumber}</td>
                                        <td>{appliance.ApplianceType}</td>
                                        <td>{appliance.Brand}</td>
                                        <td>{appliance.ModelNumber}</td>
                                        <td>{formatDate(appliance.PurchaseDate)}</td>
                                        <td>{formatDate(appliance.WarrantyExpirationDate)}</td>
                                        <td className="cost-cell">{appliance.CostOfAppliance ? `€${parseFloat(appliance.CostOfAppliance).toFixed(2)}` : '-'}</td>
                                        <td>{appliance.FirstName} {appliance.LastName}</td>
                                        <td className="eircode-cell">{appliance.Eircode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{marginTop: "20px", textAlign: "center"}}>
                        <Link href="/" style={{color: "#667eea", textDecoration: "none", fontWeight: "500"}}> Back to Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
}