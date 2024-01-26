import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/users/schema";

//request is needed to prevent cacheing
export function GET(request: NextRequest) {
    return NextResponse.json([
        {id: 1, name: 'Mosh'},
        {id: 2, name: 'Rohit'}
    ])
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    // if invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    
    return NextResponse.json(body, {status: 201})
}