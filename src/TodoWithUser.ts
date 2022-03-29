import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
export const sequelize = new Sequelize('sqlite::memory:')
export class TodoWithUser extends Model<InferAttributes<TodoWithUser>, InferCreationAttributes<TodoWithUser>> {
    declare id: CreationOptional<number>
    declare note: string
    declare username: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

TodoWithUser.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
},
    {
        sequelize,
        tableName: 'todo_with_users'
    })
