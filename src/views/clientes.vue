<template>
<v-layout class="row">
 <v-flex XS12>
<v-card
    class="mx-auto text-center"
    height="650px"
    width="100%"
  
  >

    <v-navigation-drawer
      absolute
     color="#919891"
      dark
      width="100%"
      permanent

    >
      <h1 class="centrar">CARTERA DE CLIENTES</h1>
      <v-list
    v-show="cuerpo"

      >
     <div id="tabla_datos" style="background:#ccc; color:red; " 
    v-if="clientes.length==0" >
<h1 style="padding:5em; color:#000;font-size: 1.5em;">
  La cartera de clientes esta vacia 
  o el cliente que buscas no esta registrado con este nombre.
  Preciona el boton  Agregar para registrar tu primer   cliente o el cliente que buscas  
</h1>

    </div>
  
          <v-list-item 
          
          v-for="cliente in clientes" :key="cliente" >
    
    <table>

<tr>

<th>
   <td>

   <span>{{cliente.nombre.toUpperCase()}}</span>
   
</td>
   <td class="optionsBtn">
<p  @click="vista=!vista"><v-icon class="rotacion">fas fa-cog</v-icon></p> 

</td>
</th>

<td    v-show="vista" >
      <v-btn   v-show="vista"
              class="vuelo optionBTN"
          
           >

            <router-link  :to="path+cliente.id">
              Crear  Factura
            </router-link>

          </v-btn>
      <v-btn 
                         class="vuelo optionBTN"

                    

                      v-show="vista">

            <router-link :to="path2+cliente.id" id="factura">
             Facturas Creadas
                   <v-icon>fas fa-eye</v-icon>
         </router-link>

          </v-btn>
            <v-btn 
         class="vuelo optionBTN" v-show="vista" 
          @click="cuerpo=false">
<router-link :to="path3+cliente.id"  >
Modificar 
</router-link>

<v-icon color="red">fas fa-edit</v-icon>
</v-btn>
 <v-btn 
    class="vuelo optionBTN"

                
                 @click.stop="alerta=true,nombre=cliente.nombre,yave=cliente.id" v-show="vista">
                  Eliminar
                    <v-icon color="red" >fas fa-trash</v-icon>
  </v-btn>



</td>




</tr>
    </table>


        </v-list-item>

      </v-list>

    </v-navigation-drawer>
  </v-card>

 </v-flex>

<!--Alerta al usuario-->  
    <v-dialog
      v-model="alerta"
      max-width="500"
   >
<v-card    style="border:5px solid">

  <v-card-title class="arck" style="background:#ccc;font:bold 25px verdana; padding:20px;" >ALERTA DE FACTURA-FACIL</v-card-title>

  <v-card-text style="background:#363333;color:#fff;font:bold 15px verdana; padding:20px;">
    SEGURO QUE QUIRES ELIMINAR A <strong style="color:red"> {{nombre.toUpperCase()}} </strong>  ?  
 ELIMINA LAS FACTURAS CON RELACION A <strong  style="color:red"> {{nombre.toUpperCase()}} </strong> ANTES DE ELIMINAR LO .

</v-card-text>
<v-spacer></v-spacer>
<v-card-actions  style="background:#ccc;font:bold 25px verdana; padding:20px;">
<v-spacer></v-spacer>
<v-btn style="margin-left:20px; background:red; position:relative" class="botones fatrach">
  <router-link to="/clientes">
<v-icon color="#fff" class="basura" name="Bote de basura"  @click="borrar(yave)">fas fa-trash</v-icon>
  </router-link>

</v-btn>
<v-btn style="margin-right:20px; background:#363333; color:#fff" @click="alerta= false" class="blue botones">
CANCELAR
</v-btn>
</v-card-actions>
</v-card>
</v-dialog>
<!-- Fin alerta al usuario-->  
</v-layout>

</template>

<script>

import m from './indexDb.js'
export default {
  name: 'App',

  data(){

    return{
    clientes: [],
    client: {
      nombre: '',
      direccion: '',
      ciudad: '',
      telefono: ''

    },
    vista:false,
    path: '/formFactura' + '/',

    path2: '/Facturas' + '/',
    path3: '/modificar'+"/",
alerta:false,
    cuerpo:true,
    nombre:"",
    yave:"",
busqueda:this.$route.params.id,/************ */


  }},
  created () {
      document.getElementById("pie_page").style.display="none"
    document.getElementById("boxPrincipal").style.overflow="visible";
document.onselectstart=_=>false
document.onmousedown=_=>false
    document.getElementById("clientes").addEventListener("click",_=>{
     this.clientes=[];
    let db = m.clientes.result
    let espacio = this.client
    var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('Clientes')
    solicitud.openCursor().onsuccess = e => {
      let cursor = e.target.result
      if(cursor){ 
     this.clientes.push(cursor.value)
     }
    cursor.continue()

    }

    });


    
    document.getElementById("busqueda").addEventListener("click",_=>{
var serch=document.getElementById("campoSerch").value;
console.log(serch)
      this.clientes=[];
    let db = m.clientes.result
    let espacio = this.client
    var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('Clientes')
    solicitud.openCursor().onsuccess =async e => {
      let cursor = e.target.result
      if(cursor){

        if(cursor.value.nombre.match(serch) || 
cursor.value.nombre.match(serch[0].toUpperCase() || cursor.value.nombre.match(serch[0].toLowerCase() ))) {
    await  this.clientes.push(cursor.value)}

       }
      cursor.continue()

    }

    
    },false);
   
    if(!this.busqueda | this.busqueda==""){
    let db = m.clientes.result
    let espacio = this.client
    var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('Clientes')
    solicitud.openCursor().onsuccess = e => {
    let cursor = e.target.result;
      
      if(cursor){
      this.clientes.push(cursor.value)

       }
      cursor.continue()

    }
    
    }else{
      let db = m.clientes.result
    let espacio = this.client
    var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('Clientes')
    solicitud.openCursor().onsuccess = e => {
      let cursor = e.target.result
      if(cursor){
if(cursor.value.nombre.match(this.busqueda) || 
cursor.value.nombre.match(this.busqueda[0].toUpperCase()) 
){
       this.clientes.push(cursor.value)}
      cursor.continue()

       }
    }
    
    }

  },

///////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  methods:{
borrar(e){
//////BORRAR CLIENTE e \\\\\\\
this.alerta=false;
  let db=m.clientes.result;
  var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readwrite')
 .objectStore("Clientes")
 .delete(e);  

//////ACTUALIZ LA CALTERA DE CLIENTES_____REAL TIME\\\\\\\
this.clientes=[];
let db2 = m.clientes.result;
    let espacio = this.client;
    var almacen = db2.transaction(['Clientes'], IDBObjectStore.mode = 'readonly');
    var solicitud = almacen.objectStore('Clientes');
    solicitud.openCursor().onsuccess = e => {
    let cursor = e.target.result
    if(cursor){
    this.clientes.push(cursor.value)
    cursor.continue()

       }

    }

},

    
  
  }


}
</script>
<style  scoped>
#error{
  text-align: center;
  margin-left:22em;
  width:55px;
  height: 40px;
  transform: rotate(90deg);
margin-bottom: 15px;
  background: black !important;
margin-right: 20px;
}
#error:hover{
 width:55px;
  height: 40px;
  background: #fff !important;
  transform: rotate(45deg);

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

button{
margin-left:10px;

}
.theme--dark.v-sheet{
background: #fff !important;

}
.centrar{
text-align: center;
width: 100%;
margin-top: 15px;
margin-bottom: 5px;
background:rgba(65, 60, 60, 0.171);
color: rgb(255, 255, 255);
font:bold 25px verdana;

}

.botones{
color: #fff;
font: 15x bold verdana ;
height:50px;
background: #363333;
margin-left:5px;
border-radius:4%;
padding:2px;
width: 200px;
}
span{
margin: 15px;
float:left;
font: 25px verdana;
 text-align: left;

}
a{text-decoration: none;
  color: #dadada;


}
.opsiones{
float: right;
width:100%;
background: #fff
}
p{
  float: right;
}
.info{
float: left;
margin-top: 10px;
width:100%;

}
.rotacion{
height: 70px;
width: 70px;
border-radius: 100%;
background: #dadada;
color: black
}


.rotacion:hover{
  transition: 1s ease;
transform: rotate(360deg)
}
.vuelo:hover{
  transition: 1ms ease-in-out;
transform: translate(0px,-5px);
opacity: 0.7;
}

table{
width: 100%;
background: #fff

}
th{
color:black;
width:350px;
font: bold 30px verdana;
background: #ececec
}
th td{
width:250px;
}
.optionsBtn{
width:75px;
}
.optionBTN{
  color: #dadada;
height: 75px;
    background-color: rgb(166, 175, 162);
    border-color: rgb(87, 80, 80);
  font:bold 15px verdana;

}
</style>
