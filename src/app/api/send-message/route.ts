import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import { useStyleRegistry } from "styled-jsx";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not found",
        },
        { status: 404 }
      );
    }
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User not accepting messages",
        },
        { status: 403 }
      );
    }
    const newMessage = { content: content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error encountered while sending message",
      },
      { status: 500 }
    );
  }
}
