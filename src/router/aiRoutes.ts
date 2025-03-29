import { Router, } from 'express';

import { sendRequest, getAiModels, createUserPrompt, getAllUserPrompts } from '../controllers/aiController';

const ai = Router();

ai.get('/models',
    getAiModels,
);

ai.post('/request',
    sendRequest,
);

ai.post('/createPrompt',
    createUserPrompt,
);

ai.get('/getPrompts/:userId',
    getAllUserPrompts,
);

export default ai;