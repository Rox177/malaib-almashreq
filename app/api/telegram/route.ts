export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.ADMIN_CHAT_ID;

    console.log("Bot token:", token?.slice(0, 10));
    console.log("Chat ID:", chatId);

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const data = await response.json();

    console.log("Telegram response:", data);

    return Response.json(data);
  } catch (error) {
    console.error("Telegram Error:", error);

    return Response.json(
      { error: "Failed to send telegram message" },
      { status: 500 }
    );
  }
}
