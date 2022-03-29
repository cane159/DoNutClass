import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
export const sequelize = new Sequelize('sqlite::memory:')
export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    declare id: CreationOptional<number>
    declare note: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Todo.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
},
    {
        sequelize,
        tableName: 'todos'
    })
