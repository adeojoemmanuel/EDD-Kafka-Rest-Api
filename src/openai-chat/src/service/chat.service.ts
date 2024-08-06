import OpenAI from "openai";
import { creatServiceCustomer, sendSingleMessage } from './../../../common/kafka/node.kafka.service';
import { SingleMessage } from './../../../common/types';

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error("OpenAI API key is required");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export const generateText = async(prompt: string) => {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });
    if (response.choices && response.choices.length > 0) {
      return response.choices[0].text;
    }
  } catch (error) {
    console.error("Error generating text:", error);
  }
  return null;
}


export const createChatAction = creatServiceCustomer('chat-events', async (message: any) => {
  const { event, user } = JSON.parse(message.value);
  switch (event) {
    case 'chat-prompt':
      const promptMessage: SingleMessage = {
        topic: 'user-events',
        value: JSON.stringify({ event: 'user-registered', user })
      };

      sendSingleMessage('user-events', promptMessage);
      
      console.log(`User : ${user._id} prompt a question`);
      break;
    default:
      console.log('Unknown event');
  }
});

