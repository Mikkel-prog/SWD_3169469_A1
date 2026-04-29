import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
    try {
        const body = await request.json();
    
        //this will get the form from the front end form 
        const {
          //for user feild
            firstName,
            lastName,
            address,
            mobile ,
            email,
            eircode,
            //for appliances 
            type,
            brand,
            model,
            serial,
            purchase,
            warranty,
            cost
        } = body;

        //i did servwer side validation since we cant trust the front end validation for a protected database
        const nameRegex = /^[A-Za-z]{2,50}$/;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
        const mobileRegex = /^[0-9]{10}$/;
        
        const eircodeRegex = /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{4}$/;

        const modelRegex = /^\d{6}-\d{4}$/;
        
        const serialRegex = /^\d{8}-\d{4}$/;
        
        const costRegex = /^\d+(\.\d{1,2})?$/;

      
        if (!firstName || !nameRegex.test(firstName)) {
            return NextResponse.json({ error: 'First name must be 2-50 letters only' }, { status: 400 });
        }
        if (!lastName || !nameRegex.test(lastName)) {
            return NextResponse.json({ error: 'Last name must be 2-50 letters only' }, { status: 400 });
        }
        if (email && !emailRegex.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
        }
        if (mobile && !mobileRegex.test(mobile)) {
            return NextResponse.json({ error: 'Mobile number must be 10 digits' }, { status: 400 });
        }
        if (!eircode || !eircodeRegex.test(eircode)) {
            return NextResponse.json({ error: 'Valid Eircode required (e.g., D09R682)' }, { status: 400 });
        }

     
        if (!type) {
            return NextResponse.json({ error: 'Appliance type required' }, { status: 400 });
        }
        if (!brand || brand.length < 2 || brand.length > 30) {
            return NextResponse.json({ error: 'Brand must be 2-30 characters' }, { status: 400 });
        }
        if (!model || !modelRegex.test(model)) {
            return NextResponse.json({ error: 'Model number must be format: 000000-0000' }, { status: 400 });
        }
        if (!serial || !serialRegex.test(serial)) {
            return NextResponse.json({ error: 'Serial number must be format: 00000000-0000' }, { status: 400 });
        }
        if (!purchase) {
            return NextResponse.json({ error: 'Purchase date required' }, { status: 400 });
        }
        if (!warranty) {
            return NextResponse.json({ error: 'Warranty date required' }, { status: 400 });
        }
        if (new Date(warranty) < new Date(purchase)) {
            return NextResponse.json({ error: 'Warranty date must be after purchase date' }, { status: 400 });
        }
        if (cost && !costRegex.test(cost)) {
            return NextResponse.json({ error: 'Invalid cost format (e.g., 199.99)' }, { status: 400 });
        }

      //this is gonna check if the appliance already exist
        const [existingAppliance] = await pool.query(
            'SELECT * FROM appliances WHERE SerialNumber = ?',
            [serial] // used this to prevent sql injection 
        );
        //if exist then sends this message 
        if (existingAppliance.length > 0) {
            return NextResponse.json({ error: 'Appliance already exists!' }, { status: 409 });
        }

        //check if the user exist with the help of eircode and email 
        let [users] = await pool.query(
            'SELECT userID FROM users WHERE Eircode = ? OR Email = ?',
            [eircode, email || '']
        );
        //if no one found i creatre a new user 
        let userID;
        if (users.length === 0) {
          //create new user 
            const [result] = await pool.query(
                `INSERT INTO users 
                 (FirstName, LastName, Address, Phone, Email, Eircode, RegisteredDate) 
                 VALUES (?, ?, ?, ?, ?, ?, CURDATE())`,
                [firstName, lastName, address || null, mobile || null, email || null, eircode]
            );
            userID = result.insertId;
        } else {
            userID = users[0].userID;
        }

   //add the appliance  in sql
        await pool.query(
            `INSERT INTO appliances 
             (SerialNumber, ApplianceType, Brand, ModelNumber, PurchaseDate, WarrantyDate, CostOfAppliance, UserID) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [serial, type, brand, model, purchase, warranty, cost || null, userID]
        );
//if everthing successfull then we return this message 
        return NextResponse.json(
            { message: 'New appliance added successfully!' },
            { status: 201 }
        );
// or we catch the error and return this message 
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Server error - could not add appliance' },
            { status: 500 }
        );
    }
}