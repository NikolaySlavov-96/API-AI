import { DataTypes, Model, Optional, Sequelize, } from 'sequelize';

import { postgresModelNames } from '../constants';

import { IMessageAttributes, } from './models.interface';

interface IOptionalAttributes extends Optional<IMessageAttributes, 'id'> { }

class Message extends Model<IMessageAttributes, IOptionalAttributes> implements IMessageAttributes {
    declare id: number;
    declare content: string;
    declare role: string;
    declare tokenCost: string;
}

export const MessageFactory = (sequelize: Sequelize): typeof Message => {
    Message.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        tokenCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: postgresModelNames.MESSAGE,
    });

    return Message;
};