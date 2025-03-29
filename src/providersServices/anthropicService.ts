import { Anthropic } from '@anthropic-ai/sdk';
import { IMessageType, ISendRequestConfig } from '../types';
import { ContentBlock } from '@anthropic-ai/sdk/resources';

const { ANTHROPIC_API_KEY } = process.env;

const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
});

export const anthropicAI = async (data: ISendRequestConfig, messages: IMessageType[]) => {
    try {
        const response = await anthropic.messages.create({
            model: data.model,
            max_tokens: data.maxTokens,
            messages,
        });

        const textContent = response.content.find(block => 'text' in block && typeof block.text === 'string') as { text: string } | undefined;
        return {
            content: textContent?.text,
            role: response.role,
            outputToken: response.usage.output_tokens,
            inputToken: response.usage.input_tokens
        };
    } catch (error) {
        console.log("🚀 ~ anthropicAI ~ error:", error)
    }
}