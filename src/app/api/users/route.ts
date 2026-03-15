import { CreateUserBody } from '@/types/user';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
import { prisma } from '@/libs/prisma';

// not in use right now
export async function GET(request: Request) {
    try {
        return NextResponse.json({
            message: 'This is a simple GET route for Next.js'
        });
    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({
            status: 500,
            message: 'An internal server error has occurred'
        }, { status: 500 });
    }
}

// creates new user
export async function POST(request: Request) {
    try {

        const body: CreateUserBody = await request.json();
        const isUserExist = await prisma.user.findUnique({ where: { email: body.email } });

        if (isUserExist) {
            return NextResponse.json({
                status: 409,
                message: "User is already exist",
            }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                username: body.username
            }
        });

        return NextResponse.json({
            status: 200,
            message: newUser,
        }, { status: 200 })

    } catch (error) {

        return NextResponse.json({
            status: 500,
            message: error
        }, { status: 500 });

    }
}

npm run de