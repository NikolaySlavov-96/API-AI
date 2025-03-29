import OpenAI from 'openai';
import { IMessageType, ISendRequestConfig } from '../types';

const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export const openAI = async (data: ISendRequestConfig, messages: IMessageType[]) => {
    try {
        const response = await openai.chat.completions.create({
            model: data.model,
            messages,
            max_tokens: data.maxTokens,
            // store: true, // ?? review
        });

        const responseContent = response.choices[0].message;
        return {
            role: responseContent.role,
            content: responseContent.content,
            outputToken: response.usage?.completion_tokens,
            inputToken: response.usage?.prompt_tokens
        };
    } catch (error) {
        console.log("🚀 ~ openAI ~ error:", error)
    }
}