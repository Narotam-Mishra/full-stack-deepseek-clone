
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if(!userId){
            return NextResponse.json({ success: false, message: "User not authenticated", })
        }

        // connect to database and fetch all chats for the user
        await connectDB();
        const userChatData = await Chat.find({ userId });

        return NextResponse.json({ success: true, userChatData });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}