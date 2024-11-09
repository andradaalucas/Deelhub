// import { OpenAI } from "openai";
// import { StreamingTextResponse } from "ai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Simulación de mensajes como si fueran respuestas de OpenAI
//   const simulatedMessages = [
//     { role: "assistant", content: "Hola, ¿en qué puedo ayudarte hoy?" },
//     {
//       role: "assistant",
//       content: "Soy un asistente virtual y puedo ayudarte con preguntas.",
//     },
//     {
//       role: "assistant",
//       content: "También puedo ofrecerte ejemplos de código y mucho más.",
//     },
//   ];

//   const stream = new ReadableStream({
//     async start(controller) {
//       // Enviar un mensaje a la vez, con un pequeño retraso simulado
//       for (const message of simulatedMessages) {
//         // Retraso simulado entre respuestas
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo de retraso

//         // Enviar el mensaje al controlador del stream
//         controller.enqueue(JSON.stringify(message));

//         // Si deseas agregar un retraso entre los fragmentos de texto, puedes hacerlo aquí.
//       }

//       controller.close();
//     },
//   });

//   const simulationResponse = new Response(stream, {
//     headers: { "Content-Type": "application/json" }, // Asegúrate de usar JSON
//   });

//   return simulationResponse;
// }
