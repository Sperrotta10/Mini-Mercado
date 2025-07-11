
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
            unique: false
        },
        image : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: "categories",
        indexes: [
            {
                unique: true,
                fields: ['name'] 
            }
        ]
    });

    return Category;
}