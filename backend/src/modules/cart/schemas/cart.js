
export function defineCart(sequelize, DataTypes) {

    const Cart = sequelize.define("Cart", {
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
        tableName: "carts"
    });

    return Cart;
}