<template>
<v-layout 

 class="row"

 
 >
 <v-flex XS12>

    <!--BOX MESSAGE ERROR-->
<div v-show="noData" id="tabla_datos2" style="background:#ccc; color:red;  text-align: center;" @load="borrarFac()" > <h1 style="padding:6em; color:#000">

 <p style="text-align:center;width:75%;margin-top:5px"> CARGANDO LOS DATOS   <v-icon id="iconLoad">fas fa-redo </v-icon></p>
</h1> </div>
  <div   id="tabla_datos" style="background:#ccc; color:red;  text-align: center;" 
  v-show="messageError" 
   >
<h1 style="padding:5em; color:#000">
   0 Factura Registrada

</h1>
    </div>
<v-card
  
    class="mx-auto text-center"
    height="500px"
    width="100%"
    v-for="factura in facturas"
    :key="factura"
  >
 <v-dialog
v-model="mensageFacturaEliminada"
  max-width="500" 
  draggable="enable"
>
<v-card     style="border:5px solid ">
<v-card-title  class="arck" style="background:#ccc;font:bold 25px verdana; padding:20px;">ALERTA FACTURA-FACIL</v-card-title>
<v-card-text style="background:#363333;color:#fff;font:bold 15px verdanca; padding:20px;"> FACTURA  ELIMINADA CON ÉXITO
 </v-card-text>
<v-spacer></v-spacer>

<v-card-actions  style="background:#ccc; padding:5px; ">
</v-card-actions>
</v-card>


</v-dialog>
 <v-dialog
v-model="caragando"
  max-width="300" 
  draggable="enable"
  style="text-align: center!important;overflow=hidden!important;"
>
<v-card     style="border:5px solid ;overflow=hidden!important;">

<v-card-title  class="arck" style="height: 1.9em;  background:#fff;font:bold 25px verdana; padding:0px;text-align:center;"> <p style="text-align:center;width:100%;margin-top:5px"> CARGANDO  <v-icon id="iconLoad">fas fa-redo </v-icon></p></v-card-title>
</v-card>
</v-dialog>

<!--CUADRO EMERGENTE DE BUSQUEDA-->
<v-dialog
v-model="faildSearch"
  max-width="500" 
  draggable="enable"
>
<v-card     style="border:5px solid ">
<v-card-title  class="arck" style="background:#ccc;font:bold 25px verdana; padding:20px;">ALERTA FACTURA-FACIL</v-card-title>
<v-card-text style="background:#363333;color:#fff;font:bold 15px verdanca; padding:20px;">
 NO HAS REGISTRADO FACTURAS CON  ESTA FECHA PARA {{infoClient[0].nombre.toUpperCase()}}
 </v-card-text>
<v-spacer></v-spacer>

<v-card-actions  style="background:#ccc; padding:5px; ">
</v-card-actions>
</v-card>


</v-dialog>
  <v-dialog
  v-model="dialogoBusqueda"
  max-width="900"
>
<v-card    
 style="border:5px solid; height:250px;"
>
<v-card-title
  class="arck" style="background:#ccc;font:bold 15px verdana; padding:20px;"
  >
  BUSCAR FACTURA POR FECHA DE CREACION
  </v-card-title>

<v-card-text style="background:#fff;font:bold 15px verdanca; padding:15px;">

<v-form>

<v-text-field
  style="width:100%!important; float:left;  margin-bottom:25px;"
  color="rgb(59, 56, 56)"  
  v-model="fechaBusqueda"
  outlined
  type="date"
  label="Fecha"
>
</v-text-field>
  <p @click="buscar(fechaBusqueda)" style="float:right;margin-top:15px;font:bold 15px verdana;width:90px;">
  
   <router-link :to="path" style="text-decoration-style:double!important;text-decoration: underline;text-decoration-color:black;float:right;margin-top:10px;font:bold 15px verdana;width:90px;color:#363333">BUSCAR</router-link> 

  </p>

   <p @click="borrarFac()" style="float:left;margin-top:15px;font:bold 15px verdana;">

   <router-link :to="path"  style="text-decoration-style:double!important;text-decoration: underline;text-decoration-color:black;float:right;margin-top:10px;font:bold 15px verdana;width:90px;color:#363333;width:100%">   VER TODAS LAS FACTURAS </router-link> 
  </p>
</v-form>
 </v-card-text>
</v-card>


</v-dialog>
    <v-navigation-drawer
     class="colorFondo"
      dark
      width="100%"
      permanent
    :id="facturas.id" 
    color="rgb(251, 251, 251);"
    ><!--Posible errr-->
          <template>
      <v-layout class="fondoTitulo">
        
<v-flex  xs12>
<router-link to="/menu">
<img src="./logo005.png" alt="logo" id="cabecera" @click="cargarClientes()">

</router-link>
</v-flex>
<!--Option next facturas-->
 <div class="optionBTN3 serchOp">
<div @click="dialogoBusqueda=true"><v-icon class="rotacion3" >fas fa-search</v-icon></div>
  </div>
<!--Option next facturas-->
 <div class="optionBTN nextFac">
<div @click="aumentar()"><v-icon class="rotacion2" id="positivo" >fas fa-angle-double-right</v-icon></div>
  </div>
<!--Option preview facturas-->

    <div class="optionBTN2 preFac">
<div  @click="minimizar()"><v-icon class="rotacion2 rotacionLeft" id="negativo">fas fa-angle-double-left</v-icon></div>
   </div>

<!--Option button-->
   <div class="optionBTN">
<div  @click="options=!options" ><v-icon class="rotacion">fas fa-cog</v-icon></div>

   <div class="cajaOptions" v-show="options">

<v-btn class="red span"  >
  <router-link  :to="redirect+infoClient[0].id">
<v-icon color="#fff" class="basura"  @click="borrarFac(facturas[position].id),options=false,fac=facturas[position].id" >fas fa-trash</v-icon>
  </router-link>
</v-btn>

<v-btn 
:value="facturas.id" color="blue" 
>
<router-link :to="impresion+star+facturas[position].id">
  Imprimir
</router-link>

  <v-icon>fas fa-print</v-icon>
</v-btn>
</div>

</div>
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
 <div class="terciaria">

<table class="terciaria">
<tr>
<th>FECHA:</th>
<td>
  {{facturas[position].fecha}}
<hr>

</td>



</tr>
<tr>
<th>CONDICIONES:</th>
<td>
  {{facturas[position].condiciones}}

<hr>

</td>



</tr>
<tr>
<th>CRÉDITO FISCAL:</th>
<td>
  {{facturas[position].creditoFiscal}}

<hr>
</td>


</tr>
</table>
 </div>
</table>


       <table class="principal">
  <tr  id="t-header">

    <th scope="col ancho" 
    style="
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
    width:19%">ITBIS {{facturas[position].itbis}}%</th>

  </tr>
  <tr>
    <td class="largo">{{facturas[position].cantidad}}</td>
    <td class="largo">{{facturas[position].precio | currency}}</td>
    <td class="largo" ><p>{{facturas[position].description }}</p></td>
    <td class="largo">{{facturas[position].subTotal | currency}}</td>
    <td class="largo">{{facturas[position].subTotal * (facturas[position].itbis/100) | currency}}</td>

  </tr>
   <tr>
    <td ></td>
    <td ></td>
    <td ></td>
    <td></td>
    <td class="titulo">{{facturas[position].total |currency({
             name:'currency',
       symbol:'Total RD$:',
       thousandsSeparator:',',
       fractionSeparator:'.',
       fractionCount:2,
       symbolPosition:'front',
       symbolSpacing:true

      
      
      })}}</td>

  </tr>

       </table>

       


       <section id="preFooter">


<div class="anchoPreFooter" id="boxRecibida">
  
 <p class="linea" ></p>
<hr>
<p style="text-align:center">Recibida</p>
</div>

<div class="anchoPreFooter" id="selloBox">
  <img src="./sello.jpg" alt="Sello" id="sello">
</div>

<div class="anchoPreFooter" id="boxFirma" >
  
  <img src="./firma.png"  alt="firma" id="firma">
  
   <p class="linea"></p>
<hr>
<p style="text-align:center" >Gerente</p>
  </div>
       </section>
  
              

               <template>
            
      <v-layout class="fondoTitulo">

<v-flex  xs12><hr/>
<p class="linea"> </p>

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

<script type="text/javascript">
import $ from'jquery'

//import {imprecion}from'./imprimir'
import pdf from 'jspdf'
import m from './indexDb'
import f from './indexFacturas'
export default {
  name: 'Facturas',
  data () {
    return {
      noData:true,
      mensageFacturaEliminada:false,
      faildSearch:false,
      boxFac:true,
     messageError:false,
      fechaBusqueda:"",
      dialogoBusqueda:false,
      caragando:false,
      options:false,
      path:'',
      position:0,
      facturas:[],
      originalFacturas:[],
      infoClient:[],
      fac:"",
      nombre:"",
      yave: this.$route.params.id,
     impresion:"/impresion/"+this.$route.params.id, 
     rutaBusqueda:"/facturas/"+this.$route.params.id,
    star:"*",
    redirect:"/facturas/"
    }
  
  },
  created () {

  document.getElementById("pie_page").style.display="none"
    document.getElementById("boxPrincipal").style.overflow="hidden";

     let id = this.yave;

     let db2 = m.clientes.result
    
     var almacen = db2.transaction(['Clientes'], IDBObjectStore.mode = 'readonly');

     var solicitud = almacen.objectStore('Clientes')

     let cursol = solicitud.openCursor();

     cursol.onsuccess = e => {

      let cursor = e.target.result

      if (cursor.key == id) {
        this.nombre=cursor.nombre;
        this.infoClient.push(cursor.value);

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
   } }); 
        }
           cursor.continue()
                               }


    let db = f.clientesFac.result;
  
     var almacen = db.transaction(['facturas'], IDBObjectStore.mode = 'readonly')

     var solicitud = almacen.objectStore('facturas')

     solicitud.openCursor().onsuccess = e => {

      let cursor = e.target.result

      if (cursor) {

        if (cursor.value.cliente == this.yave) {
                   this.originalFacturas.push(cursor.value);
                   this.facturas.push(cursor.value);
}   

cursor.continue()        
      }


     }
     setTimeout(_=>{if(this.facturas.length==0){this.messageError=true; }},500)   
     setTimeout(_=>{if(this.facturas){this.noData=false; }},500)   


},

  methods:{
    buscar(fecha){

           var resultSearchDate=[];
setTimeout(_=>{
           var num=this.facturas.length-1;
              this.caragando=true;
          
           this.facturas.map((factura,indice)=> {
             if(factura.fecha==fecha){
              setTimeout(_=>{  resultSearchDate.push(factura);},300) 
      
        }
      });},1000)

setTimeout(_=>{        
 if(resultSearchDate.length>0) {
   this.facturas=resultSearchDate; 
  this.caragando=false;
     this.dialogoBusqueda=false;
     }
           
 else{ this.busquedaAuxiliar(fecha);   }
 
        
 
   if(resultSearchDate.length==1){
document.getElementById("positivo").style.transform="rotate(90deg)";
document.getElementById("negativo").style.transform="rotate(-90deg)";
   }  
},1500)//
},



   busquedaAuxiliar(fecha){

           var resultSearchDate=[];
setTimeout(_=>{
           var num=this.originalFacturas.length-1;

           this.originalFacturas.map((obj,index)=>{


        if(obj.fecha==fecha){
     setTimeout(_=>{   resultSearchDate.push(obj)},300);
     } 


      })},1000);
  setTimeout(_=>{

 if(resultSearchDate.length!=0){ this.facturas=resultSearchDate;  this.dialogoBusqueda=false; this.caragando=false;}  
else{this.faildSearch=true; setTimeout(_=>{this.faildSearch=false;this.caragando=false;},5000); this.dialogoBusqueda=true; }


if(resultSearchDate.length==1){
  document.getElementById("positivo").style.transform="rotate(90deg)";
  document.getElementById("negativo").style.transform="rotate(-90deg)";;
 
   } 

} ,1500)
   
   },

     

aumentar(){
  if(this.position+1<this.facturas.length){
    this.position++;
    document.getElementById("negativo").style.transform="rotate(-360deg)";
     }else{
          document.getElementById("positivo").style.transform="none";
       document.getElementById("positivo").style.transform="rotate(90deg)";

        }
        
        },

minimizar(){
  if(this.position>0){
    this.position--;
    document.getElementById("positivo").style.transform="rotate(360deg)"
    }else{

      document.getElementById("negativo").style.transform="rotate(-90deg)";
      }
      
      },


borrarFac(e){
  if(e){

let db2 = f.clientesFac.result
    var almacen = db2.transaction(['facturas'], IDBObjectStore.mode = 'readwrite')
  .objectStore('facturas')
.delete(e);

this.options=false;

setTimeout(_=>{this.mensageFacturaEliminada=true;   setTimeout(_=>{this.mensageFacturaEliminada=false; },4000) },100);
}  
      setTimeout(_=>{if(this.facturas.length==0){this.messageError=true;  }},1000)

  ///////////ACTUALIZAR LISTA DE FACTURAS REAL TIME \\\\\\\\\
this.facturas=[];


let db = f.clientesFac.result
    var almacen = db.transaction(['facturas'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('facturas')

    solicitud.openCursor().onsuccess = e => {
      let cursor = e.target.result
      if (cursor) {
        if (cursor.value.cliente == this.yave) {

this.facturas.push(cursor.value)
}   

 
       cursor.continue()        
      }


     }

  this.dialogoBusqueda=false;

  aumentar();
   minimizar();
        



},
cargarClientes(){
  setTimeout(_=>{
  document.getElementById("clientes").click();
  //document.getElementById("logo").style.display="block";
  },1000)
}
}

  }
</script>
<style  scoped>
#error{
  text-align: center;
  margin-left:15em;
  width:60px;
  height:55px;
  transform: rotate(90deg);

  background: black !important;
margin-right: 20px;
}
#error:hover{
    width:60px;
  height:55px;
  background: #fff !important;
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

a{
text-decoration: none;
color: #fff;
font:bold 1.1em  verdana;
}


.basura{
  width:400px;
  
}

.basura:hover{
transform: rotate(45deg);
}
.basura:active{
transform: rotate(-180deg);
}

#first_table{
    width: 100%;
height: 8em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
}
.secundaria{
table-layout: fixed;
border-collapse:separate;
text-align: left;
background-color: rgb(251, 251, 251);
font:bold 15px verdana ;
color: #000;
align-self: center;
}


.terciaria{
float: right;
background-color: rgb(251, 251, 251);
text-align: left;
color:black;
font:bold 15px verdana;
align-self: center;

}

footer p{
  margin-top: 0px;
}

button{
width:35%;
height: 45px;
transition: 2s ease-in-out;
}

button:hover{
  height: inherit;
}

.span{
  display: flex;
  flex-direction: row;
align-content: center;
height: 100px;


}


.ancho{

word-wrap:break-word;

}
.centrar{
text-align: center;
background: #119911;
width: 100%;
margin-top: 5px;
color: #fff
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
}
.anchoPreFooter{
width: 33%;
color: black;


}

#sello{

height: 12em;
width: 12em;
border-radius: 100%;
}
#selloBox{
align-self: flex-end;

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

}



.theme--dark.v-sheet{
background: #fff !important;
margin-bottom: 300px!important;

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
}
.optionBTN{
  color: #dadada;
    border-color: rgb(87, 80, 80);
  font:bold 15px verdana;
z-index: 2001;
  width:500px;
margin-left:800px;
position:absolute;
}
.optionBTN2{
    color: #dadada;
    border-color: rgb(87, 80, 80);
  font:bold 15px verdana;
z-index: 2001;
float: left;
  margin-top: 60px;
position:absolute;
margin-left: 30px;
}
.optionBTN3{
    color: #dadada;
    border-color: rgb(87, 80, 80);
  font:bold 15px verdana;
z-index: 2001;
float: left;
 
position:absolute;
margin-left: 30px;
}
.serchOp{
  transform:unset;
  margin-top: 2px;
}

.cajaOptions{
  display: flex;
  flex-direction: row;
  margin-top: 15px;
width: 90%;
  justify-content: space-around;
z-index: 2001;

}
.nextFac{
  margin-top: 60px;
}
.rotacion{
height: 50px;
width: 50px;
border-radius: 100%;
background: #dadada;
color: rgb(0, 0, 0);
float:right;
z-index: 2001;

}
.rotacion:hover{
  transition: 1s ease;
transform: rotate(360deg);
z-index: 2001;

}
.rotacion2{
  height: 50px;
width: 50px;
border-radius: 100%;
background: #dadada;
color: rgb(0, 0, 0);
float:right;
z-index: 2001;
}
.rotacion3{
  height: 50px;
width: 50px;
border-radius: 100%;
background: #dadada;
color: rgb(0, 0, 0);
float:right;
z-index: 2001;
}

.rotacion3:active{

    height: 60px;
width: 60px;
}
.rotacion2:hover{
  transition: 0.5s ease-in-out;
  transform: translateX(10px);
}
.rotacionLeft:hover{
    transition: 0.5s ease-in-out;
  transform: translateX(-10px);
}

.titulo{
  width:100%;
float: right;
background-color: rgb(251, 251, 251);
color: black;
font:bold 1.2em verdana;
}



.linea{
  width: 100%;
  background: #000;
  height: 3px;
  margin: 0px;
}
.pie{
  width: 100%;
  background: rgb(230, 105, 22);
  height: 5px;
  margin: 0px;

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
  clear: both;

}
.chargeAnim{
  font:bold 30px verdana;
}

#iconLoad{
  animation:rotacion 0.5s ease-in-out infinite;
  float: right;
  margin-right: 15px;
  margin-top: 5px;
  color: #000;
}
@keyframes rotacion{
  10%{transform: rotate(52deg);}
  20%{transform: rotate(104deg);}
  30%{transform: rotate(156deg);}
  40%{transform: rotate(208deg);}
  60%{transform: rotate(260deg);}
  80%{ transform: rotate(312deg);}
  100%{ transform: rotate(360deg);} 
}
</style>
