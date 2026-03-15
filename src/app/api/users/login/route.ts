import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
import { LoginBody } from '@/types/user';
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    try {
        const body: LoginBody = await request.json();

        const isUserExist = await prisma.user.findUnique({ where: { email: body.email } });

        if (!isUserExist) {
            return NextResponse.json({
                status: 400,
                message: "User is doesnt exist",
            }, { status: 400 })
        }

        const isVerified = await bcrypt.compare(body.password, isUserExist.password);

        if (!isVerified) {
            return NextResponse.json({
                status: 400,
                message: "Wrong password",
            }, { status: 400 })
        }

        const token = jwt.sign({
            userID: isUserExist.id,
            email: body.email,
            username: isUserExist.username,
        }, String(process.env["SECRET_KEY"]));

        return NextResponse.json({
            status: 400,
            token,
            message: "user signed in!"
        }, { status: 200 })

    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({
            status: 500,
            message: 'An internal server error has occurred'
        }, { status: 500 });
    }
}
