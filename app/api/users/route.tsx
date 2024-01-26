import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/users/schema";
import prisma from "@/prisma/client"

//request is needed to prevent cacheing
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

// create new user
export async function POST(request: NextRequest) {
    const body = await request.json()

    // validate request
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    // check if user exists
    let user = await prisma.user.findUnique({
        where: {email: body.email}
    });
    if (user)
        return NextResponse.json({error: 'User already exists'}, {status: 400})

    // if doesn't, create new user
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })


    return NextResponse.json(newUser, {status: 201})
}