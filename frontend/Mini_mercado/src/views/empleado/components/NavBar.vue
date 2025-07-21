<template>
  <nav class="navbar">
    <div class="logo_para_navbar">
      <logo_con_link></logo_con_link>
    </div>
    <ul class="nav_links">
      <li>
        <router-link to="/empleado" class="nav_item" exact-active-class="active">
          <div class="nav_item_individual">
              <i class="fa-solid fa-house"></i>
              <span class="text">Home</span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/empleado/consulta_inventario" class="nav_item" active-class="active">
          <div class="nav_item_individual">
            <i class="fa-solid fa-warehouse"></i>
            <span class="text">Consulta al Inventario</span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/empleado/atencion_cliente" class="nav_item" active-class="active">
          <div class="nav_item_individual">
            <i class="fa-solid fa-calendar-week"></i>
            <span class="text">Atención al Cliente Suscriptor</span>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import logo_con_link from '@/modules/logo_con_link.vue';
</script>

<style scoped>
.navbar {
  width: 280px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 25px 15px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;
}

.logo {
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}


.logo_para_navbar{
  width: 100%;
  max-width: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav_links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav_item {
 display: flex;
  align-items: center;
  padding: 14px 20px;
  margin: 10px 3px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #018175;
  font-weight: 500;
  text-decoration: none;
}

.nav_item:hover {
  background: #10b68d;
  color: white;
}

.nav_item.active {
  background: #10b68d;
  color: white;
  font-weight: 600;
}

.nav_item_individual{
  display: flex;
  align-items: center;
}

.nav_item_individual i{
  margin-right: 10px;
}

.icon{
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.text {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .navbar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .nav_links {
    display: flex;
    overflow-x: auto;
  }
  
  .nav_item {
    flex-direction: column;
    padding: auto;
  }
  
  .text {
    font-size: 0.8rem;
  }
}
</style>