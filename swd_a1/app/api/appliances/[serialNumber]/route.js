import { NextResponse } from 'next/server';
import pool from '@/lib/db';

//GET function 
export async function GET(request, { params }) {
    try {
        const { serialNumber } =  await params;
        //joins the appliance table with the user table 
        const [appliances] = await pool.query(
            `SELECT a.*, u.FirstName, u.LastName, u.Address, u.Phone, u.Email, u.Eircode, u.userID
             FROM appliances a
             JOIN users u ON a.UserID = u.userID
             WHERE a.SerialNumber = ?`,
            [serialNumber]
        );
        
        //check if any appliance found withe serial number 
        if (appliances.length === 0) {
            return NextResponse.json({ error: 'Appliance not found' }, { status: 404 });
        }
        
        return NextResponse.json(appliances[0], { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}

//PUT where we update the appliace 
export async function PUT(request, { params }) {
    try {
        const { serialNumber } = await  params;
        const body = await request.json();
        
        const {
            applianceType,
            brand,
            modelNumber,
            purchaseDate,
            warrantyDate,
            costOfAppliance,
            firstName,
            lastName,
            address,
            phone,
            email,
            eircode
        } = body;

        //need to do the server side validation for the updated inputs 
        const nameRegex = /^[A-Za-z]{2,50}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const eircodeRegex = /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{4}$/;
        const modelRegex = /^\d{6}-\d{4}$/;

        if (!firstName || !nameRegex.test(firstName)) {
            return NextResponse.json({ error: 'Valid first name required' }, { status: 400 });
        }
        if (!lastName || !nameRegex.test(lastName)) {
            return NextResponse.json({ error: 'Valid last name required' }, { status: 400 });
        }
        if (!eircode || !eircodeRegex.test(eircode)) {
            return NextResponse.json({ error: 'Valid Eircode required' }, { status: 400 });
        }
        if (!modelRegex.test(modelNumber)) {
            return NextResponse.json({ error: 'Invalid model format (000000-0000)' }, { status: 400 });
        }

        // Check if appliance exists
        const [existing] = await pool.query(
            'SELECT * FROM appliances WHERE SerialNumber = ?',
            [serialNumber]
        );
        
        if (existing.length === 0) {
            return NextResponse.json({ error: 'Appliance not found!' }, { status: 404 });
        }

        //this will update in the sql
        await pool.query(
            `UPDATE appliances 
             SET ApplianceType = ?, Brand = ?, ModelNumber = ?, 
                 PurchaseDate = ?, WarrantyDate = ?, CostOfAppliance = ?
             WHERE SerialNumber = ?`,
            [applianceType, brand, modelNumber, purchaseDate, warrantyDate, costOfAppliance, serialNumber]
        );

        //update the user info
        const userID = existing[0].UserID;
        await pool.query(
            `UPDATE users 
             SET FirstName = ?, LastName = ?, Address = ?, Phone = ?, Email = ?, Eircode = ?
             WHERE userID = ?`,
            [firstName, lastName, address, phone, email, eircode, userID]
        );

        return NextResponse.json(
            { message: 'Appliance has been updated successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

//delete
export async function DELETE(request, { params }) {
    try {
        const { serialNumber } =  await params;

        //get the application detail for confirmaton
        const [appliance] = await pool.query(
            `SELECT a.*, u.FirstName, u.LastName 
             FROM appliances a
             JOIN users u ON a.UserID = u.userID
             WHERE a.SerialNumber = ?`,
            [serialNumber]
        );

        if (appliance.length === 0) {
            return NextResponse.json({ error: 'Appliance not found!' }, { status: 404 });
        }

       //this will delete the appliance 
        await pool.query('DELETE FROM appliances WHERE SerialNumber = ?', [serialNumber]);

        return NextResponse.json(
            { message: 'Appliance Deleted successfully!', deletedAppliance: appliance[0] },
            { status: 200 }
        );

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}