
export function defineProduct(sequelize, DataTypes) {

    const Product = sequelize.define("Product", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock_min: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oferta: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'categoria_id'
            }
        },
    }, {
        timestamps: true,
        tableName: "products",
        indexes: [
            {
                fields: ['name'] 
            },
            {
                fields: ['price'] 
            },
            {
                fields: ['categoria_id'] 
            }
        ]
    });

    return Product;
}