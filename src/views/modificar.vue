<template>

    <v-layout class="cajaPresentacion" justify-center >
      <h1 class="centrar">MODIFICAR DATOS DEL CLIENTE</h1>

     <v-flex xs7 align-self-center class="blanco" >

        <v-form
        lazy-validation
        >
        <v-dialog
v-model="registroControl"
 v-show="true"
  max-width="500" 
  draggable="enable"
>
<v-card     style="border:5px solid ">
<v-card-title  class="arck" style="background:#ccc;font:bold 25px verdana; padding:20px;">ALERTA FACTURA-FACIL</v-card-title>
<v-card-text style="background:#363333;color:#fff;font:bold 15px verdana; padding:20px;">DATOS DEL CLIENTE MODIFICADO 
 </v-card-text>
<v-spacer></v-spacer>

<v-card-actions  style="background:#ccc; padding:5px; ">
</v-card-actions>
</v-card>
</v-dialog>
<v-text-field
  color="rgb(59, 56, 56)"  
  prepend-icon="fas fa-user"
      :counter="20"

  placeholder="Nombre (modificable)"
v-model="client.nombre"
   :rules="nameRules"
 required
>
</v-text-field>
<v-text-field
 color="rgb(59, 56, 56)"  
 prepend-icon="fas fa-home"
 placeholder="Dirección (modificable)"
 v-model="client.direccion"

>
</v-text-field>
<v-text-field
  color="rgb(59, 56, 56)"  
 prepend-icon="fas fa-city"
  placeholder="Ciudad (modificable)"
 v-model="client.ciudad">

</v-text-field>

<v-text-field
  color="rgb(59, 56, 56)"  
 prepend-icon="fas fa-phone"
 placeholder="Teléfono (modificable)"
 type="tel"
 v-model="client.telefono">
</v-text-field>

<v-text-field
  color="rgb(59, 56, 56)"  
 prepend-icon="fas fa-address-card"
 placeholder="Rnc (modificable)"
 type="rnc"
v-model="client.rnc"

>

</v-text-field>
          <v-btn
    color="rgb(59, 56, 56)"  
        @click="envio"

><router-link :to="path">
MODIFICAR<i class="fas fa-edit black"  ></i></router-link>
 </v-btn>

        </v-form>

</v-flex>

    </v-layout>

</template>
<script>
import m from './indexDb'
export default {
  name: 'menuPresentacion',
  data () {
    return {
  nombre:"Nombre",
   direccion: 'Direccion',
        ciudad: 'Ciudad',
        telefono: 'Telefono',
        rnc:"RNC / Cedula",

  valid: true,
      path: '',
      nameRules: [
        v => !!v || 'El cliente debe de contar con un nombre para ser registrado',
        v => (v && v[0].match('[A-Z]')) || 'La primera letra ha de ser  mayuscula'

      ],
      registroControl:false,
      client: {
        nombre: '',
        direccion: '',
        ciudad: '',
        telefono: '',
        rnc:""

      },
        id:this.$route.params.id
       }
  },
created(){
     document.getElementById("pie_page").style.display="block"
    document.getElementById("boxPrincipal").style.overflow="visible";
  let db = m.clientes.result
    let espacio = this.client
    var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('Clientes')
    solicitud.openCursor().onsuccess = e => {
      let cursor = e.target.result
      if(cursor){

if(cursor.value.id==this.id){
  this.client.nombre=cursor.value.nombre;
this.client.direccion=cursor.value.direccion;
this.client.ciudad=cursor.value.ciudad;
this.client.telefono=cursor.value.telefono;
this.client.rnc=cursor.value.rnc;
}
cursor.continue()
       }

    }},
       
  methods: {
    envio () {
      let db = m.clientes.result
      let arreglo = []
      let nuevo = arreglo.push(this.client)
      var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readwrite')
      var solicitud = almacen.objectStore('Clientes')
      var yave=parseInt(this.id);
      var inputs = document.getElementsByTagName('input')
      var modificar={
      nombre:this.client.nombre,//**** */
      direccion:this.client.direccion,
      ciudad:this.client.ciudad,
      telefono:this.client.telefono,
      rnc:this.client.rnc,
      id:yave
      };
      var almacen2 = solicitud.put(modificar)
         setTimeout(_=>{
      this.registroControl=true;
    setTimeout(_=>{
      this.registroControl=false;
     },3000)},1000)
      inputs[0].value = ''
      inputs[1].value = ''
      inputs[2].value = ''
      inputs[3].value = ''
      inputs[4].value = ''
    }
    }    
  }



</script>

<style  scoped>
.centrar{
text-align: center;
width: 100%;
margin-top: 15px;
margin-bottom: 2px;
background:rgba(65, 60, 60, 0.171);
color: rgb(255, 255, 255);
font: bold 25px verdana;
}


.cajaPresentacion{
    display: flex;
    flex-direction:column;
width: 100%;
height:650px;
justify-content: center

}
.blanco{
  text-align: center;
    margin-top: 15px;
background: #fff;
padding:80px;
text-align: center;
  border-radius: 5%;

}
form{
  width: 35em;
}
a{

text-decoration: none;
color: #fff;
font: bold verdana ;

}

</style>
