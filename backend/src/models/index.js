import { defineUser } from "../modules/user/register/schemas/user.js";
import { defineRole } from "../modules/role/schemas/role.js";
import { defineCart } from "../modules/cart/schemas/cart.js";
import { defineCartItem } from "../modules/cart-item/schemas/cart-item.js";
import { defineProduct } from "../modules/product/schemas/product.js";
import { defineCategory } from "../modules/category/schemas/category.js";
import { sequelize } from "../config/dataBase.js";
import { DataTypes } from "sequelize";

// definimos los modelos de la base de datos
const User = defineUser(sequelize, DataTypes);
const Role = defineRole(sequelize, DataTypes);
const Cart = defineCart(sequelize, DataTypes);
const CartItem = defineCartItem(sequelize, DataTypes);
const Product = defineProduct(sequelize, DataTypes);
const Category = defineCategory(sequelize, DataTypes);

// establecemos las relaciones entre las entidades
User.belongsTo(Role, { foreignKey: "rol_id" });
Role.hasMany(User, { foreignKey: "rol_id" });

Cart.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Cart, { foreignKey: "user_id" });

CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
Cart.hasMany(CartItem, { foreignKey: "cart_id" });

CartItem.belongsTo(Product, { foreignKey: "product_id" });
Product.hasOne(CartItem, { foreignKey: "product_id" });

Product.belongsTo(Category, { foreignKey: "categoria_id" });
Category.hasMany(Product, { foreignKey: "categoria_id" });

// Exportamos los modelos para que puedan ser utilizados en otros módulos
export {
    User,
    Role,
    Cart,
    CartItem,
    Product,
    Category,
};