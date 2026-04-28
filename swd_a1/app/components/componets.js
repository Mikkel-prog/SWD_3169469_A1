/*Mikkel Marion Diniz
3169469*/

"use client"
import { useState } from "react"

//PART A
//PART A

 export function Cinema(){

    
  const [dropdownopen,setdropdownopen]= useState(false);

    const [movie,setmovie]=useState("")
    const [time,settime]=useState("")
    const [message,setmessage]=useState('');
  const [mobile,setmobile]=useState("");
  const [status,setstatus]=useState("");

        const movies={
            "Project Hail Mary":['10:00 AM','2:00 PM','6:00 PM','9:00 PM'],
            "Hoppers":['11:00 AM','3:00 PM','7:00 PM','10:00 PM'],
            "The Bride!":['10:00 AM','2:30 PM','8:00 PM'],
            "Ready or Not 2: Here I Come":['12:00 AM','3:00 PM','5:00 PM','8:00 PM'],
            "Batman v Superman: Dawn of Justice":['12:00 AM','4:30 PM','7:45 PM'],
          "They Will Kill You":['11:00 AM','3:00 PM','7:00 PM','10:00 PM'],
         "Reminders of Him":['10:00 AM','2:00 PM','6:00 PM','9:00 PM'],
            "Undertone":['10:00 AM','2:30 PM','8:00 PM'],
        };

        const handleSubmit=(e) =>{
            e.preventDefault();
                
            if (!movie){
            setmessage("Please select a Movie to proceed");
            setstatus("error");
            return;
         }
           if(!time || time ===""){
            setmessage("Please select a Showtime to proceed");
         setstatus("error");
            return;
           }

           if(!mobile){
            setmessage("Please enter your mobile number");
            setstatus("error");
            return;
           }
             if(!/^\d{10}$/.test(mobile)){
            setmessage("Please enter your  valid Irish mobile number");
           setstatus("error");
            return;
           }
           setmessage(`Your booking  is confirmed for ${movie} at ${time} the tickets are sent to ${mobile} , Thank You.`);
           setstatus("success");
        };   

    


        return(
            <div>
       
                   <header className="head1">
      <nav className="navbar"> 
        <div >
     <a href="/page.js" className="navleft">Home</a></div>
      <div ><span className="navcenter">SWD</span></div> 
     <div  className="navright"><div className="drop" onClick={() =>setdropdownopen(!dropdownopen)}> 
        <button className="btn">Ass{dropdownopen? "^":"*"}
    </button>
    {
      dropdownopen &&(
        <div className="menu">
          <a href="/part-a" className="dropitem" onClick={()=> setdropdownopen(false)}>
            Part-A
          </a>
          <a href="/Part-b-c" className="dropitem" onClick={()=> setdropdownopen(false)}>Part-B-C</a>
        </div>
      )
    }
    </div> 
      </div>
      </nav>
        </header>

<div className="cinema-card">
                <h1 className="hay">Cinema Booking</h1>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-g">
               <select onChange={(e) => setmovie(e.target.value)} className="form-s">
                <option value="">Select Movie</option>
                 {Object.keys(movies).map((m)=>(
                  <option key={m}>{m}</option>
                 ))
                }

               

                </select></div>
                
                 <div className="form-g">
                <select  value={time} onChange={(e) => settime(e.target.value)} className="form-s">
                    <option value="">Select ShowTime</option>
                    {movie&& movies[movie].map((t) =>(
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                </div>
                <div className="form-g">
                    <input type="text" placeholder="Mobile Number"   onChange={(e) => setmobile(e.target.value)}  className="form-in"/>
                    </div>
                    <button type="Submit" className="submit">Book</button>
            </form>
            </div>
                <p className={`message ${status}`}>{message}</p>
            </div>
                );
            }


//part B+C
//part B+C



export function Inventory(){

    const [dropdownopen, setdropdownopen] = useState(false);

    // Form state with ALL fields from brief
    const [form, setForm] = useState({
        // User fields
        firstName: "",
        lastName: "",
        address: "",
        mobile: "",
        email: "",
        eircode: "",
        // Appliance fields
        type: "",
        brand: "",
        model: "",
        serial: "",
        purchase: "",
        warranty: "",
        cost: ""
    })

    const [messagetype, setmessagetype] = useState("");
    const [error, seterrors] = useState({});
    const [message, setmessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        if (error[name]) {
            seterrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // ========== CLIENT-SIDE VALIDATION with REGEX ==========
    const validate = () => {
        let newerrors = {};

        // Regex patterns with comments explaining parameters
        const nameRegex = /^[A-Za-z]{2,50}$/;        // Only letters, 2-50 characters
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Standard email format
        const mobileRegex = /^[0-9]{10}$/;           // Irish mobile (10 digits)
        const eircodeRegex = /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{4}$/;  // Irish Eircode
        const modelRegex = /^\d{6}-\d{4}$/;          // 6 digits - 4 digits
        const serialRegex = /^\d{8}-\d{4}$/;         // 8 digits - 4 digits
        const costRegex = /^\d+(\.\d{1,2})?$/;       // Decimal with 2 places

        // User validation
        if (!form.firstName) {
            newerrors.firstName = "First name is required";
        } else if (!nameRegex.test(form.firstName)) {
            newerrors.firstName = "First name must contain only letters (2-50 characters)";
        }

        if (!form.lastName) {
            newerrors.lastName = "Last name is required";
        } else if (!nameRegex.test(form.lastName)) {
            newerrors.lastName = "Last name must contain only letters (2-50 characters)";
        }

        if (form.mobile && !mobileRegex.test(form.mobile)) {
            newerrors.mobile = "Mobile number must be 10 digits";
        }

        if (form.email && !emailRegex.test(form.email)) {
            newerrors.email = "Please enter a valid email address";
        }

        if (!form.eircode) {
        newerrors.eircode = "Please enter an Eircode";
    } else if (!eircodeRegex.test(form.eircode)) {   // ← FIXED: eircodeRegex not eirregex
        newerrors.eircode = "Please enter a valid Eircode e.g D09R682";
    }

    
        // Appliance validation
        if (!form.type) {
            newerrors.type = "Please select appliance type";
        }

        if (!form.brand) {
            newerrors.brand = "Brand is required";
        } else if (form.brand.length < 2) {
            newerrors.brand = "Brand must have at least 2 characters";
        } else if (form.brand.length > 30) {
            newerrors.brand = "Brand must be less than 30 characters";
        }

        if (!form.model) {
            newerrors.model = "Model number is required";
        } else if (!modelRegex.test(form.model)) {
            newerrors.model = "Invalid model number (format: 000000-0000)";
        }

        if (!form.serial) {
            newerrors.serial = "Serial number is required";
        } else if (!serialRegex.test(form.serial)) {
            newerrors.serial = "Invalid serial number (format: 00000000-0000)";
        }

        if (!form.purchase) {
            newerrors.purchase = "Purchase date is required";
        }

        if (!form.warranty) {
            newerrors.warranty = "Warranty date is required";
        }

        if (form.warranty && form.purchase && new Date(form.warranty) < new Date(form.purchase)) {
            newerrors.warranty = "Warranty date must be after purchase date";
        }

        if (form.cost && !costRegex.test(form.cost)) {
            newerrors.cost = "Invalid cost format (e.g., 199.99)";
        }

        return newerrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationerrors = validate();

        if (Object.keys(validationerrors).length > 0) {
            seterrors(validationerrors);
            setmessage("Please fix the errors above");
            setmessagetype("error");
            return;
        }

        seterrors({});
        
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            
            if (res.ok) {
                setmessage("New appliance added successfully!");
                setmessagetype("success");
                // Reset form
                setForm({
                    firstName: "",
                    lastName: "",
                    address: "",
                    mobile: "",
                    email: "",
                    eircode: "",
                    type: "",
                    brand: "",
                    model: "",
                    serial: "",
                    purchase: "",
                    warranty: "",
                    cost: ""
                });
            } else {
                setmessage(data.error || "Something went wrong");
                setmessagetype("error");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setmessage("Failed to connect to the server");
            setmessagetype("error");
        }
    };

    return (
        <div>
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

            <div className="cinema-card">
                <h1 className="hay">Add New Appliance</h1>
                
                <form onSubmit={handleSubmit} className="inven-form">
                    
                    {/* USER INFORMATION SECTION */}
                    <h3 style={{color: "#333", marginTop: "10px"}}>User Information</h3>
                    <hr />

                    <div className="form-g">
                        <input 
                            name="firstName" 
                            placeholder="First Name *" 
                            value={form.firstName} 
                            onChange={handleChange} 
                            className={`form-input ${error.firstName ? "error" : ""}`}
                        />
                        {error.firstName && <p className="error_text">{error.firstName}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="lastName" 
                            placeholder="Last Name *" 
                            value={form.lastName} 
                            onChange={handleChange} 
                            className={`form-input ${error.lastName ? "error" : ""}`}
                        />
                        {error.lastName && <p className="error_text">{error.lastName}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="address" 
                            placeholder="Address" 
                            value={form.address} 
                            onChange={handleChange} 
                            className={`form-input ${error.address ? "error" : ""}`}
                        />
                        {error.address && <p className="error_text">{error.address}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="mobile" 
                            placeholder="Mobile Number (10 digits)" 
                            value={form.mobile} 
                            onChange={handleChange} 
                            className={`form-input ${error.mobile ? "error" : ""}`}
                        />
                        {error.mobile && <p className="error_text">{error.mobile}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="email" 
                            type="email"
                            placeholder="Email" 
                            value={form.email} 
                            onChange={handleChange} 
                            className={`form-input ${error.email ? "error" : ""}`}
                        />
                        {error.email && <p className="error_text">{error.email}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="eircode" 
                            placeholder="Eircode * (e.g., D09R682)" 
                            value={form.eircode} 
                            onChange={handleChange} 
                            className={`form-input ${error.eircode ? "error" : ""}`}
                            maxLength="8"
                        />
                        {error.eircode && <p className="error_text">{error.eircode}</p>}
                    </div>

                    {/* APPLIANCE INFORMATION SECTION */}
                    <h3 style={{color: "#333", marginTop: "20px"}}>Appliance Information</h3>
                    <hr />

                    <div className="form-g">
                        <select 
                            name="type" 
                            value={form.type} 
                            onChange={handleChange} 
                            className={`form-select ${error.type ? "error" : ""}`}
                        >
                            <option value="">Select Appliance Type *</option>
                            <option>Fridge</option>
                            <option>Washing Machine</option>
                            <option>LED TV</option>
                            <option>Dishwasher</option>
                            <option>Dryer</option>
                            <option>Oven</option>
                            <option>Microwave</option>
                            <option>Vacuum Cleaner</option>
                        </select>
                        {error.type && <p className="error_text">{error.type}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="brand" 
                            placeholder="Brand * (2-30 characters)" 
                            value={form.brand} 
                            onChange={handleChange} 
                            className={`form-input ${error.brand ? "error" : ""}`}
                        />
                        {error.brand && <p className="error_text">{error.brand}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="model" 
                            placeholder="Model Number * (000000-0000)" 
                            value={form.model} 
                            onChange={handleChange} 
                            className={`form-input ${error.model ? "error" : ""}`}
                        />
                        {error.model && <p className="error_text">{error.model}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="serial" 
                            placeholder="Serial Number * (00000000-0000)" 
                            value={form.serial} 
                            onChange={handleChange} 
                            className={`form-input ${error.serial ? "error" : ""}`}
                        />
                        {error.serial && <p className="error_text">{error.serial}</p>}
                    </div>

                    <div className="form-g">
                        <label>Purchase Date:</label>
                        <input 
                            type="date" 
                            name="purchase" 
                            value={form.purchase} 
                            onChange={handleChange} 
                            className={`form-input ${error.purchase ? "error" : ""}`}
                        />
                        {error.purchase && <p className="error_text">{error.purchase}</p>}
                    </div>

                    <div className="form-g">
                        <label>Warranty Expiration Date:</label>
                        <input 
                            type="date" 
                            name="warranty" 
                            value={form.warranty} 
                            onChange={handleChange} 
                            className={`form-input ${error.warranty ? "error" : ""}`}
                        />
                        {error.warranty && <p className="error_text">{error.warranty}</p>}
                    </div>

                    <div className="form-g">
                        <input 
                            name="cost" 
                            type="number"
                            step="0.01"
                            placeholder="Cost of Appliance (€)" 
                            value={form.cost} 
                            onChange={handleChange} 
                            className={`form-input ${error.cost ? "error" : ""}`}
                        />
                        {error.cost && <p className="error_text">{error.cost}</p>}
                    </div>

                    <button type="submit" className="submit-btn">Add to Inventory</button>
                </form>
            </div>
            
            {message && message !== "Please fix the errors above" && (
                <div className={`message message-${messagetype}`}>
                    {message}
                    {messagetype === "success" && <a href="/" style={{marginLeft: "10px"}}>← Back to Home</a>}
                </div>
            )}
            {message === "Please fix the errors above" && (
                <div className={`message message-error`}>{message}</div>
            )}
        </div>
    );
}