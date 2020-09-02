<template>

<v-layout class="row">
 <v-flex XS12>
    
<v-card
v-for="factura in facturas" :key="factura" 
    class="mx-auto text-center"
    height="65em"
    width="100%"
  >
  
    <v-navigation-drawer
      absolute
     class="colorFondo"
      dark
      width="100%"
      permanent
    :id="factura.id"
    color="rgb(251, 251, 251);"
    >
          <template>
      <v-layout class="fondoTitulo">
        
<v-flex  xs12>
<router-link to="/clientes">
<img src="./logo005.png" alt="logo" id="cabecera"  @click="cargarClientes()">
</router-link>
</v-flex>

   
      </v-layout>

      </template>
 
      <v-list 

      >

          <v-list-item >
          <v-list-item-title>
  <table id="first_table">
 <!--TABLA -->
<!--TABLA CON DATOS PERSONALES  DEL CLIENTE-->
<table class="secundaria">
<tr>
  <th>CLIENTE:</th>
<td>
  {{infoClient[0].nombre}}
<hr>
</td>
</tr>
<tr>

 <th>DIRECCIÓN: </th>

<td>
  {{infoClient[0].direccion}}
  <hr>
</td>

</tr>
<tr>
 
    <th>CIUDAD:</th>

<td>
    {{infoClient[0].ciudad}}

  <hr>
</td>
</tr>
<tr>

 
    <th>TELÉFONO:</th>

<td>
      {{infoClient[0].telefono}}

  <hr>
</td>
</tr>
<tr>
<th v-if="infoClient[0].rnc.length==9">RNC:</th>
<td v-if="infoClient[0].rnc.length==9">
      {{infoClient[0].rnc}}
      <hr/>
</td>
<th v-if="infoClient[0].rnc.length==11">CÉDULA:</th>
<td v-if="infoClient[0].rnc.length==11">
      {{infoClient[0].rnc}}
      <hr/>
</td>
</tr>


</table>


<table class="terciaria">
<tr>
<th>FECHA:</th>
<td>
  {{factura.fecha}}
<hr>
</td>
</tr>
<tr>
<th>CONDICIONES:</th>
<td>
  {{factura.condiciones}}

<hr>

</td>



</tr>
<tr>
<th>CRÉDITO FISCAL:</th>
<td>
  {{factura.creditoFiscal}}

<hr>
</td>


</tr>
</table>

</table>
<table class="principal">
<tr id="t-header">
<th scope="col ancho" style="
    border:1px solid #000;
    font: bold 1em verdana;
    color: #000;
    width:16%">CANTIDAD</th>
   <th scope="col ancho" 
    style="
    border:1px solid #000;
    font: bold 1em verdana;
    color: #000;
     width:16%"
       >PRECIO</th>
     <th scope="col ancho"  
     style="
     border:1px solid #000;
     font: bold 1em verdana;
     color: #000;
     ">DESCRIPCIÓN</th>
    <th scope="col ancho"  
    style="
    border:1px solid #000;
    font: bold 1em verdana;
    color: #000;
    width:16%"

    
    >SUBTOTAL</th>
    <th scope="col ancho"  
    style="
    border:2px solid #000;
    font: bold 1em verdana;
    color: #000;
    width:19%">ITBIS {{factura.itbis}}%</th>

  </tr>
  <tr>
    <td class="largo">{{factura.cantidad}}</td>
    <td class="largo">{{factura.precio|currency}}</td>
    <td class="largo" ><p>{{factura.description}}</p></td>
    <td class="largo">{{factura.subTotal |currency}}</td>
    <td class="largo">{{factura.subTotal * (factura.itbis / 100) | currency}}</td>
    </tr>
   <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td></td>
    <td class="titulo">{{factura.total|currency({
             name:'currency',
       symbol:'Total RD$:',
       thousandsSeparator:',',
       fractionSeparator:'.',
       fractionCount:2,
       symbolPosition:'front',
       symbolSpacing:true

      
      
      })}}</td>
  </tr></table>


       <section id="preFooter">


<div class="anchoPreFooter" id="boxRecibida" >
  
 <p class="linea"></p>
<hr>
<p style="text-align:center">Recibida</p>
</div>

<div class="anchoPreFooter" id="selloBox">
  <img src="./sello.jpg" alt="Sello" id="sello">
</div>

<div class="anchoPreFooter" id="boxFirma">
  
  <img src="./firma.png"  alt="firma" id="firma">
  
   <p class="linea"></p>
<hr>
<p style="text-align:center" >Gerente</p>
  </div>
       </section>
  
  
              

               <template>
            
      <v-layout class="fondoTitulo">

<v-flex  xs12>
  <hr/>
<p class="linea" style="margin:2px;"> </p>
<footer>
<p>Calle Central No. 11, Colonia de los Doctores, Villa Mella, Santo Domingo Norte, República Dominicana</p>
<p> TEL: 809-569-0040 <i class="fas fa-phone"></i> </p>

</footer>

  </v-flex>
      </v-layout>

      </template>

     </v-list-item-title  >
 


        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </v-card>

 </v-flex>

 </v-layout>

</template>

<script>

import m from './indexDb'
import f from './indexFacturas'
export default{
name:"Impresion",
data (){
    return {
      options:false,
facturas:[],
description:[],
      infoClient:[],
      yave: this.$route.params.id,
      nombre: ''.toUpperCase(),
     
redirect:"/clientes/"
    }},

 created () {
  document.getElementById("pie_page").style.display="none"
    document.getElementById("boxPrincipal").style.overflow="visible";
    let db2 = m.clientes.result;
    var almacen = db2.transaction(['Clientes'], IDBObjectStore.mode = 'readonly');
    var solicitud = almacen.objectStore('Clientes');
    let cursol = solicitud.openCursor();
    let id = this.yave.split("*")[0];
    cursol.onsuccess = e => {
      let cursor = e.target.result
      if (cursor.key == id) {
        this.nombre = cursor.value.nombre
        this.infoClient.push(cursor.value)
     this.infoClient.map((o,i)=>{
   
   if(!o.telefono.match(/[-,')','(']/)){
    
        if(o.telefono.length==10) {
           var p1=o.telefono.toString().split("").splice(0,3);
           var p2=o.telefono.toString().split("").splice(3,3);
          var p3=o.telefono.toString().split("").splice(6,4);

          o.telefono="("+p1.join("")+")"+p2.join("")+"-"+p3.join("");
       }else{

         o.telefono="Numero de telefono mal formado"
}
   }

}
) 
     
      }
          cursor.continue()
}

let db = f.clientesFac.result;
    var almacen = db.transaction(['facturas'], IDBObjectStore.mode = 'readonly')

    var solicitud = almacen.objectStore('facturas')

    solicitud.openCursor().onsuccess = e => {

      let cursor = e.target.result

      if (cursor) {
 if (cursor.value.cliente===id) {

if(cursor.value.id==this.yave.split("*")[1]){

  this.facturas.push(cursor.value)

}

 
}
cursor.continue()


}  


    
    }
document.getElementById("cajalogo").style.display="none";
setTimeout(function(){

window.print();


},1000)

},
methods:{
cargarClientes(){
  setTimeout(_=>{
  document.getElementById("agregar").click();
document.getElementById("cajalogo").style.display="block";


  },500)
}
}
}
</script>

<style scoped >

a{
text-decoration: none;
}



footer p{
  margin-top: 0px;
}


.span{
  display: flex;
  flex-direction: row;
align-content: center;
height: 100px;}

.ancho{
word-wrap:break-word;
}

.principal{
table-layout: fixed;
border-collapse:separate;
text-align: center ;
width: 100%;
background-color: #fff;
margin-top: 2px;
height:350px;
white-space: pre-wrap;
border: 2px solid #000;
word-wrap:break-word;

}

#preFooter{
    margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  height: 12em;
   color: black;
  width: 100%;
  justify-content: space-between;
}
.anchoPreFooter{
width: 33%;
color: black;


}

#sello{

height: 12em;
width: 12em;
border-radius: 100%
}

#firma{

/*50% , 45% , 40%, 30% */
width:50%;


}
#boxFirma{

align-self: flex-end;
}
#boxRecibida{
  align-self: flex-end;
}
.preFooter{
  text-align: center;
  width: 33%;
  color: black;
  width: 33%;

}

.theme--dark.v-sheet{
background: #fff !important;

}
.largo{
  height:330px;
background-color: rgb(251, 251, 251);
color: black;
white-space: pre-wrap;
border:2px solid #000;
word-wrap:break-word;
font:bold 20px italic;
width: 20%;
  font: bold 13px sans-serif;

}
.titulo{
  width:20em;
float: right;
background-color: rgb(251, 251, 251);
color: black;
font:bold 1.2em verdana;

}
#first_table{
    width:100%;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 5px;
 
}
.secundaria{
table-layout: fixed;
border-collapse:separate;
text-align: left;
background-color: rgb(251, 251, 251);
font:bold 15px verdana ;
color: #000;
align-self: center;
padding: 5px;
word-wrap:break-word;
white-space: pre-wrap;
font:bold 15px verdana;

}

.terciaria{
float: right;
background-color: rgb(251, 251, 251);
text-align: left;
color:black;
font:bold 15px verdana;
align-self: center;
padding: 5px;
width: 45%;
table-layout:fixed;
height: 100%;
white-space: pre-wrap;
word-wrap:break-word;
font:bold 15px verdana;
}

.terciaria>tr>td{
  font: bold 12px serif;
  word-wrap:break-word;
}
.secundaria>tr>td{
  font: bold 12px serif;
  word-wrap:break-word;
}

.terciaria>tr>th{
  font: bold 13px serif;

}
.secundaria>tr>th{
  font: bold 13px serif;
}
.linea{
  width: 100%;
  height: 3px;
  margin: 0px;
}
.pie{
  width: 100%;
  background: rgb(230, 105, 22);
  height: 5px;
  margin: 0px;
}

#sello{

height: 150px;
width: 150px;
border-radius: 100%
}
#selloBox{
align-self: flex-end;
}


.colorFondo{
background-color: rgb(251, 251, 251)!important;

}
.fondoTitulo{
background: rgb(231, 223, 223)

}

footer{
  position: absolute;
  color: #0a160a;
  background: #fff;
  text-align: center;
  font: 15px bold italic;
  width: 100%;
  height: 55px;
  margin-top: 3px;
  margin-bottom: 0;
    display:flex;
  flex-direction:column;
  justify-content:center;
  align-content:center;
  flex-wrap:nowrap;
}
#cabecera{
    margin-left:0px;
  width:100%;
  height: 140px;
background:#919891;
}
#t-header{
width: 100%;
}
</style>