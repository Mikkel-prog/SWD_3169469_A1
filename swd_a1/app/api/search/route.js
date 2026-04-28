import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
    try {
        //get from the url of the page in web
        const { searchParams } = new URL(request.url);
        const searchType = searchParams.get('type');//type is serial num
        const searchValue = searchParams.get('value');// value of serial number 


        //check if the user entered somthing to search
        if (!searchValue) {
            return NextResponse.json(
                { error: 'Search value required' },
                { status: 400 }
            );
        }

        // tell the sql using the select operation to find 
        let query = `
            SELECT a.*, u.FirstName, u.LastName, u.Address, u.Phone, u.Email, u.Eircode
            FROM appliances a
            JOIN users u ON a.UserID = u.userID
            WHERE 1=1
        `;
        let params = [];

        // Add search condition  
        //LIKE wildcard % for partial matching
        if (searchType === 'serialNumber') {
            query += ` AND a.SerialNumber LIKE ?`;
            params.push(`%${searchValue}%`);
        } else if (searchType === 'applianceType') {
            query += ` AND a.ApplianceType LIKE ?`;
            params.push(`%${searchValue}%`);
        } else if (searchType === 'brand') {
            query += ` AND a.Brand LIKE ?`;
            params.push(`%${searchValue}%`);
        } else {
            return NextResponse.json({ error: 'Invalid search type' }, { status: 400 });
        }

        //runs the sql query on the database 
        const [rows] = await pool.query(query, params);


        //if 0 then no found 
        if (rows.length === 0) {
            return NextResponse.json(
                { message: 'No matching appliance found!', appliances: [] },
                { status: 404 }
            );
        }
//or send the appliance with key name appliance 
        return NextResponse.json({ appliances: rows }, { status: 200 });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Search failed - server error' },
            { status: 500 }
        );
    }
}