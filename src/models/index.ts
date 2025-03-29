import { Sequelize, } from 'sequelize';

import { initNewConnection, } from '../config';

const sequelize = initNewConnection();

import { UserFactory, } from './_UserModel';
import { MessageFactory, } from './_MessageModel';
import { PromptFactory } from './_PromptModel';
import { PromptCostFactory } from './_PromptCostModel';
import { PromptMessageFactory } from './_PromptMessageModel';
import { UserPromptFactory } from './_UserPromptModel';

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserFactory(sequelize);
db.Message = MessageFactory(sequelize);
db.Prompt = PromptFactory(sequelize);
db.PromptCost = PromptCostFactory(sequelize);
db.PromptMessage = PromptMessageFactory(sequelize);
db.UserPrompt = UserPromptFactory(sequelize);

// Association
db.Prompt.hasOne(db.PromptCost, { foreignKey: 'promptId' });
db.PromptCost.belongsTo(db.Prompt, { foreignKey: 'promptId' });

db.User.hasMany(db.UserPrompt, { foreignKey: 'userId' });
db.UserPrompt.belongsTo(db.User, { foreignKey: 'userId' });

db.Prompt.hasMany(db.UserPrompt, { foreignKey: 'promptId' });
db.UserPrompt.belongsTo(db.Prompt, { foreignKey: 'promptId' });

db.Message.hasOne(db.PromptMessage, { foreignKey: 'messageId' });
db.PromptMessage.belongsTo(db.Message, { foreignKey: 'messageId' });

db.Prompt.hasOne(db.PromptMessage, { foreignKey: 'promptId' });
db.PromptMessage.belongsTo(db.Prompt, { foreignKey: 'promptId' });

export default db;