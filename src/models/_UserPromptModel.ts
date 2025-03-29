import { DataTypes, Model, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IUserPromptAttributes, } from './models.interface';

class UserPrompt extends Model<IUserPromptAttributes> implements IUserPromptAttributes {
    declare userId: number;
    declare promptId: number;
}

export const UserPromptFactory = (sequelize: Sequelize): typeof UserPrompt => {
    UserPrompt.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        promptId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: postgresModelNames.USER_PROMPT,
    });

    return UserPrompt;
};