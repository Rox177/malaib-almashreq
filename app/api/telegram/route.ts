export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.ADMIN_CHAT_ID;

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

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to send telegram message" },
      { status: 500 }
    );
  }
}
console.log("Bot token:", process.env.TELEGRAM_BOT_TOKEN?.slice(0, 10));
console.log("Chat ID:", process.env.TELEGRAM_CHAT_ID);

const response = await fetch(URL, Option);
const data = await response.json();

console.log("Telegram response:", data);