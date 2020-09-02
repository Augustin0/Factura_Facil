<template>
<div class="fijo">
<v-layout  class="row align-center margen">
<header class="padre">
<nav  class="ordenNav">
<div  class="box_btn"  style="align-self: center;margin-left:20px">
<router-link tag="button" to="/agregar" class="nav" value="favorites" id="agregar" >
AGREGAR CLIENTE
</router-link>
</div>

<div class="box_btn">

<router-link tag="button" to="/clientes" class="nav" id="clientes">
CLIENTES
</router-link>
</div>

<div class="box_btn buscar">

<div class="busqueda">
   <v-text-field
   id="campoSerch"
   v-model="busqueda"
   :value="busqueda"
   rounded
   class="#fff darken-2">
  </v-text-field>
  </div>
  <div class="box_btn icono" >
<v-btn color="#FFF" >
<router-link  :to="component+busqueda"  @click="buscar()"> 
<v-icon  id="busqueda" >fas fa-search</v-icon>
</router-link>

</v-btn>
</div>
</div>
 </nav>
</header>
</v-layout>

<v-layout class="presentacion">
<router-view/>

</v-layout>
</div>
</template>

<script>
export default {

  data(){

    return{

ruta:window.location.pathname,
busqueda:"",
component:"/clientes/"

}
  },
  created(){
    document.onselectstart=_=>false
       document.onmousedown=_=>false
   var boton=document.getElementById("closeSesion").style.display="block";
 var boton=document.getElementById("closeSesion2").style.display="block";

   }
   }
</script>
<style  scoped>
header{
display: flex; 
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
margin-top: 50px;
width: 100%;
height: 70px;
background: rgb(204, 204, 204);

}
nav{
align-self: center;
  height:60px;
  width: 100%;
  padding: 10px;
  display: flex;
 flex-direction: row;
 justify-content: space-between;
flex-wrap: nowrap;
  background: rgb(105, 105, 105);
 
}
nav div{
align-self: center;}
button.nav{
color:#fff;
font:bold 15px verdana;
background: rgb(59, 56, 56);
width: 200px;
height: 50px;
border-radius: 15px;
}

nav div.buscar .busqueda{
width: 150px;
height: 50px;
border-radius: 15px;
text-align: center;
font-style: normal;
font-size: 10px;
background: #fff;

}
.presentacion{
  background:#919891;
  
}
nav div.buscar{
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
width: 400px;

height: 60px;}
nav div.buscar div.icono{
margin-top: 25px;
  width: 150px;
  height: 60px;
}
.fijo{
position:static;
  background:#fff;

}
.margen{
  margin-top: 80px;
}
</style>
