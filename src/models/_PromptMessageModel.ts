import { DataTypes, Model, Optional, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IPromptMessageAttributes, } from './models.interface';

interface IOptionalAttributes extends Optional<IPromptMessageAttributes, 'id'> { };

class PromptMessage extends Model<IPromptMessageAttributes, IOptionalAttributes> implements IPromptMessageAttributes {
    declare id: number;
    declare promptId: number;
    declare messageId: number;
}

export const PromptMessageFactory = (sequelize: Sequelize): typeof PromptMessage => {
    PromptMessage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        promptId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        messageId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: postgresModelNames.PROMPT_MESSAGE,
    });

    return PromptMessage;
};