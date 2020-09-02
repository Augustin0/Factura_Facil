<template>
<div class="contenedor">
 <v-layout  justify-center  class="row align-center" >
     <v-flex  xs12>
         <header id="principaHeader">
<h1>Una mano de ayuda de Factura-Facil </h1>
</header>
</v-flex>
</v-layout>
 <v-layout justify-center class="contenedor">
<v-flex xs12 >
  <v-navigation-drawer
  
  height="500px"
  width= "2000px"
  >
  <v-card
  width="100%"
  height="100%"
  >
   <v-flex xs12 style="margin-top:10px">
 <header style="text-align:center" class="headerHelp"><h2 id="login">INICIO DE SESION </h2></header>
 </v-flex>
 <v-flex xs12 style="margin-top:10px">
 <header class="headerHelp"   > <h3>Ayuda para iniciar sesion paso a paso</h3></header>
  <ul>
     <li>En el campo usuario agrega el usuario por defecto proporcionado por el proveedor de la APP</li>
     <li>En el campo  contraseña agrega la contraseña proporcionado por el proveedor de la APP</li>
     <li>Una vez hecho esto solo haz doble click en el boton <v-btn color="#000"><span style="color:#FFF">INICIAR</span>  <v-icon color="#fff">fas fa-flag</v-icon></v-btn> para acceder a las otras funciones </li>
     <li> <h4>Posibles errores</h4> <ul>
       <li>
                    <v-card color="red" max-width="527px" class="boxErrorUser">
    <span style="color:#fff;margin-right:35px;margin-left:10px" class="iconError">X</span>
   <span style="color:#fff" >El usuario  que has agregado es incorecto</span>

  </v-card>
       </li>
       <li style="margin-top:7px;">
           <v-card color="red" max-width="527px" class="boxErrorUser">
    <span style="color:#fff;margin-right:35px;margin-left:10px" class="iconError">X</span>
   <span style="color:#fff" >La contraseña  que has agregado es incorecta</span>

  </v-card>
       </li>
       <li>En caso de equivocaciones al agregar el usuario  y contraseña las ventanas emergentes te notificaran   </li>
       <li>No te acuerdas de tu usuario y contraseña? Comunicate con el proveedor de la APP</li>       
       
       </ul> </li>
 </ul>
 </v-flex>
  <v-flex xs12 style="margin-top:10px">
 <header style="text-align:center" class="headerHelp"><h2>MANEJO DE CLIENTES EN LA APP</h2></header>
 </v-flex>
  <v-flex xs12 style="margin-top:10px">
 <header class="headerHelp"   > <h3>Ayuda para registrar clientes en la app paso a paso</h3></header>
 <ul>
     <li>Presiona el boton <v-btn><span style="color:#fff">AGREGAR CLIENTE</span> </v-btn> como resultado  abrirá un formulario</li>
     <li>El cliente tiene que contar por lo menos con  uno de los datos que solicita el formulario, de lo contrario tu cliente no se registrara </li>
     <li>El campo telefono requiere 10 digitos con o sin formato </li>
     <li>El campo RNC/CÉDULA requiere 9 digitos en caso de que quieras registrar una rnc , 11 digitos para cédula </li>
     <li>En caso de haber registrado un cliente con los datos incompletos u errorneos  lee <p> Ayuda para modificar datos del clientes en la app paso a paso </p></li>
 </ul>
 </v-flex>
  <v-flex xs12 style="margin-top:10px">
 <header class="headerHelp"> <h3>Ayuda para modificar datos del clientes en la app paso a paso</h3></header>
  <ul>
     <li> <h4> Por cada cliente registrado en la APP tendras la opcion de modificar sus datos</h4>
     <ul>
           <li>Para ver todos los clientes registrados en la APP Presiona el boton <v-btn><span style="color:#fff">CLIENTES</span> </v-btn></li>
      <li>Para ver las opciones pesiona <v-icon>fas fa-cog</v-icon> </li>
      <li>Para proceder a modificar los datos de tu cliente Presiona el boton <v-btn><span style="color:#fff"> MODIFICAR</span><v-icon color="red">fas fa-edit</v-icon> </v-btn> que corresponde a tu cliente </li>
      <li>Abrira un formulario que traera recuerdos de los datos de tu cliente, tendras la libertad de   modificarlos  </li>
      <li>Presiona el boton <v-btn><span style="color:#fff">MODIFICAR </span> <v-icon color="red">fas fa-edit</v-icon></v-btn> para terminar, una venta de la APP te notificara si la operación tubo éxito</li>
      
     </ul>
     </li>
    
 </ul>
 <v-flex xs12 style="margin-top:10px">
 <header class="headerHelp"> <h3>Ayuda para eliminar cliente en la app paso a paso</h3></header>
  <ul>
     <li>  <h4>Eliminar cliente</h4>
        <ul>
           <li>Para ver todos los clientes registrados en la APP Presiona el boton <v-btn><span style="color:#fff">CLIENTES</span> </v-btn></li>
           <li>Para ver las opciones pesiona <v-icon>fas fa-cog</v-icon> </li>

          <li>Para eleiminar el cliente presiona el boton <v-btn><span style="color:#fff"> ELIMINAR</span> <v-icon color="red">fas fa-trash</v-icon></v-btn> correspondinte al cliente que quieres eliminar </li>
        </ul> 
        </li> 
      </ul>
 </v-flex>
 </v-flex>
    <v-flex xs12 style="margin-top:10px">
 <header style="text-align:center" class="headerHelp"><h2>MANEJO DE FACTURAS POR CLIENTE EN LA APP</h2></header>

 </v-flex>
 <v-flex xs12 style="margin-top:10px">
 <header class="headerHelp"   > <h3>Ayuda para crear y registrar factura  paso a paso</h3></header>
   <ul>
      <li>Para ver todos los clientes registrados en la APP Presiona el boton <v-btn><span style="color:#fff">CLIENTES</span> </v-btn></li>
      <li>Para ver las opciones pesiona <v-icon>fas fa-cog</v-icon> </li>
      <li>Presiona el boton <v-btn><span style="color:#fff"> CREAR FACTURA</span></v-btn> abrira un formulario </li>
      <li>El campo fecha es obligatorio </li>
      <li>El campo ITBIS es obligatorio</li>
      <li>Para la descripcion es preferible 155 caracteres (breve) </li>
      <li>Presiona <v-btn><span style="color:#fff">ARCHIVAR</span><v-icon color="#fff">fas fa-save</v-icon></v-btn> dispara una alerta en caso de una operacion exitosa u erronea </li>
 </ul>
 </v-flex>
   <v-flex xs12 style="margin-top:10px">
 <header class="headerHelp"   > <h3>Ayuda para ver facturas registradas paso a paso</h3></header>
   <ul>
      <li>Para ver todos los clientes registrados en la APP Presiona el boton <v-btn><span style="color:#fff">CLIENTES</span> </v-btn></li>
      <li>Para ver las opciones pesiona <v-icon>fas fa-cog</v-icon> </li>
     
     <li>Pra ver las facturas registradas en el el nombre del cliente seleccionado presiona el boton <v-btn><span style="color:#fff">FACTURAS CREADAS </span> <v-icon color="#fff">fas fa-eye </v-icon></v-btn></li>
    <li>Ver siguiente factura presionando <v-icon>fas fa-angle-double-right</v-icon></li>
    <li>Regresar un paso hacia tras <v-icon>fas fa-angle-double-left</v-icon></li>
    <li><H4>Buscar facturas por su fecha de creación</H4>
    <ul>
    <li>Presiona <v-icon>rafs fa-search</v-icon></li>
    <li>Ingresa la fecha con que habias registrado la factura</li>
    <li>Preciona "BUSCAR" para ver todas las facturas registradas con esta fecha</li>
    <li>Para ver todas las facturas , realiza el pazo 1 de este apartado  y luego presiona "VER TODAS LAS FACTURAS"</li>
    
    </ul>
    
    </li>
 </ul>
 </v-flex>
  <v-flex xs12>
   <footer id="pie_page">
<span> <strong> <a href="https://kolectiv.tech" target="_blank" style="color:#000">Kolectiv</a> </strong> 2020 | Derechos Reservados &copy;  </span>
<p> <strong>Version  </strong> 0.1.3</p>
</footer>

  </v-flex>
  </v-card>
</v-navigation-drawer>  
</v-flex>
 </v-layout>
</div>

</template>
<script>
export default {
data(){
  return{
    backDirection:""
  }
}
  ,
  created(){

    
  }
}
</script>

<style scoped>
.contenedor{
    background: rgb(175, 169, 180);
    
    width: 100%;
    
}
#principaHeader{
    text-align: center;
    width: 100%;
    background: rgb(185, 179, 184);
}
.headerHelp>h3{
  margin-left: 25px;
  color: #fff;
}
h1{
    color:#fff  ;
    width: 100%;
}
.headerHelp{
    background: rgb(121, 116, 116);
}
ul{
  width: 100%;
  margin-left: 0px;
  background: rgb(218, 184, 215);
  list-style-type: upper-roman;
  padding: 35px;
}
button{
  background:rgb(47, 43, 43)!important;
}
#pie_page{

  margin-top: 55px;
clear: both;
text-align: center;

}
li{
  font:20px sans-serif;
}
</style>