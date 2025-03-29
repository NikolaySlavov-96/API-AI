import { Request } from 'express';

import { openAI, anthropicAI } from '../providersServices';

import { IMessageType, ISendRequestConfig, TProviders } from '../types';

import db from '../models';
import { IMessageAttributes, IPromptMessageAttributes, IUserPromptAttributes, IPromptAttributes } from '../models/models.interface';

const PROVIDERS: TProviders = {
    'anthropic': anthropicAI,
    'openAI': openAI,
};

const PROMPT_ROLE = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user',
};

export const verifyPromptExist = async (promptId: string) => {
    const isPromptExist = await db.Prompt.findOne({ where: { id: promptId } });
    if (!isPromptExist) {
        return false;
    }
    return true;
};

interface IMessageResponse extends IPromptMessageAttributes {
    Message: IMessageAttributes;
}
export const sendAiRequestToProvider = async (data: ISendRequestConfig, body: Request['body']) => {
    try {
        const { message: content, promptId } = body;

        const promptsByPromptId: IMessageResponse[] = await db.PromptMessage.findAll({
            where: { promptId },
            include: [
                {
                    model: db.Message,
                    // attributes: ['id'],
                    require: false,
                }
            ],
            raw: true,
            nest: true,
        })
        const userOldMessages = promptsByPromptId.map((mss) => {
            return {
                content: mss?.Message?.content,
                role: mss?.Message?.role
            }
        })

        const userMessageFormat: IMessageType = { role: "user", content };
        userOldMessages.push(userMessageFormat);

        // Request to OpenAI provider (OpenAI, Anthropic)
        const result = await PROVIDERS[data.provider](data, userOldMessages);

        // Save userMessage into DB
        const userMessageDBResult = await db.Message.create({ ...userMessageFormat, tokenCost: result.inputToken })
        const messageIdUser = userMessageDBResult.dataValues.id;
        await db.PromptMessage.create({ promptId, messageId: messageIdUser });

        // Save BotResponse into DB
        const botMessageResultDBResponse = await db.Message.create({ role: result.role, content: result.content, tokenCost: result.outputToken })
        const messageIdBotResponse = botMessageResultDBResponse.dataValues.id;
        await db.PromptMessage.create({ promptId, messageId: messageIdBotResponse });

        // Update promptCosts
        const promptCostRecordResult = await db.PromptCost.findOne({ where: { promptId } });
        await promptCostRecordResult.increment({
            totalInputCost: Number(result.inputToken),
            totalOutputCost: Number(result.outputToken)
        })

        return { content: result.content };
    } catch (error) {
        console.log("🚀 ~ sendAiRequestToProvider ~ error:", error)
    }
};

export const createPrompt = async (body: Request['body']) => {
    // Create Prompt
    const createPromptResult = await db.Prompt.create({ name: body.promptName });
    const promptId = createPromptResult.dataValues.id;

    // Create record in PromptCost table
    await db.PromptCost.create({ promptId, totalInputCost: 0, totalOutputCost: 0 });

    await db.UserPrompt.create({ userId: body.userId, promptId });

    return { status: 200, promptData: { promptId } };
};

interface IAllPrompts extends IUserPromptAttributes {
    Prompt: IPromptAttributes;
}
export const getAllPrompts = async (userId: string) => {
    const result: IAllPrompts[] = await db.UserPrompt.findAll({
        where: { userId },
        include: [
            {
                model: db.Prompt,
                attributes: ['id', 'name'],
                require: false,
            }
        ],
        raw: true,
        nest: true,
    });

    const filterResult = result.map(pr => pr.Prompt);
    return filterResult;
};