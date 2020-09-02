<template >

  <v-app  >
    <v-content
    id="boxPrincipal"
    >
      <v-layout class="row" id="cajalogo" >
        <v-flex id="containair" xs12
          >
          <div id="transparente">

        <v-btn id="closeSesion" style="margin-left:1190px;margin-top:2px;   background:rgb(27, 29, 31);  z-index: 205;
  position: absolute;
  opacity: 1;" >
          <router-link to="/login" id="cerrarRef">Cerrar sesion</router-link>
        </v-btn>

          </div>
          
      
          <router-link  style="margin-left:1250px;margin-top:70px;z-index: 205;  position: absolute;  opacity: 1;text-decoration:none" to='/helpPage' id="closeSesion2" ><v-icon color="#fff">fas fa-hands-helping</v-icon>  </router-link>
    
          <img src="./views/logo005.png" alt="" color="rgb(0, 0, 0)"/>
        </v-flex>
      </v-layout>
      <router-view />

    </v-content>
 <footer id="pie_page">
<span> <strong> <a href="https://kolectiv.tech" target="_blank" style="color:#000">Kolectiv</a> </strong> 2020 | Derechos Reservados &copy;  </span>
<p> <strong>Version  </strong> 0.1.3</p>
</footer>
  </v-app>
</template>

<script>
import {hepWord} from './main'
export default {
  name: "App",

  data: () => ({
    hepWord1:null
  }),
  mounted(){  setTimeout(_=>{this.hepWord1=hepWord[0]},1300)},
created(){



var ruta=window.location.pathname.split("").splice(0,10).join("");
var logo=document.getElementById("logo");


},

};

</script>
<style scoped>
.theme--light.v-application{
    background:rgb(31, 34, 36);
    margin: 0;
}
#transparente{
  background:rgb(31, 34, 36);
  position: absolute;
  width:100%;
  height:160px;
  z-index: 201;
  opacity: 0.5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
}

div {
  position: static;
  height: 79px;
}
div img {
  margin-left: 0px;
  width: 100%;
  height: 160px;
  background: #919891;
  position: relative;
  background: rgb(80, 78, 78);
z-index: 200;
flex-wrap: nowrap;
}
#pie_page{
clear: both;
text-align: center;
}
#cerrarRef{
  color:#fff;
  font: bold 10px verdana;

}
h1 {
  margin-top: 89px;
  color: rgb(19, 16, 14);
  text-shadow: 7px 1px 7px rgb(90, 90, 89);
}

@keyframes animation{
  0%{
left: 15%;
  }
  15%{
left: 30%;
  }
}

</style>
