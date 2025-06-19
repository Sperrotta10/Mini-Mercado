
export function defineCategory(sequelize, DataTypes) {

    const Category = sequelize.define("Category", {
        categoria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: true,
        tableName: "categories"
    });

    return Category;
}