import { defineUser } from "../modules/user/register/schemas/user.js";
import { defineRole } from "../modules/role/schemas/role.js";
import { defineCart } from "../modules/cart/schemas/cart.js";
import { defineCartItem } from "../modules/cart-item/schemas/cart-item.js";
import { defineProduct } from "../modules/product/schemas/product.js";
import { defineCategory } from "../modules/category/schemas/category.js";
import { sequelize } from "../config/dataBase.js";
import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";

// definimos los modelos de la base de datos
const User = defineUser(sequelize, DataTypes);
const Role = defineRole(sequelize, DataTypes);
const Cart = defineCart(sequelize, DataTypes);
const CartItem = defineCartItem(sequelize, DataTypes);
const Product = defineProduct(sequelize, DataTypes);
const Category = defineCategory(sequelize, DataTypes);

// establecemos las relaciones entre las entidades
User.belongsTo(Role, { foreignKey: "rol_id", as: "role" });
Role.hasMany(User, { foreignKey: "rol_id", as: "users" });

Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Cart, { foreignKey: "user_id", as: "carts", onDelete: 'CASCADE' });

CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart" });
Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "cartItems", onDelete: 'CASCADE' });

CartItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Product.hasOne(CartItem, { foreignKey: "product_id", as: "cartItem" });

Product.belongsTo(Category, { foreignKey: "categoria_id", as: "category" });
Category.hasMany(Product, { foreignKey: "categoria_id", as: "products" });

// Exportamos los modelos para que puedan ser utilizados en otros módulos
export {
    sequelize,
    Sequelize,
    User,
    Role,
    Cart,
    CartItem,
    Product,
    Category,
};