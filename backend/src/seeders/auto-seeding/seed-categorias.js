import { Category } from '../../models/index.js';

export async function seedCategories() {
  const categories = [
    {name:'Lácteos',image:"https://infoalimentos.org.ar/images/temas/el_rol_del_consumidor/TEMAS_lacteos_interna_horiz_840x410.jpg"},
    {name:'Frutas y Verduras',image:"https://mejorconsalud.as.com/wp-content/uploads/2021/04/frutas-verduras-colores.jpg"},
    {name:'Carnicería',image:"https://agroproyectos.org/wp-content/uploads/2022/12/carniceria-negocio.jpg"},
    {name:"Abarrotes",image:"https://i.pinimg.com/736x/28/8d/5b/288d5bd82a0c1a15b7aa14f0b685cfbf.jpg"},
    {name:"Bebidas",image:"https://cursosmultimedia.es/wp-content/uploads/2021/03/las-bebidas-portada.jpg"},
    {name:"Snacks y Dulces",image:"https://i.pinimg.com/736x/2e/1c/14/2e1c14ee2f47d84f285c267470033b2f.jpg"},
    {name:"Limpieza",image:"https://cdn.shopify.com/s/files/1/0009/2304/1844/files/Cleaning_products_with_wook_background_1024x1024.png?v=1632247524"}
];
  for (const categoryData of categories) { 
    await Category.findOrCreate({
      where: { name: categoryData.name }, 
      defaults: categoryData 
    });
  }
}
