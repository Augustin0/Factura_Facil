<template>

    <v-layout class="cajaPresentacion" justify-center >

     <v-flex xs12>

      <h1 class="centrar">REGISTRAR CLIENTE</h1>
     
     </v-flex>
<v-dialog
v-model="registroControl"
 v-show="true"
  max-width="500" 
  draggable="enable"
>
<v-card     style="border:5px solid ">
<v-card-title  class="arck" style="background:#ccc;font:bold 25px verdana; padding:20px;">ALERTA FACTURA-FACIL</v-card-title>
<v-card-text style="background:#363333;color:#fff;font:bold 15px verdana; padding:20px;">CLIENTE <strong style="text-decoration: underline;
"> {{client.nombre.toUpperCase()}}</strong> REGISTRADO CON EXITO 
 </v-card-text>
<v-spacer></v-spacer>

<v-card-actions  style="background:#ccc; padding:5px; ">
</v-card-actions>
</v-card>
</v-dialog>

 
     <v-flex xs6 align-self-center class="blanco" >

        <v-form
        lazy-validation
        >
        
<v-text-field
  color="rgb(59, 56, 56)"  
 placeholder="Nombre del cliente"
 prepend-icon="fas fa-user"

      :counter="20"
      autofocus
    required

    v-model="client.nombre"
   :rules="nameRules"
   id="nombre"
  
>
</v-text-field>
<v-text-field
 prepend-icon="fas fa-home"
:rules="direccionValid"
 placeholder="Direccion"
  color="rgb(59, 56, 56)"  
  v-model="client.direccion"

 :counter="20"
>
</v-text-field>
<v-text-field
  color="rgb(59, 56, 56)"  
prepend-icon="fas fa-city"
placeholder="Ciudad"
v-model="client.ciudad"
   :rules="ciudadValid"

>
</v-text-field>
<v-text-field
 color="rgb(59, 56, 56)"  
 :rules="telefonoValid"
 @input="bloquear()"
 prepend-icon="fas fa-phone"
 placeholder="(000)000-0000"
 v-model="client.telefono"
 required

>

</v-text-field>
<v-text-field
  color="rgb(59, 56, 56)"  
   :rules="RNCvalid"
 @input="bloquear()"
prepend-icon="fas fa-address-card"
placeholder="RNC / Cedula "
counter="11"
type="num"
v-model="client.rnc"

>

</v-text-field>
          <v-btn
        color="rgb(59, 56, 56)"  
        @click="envio"
id="enviar"
><router-link :to="path">
ARCHIVAR<i class="fas fa-save black"  ></i></router-link>
 </v-btn>

        </v-form>

</v-flex>

    </v-layout>

</template>
<script>
import {created2} from '../main'

import m from './indexDb'
export default {
  name: 'AgredarCliente',
  data () {
    return {
      registroControl:false,
      valid: true,
      path: '',
  direccionValid: [
        v => !!v || 'El cliente debe tener una dirección para hacer registro',

      ],
ciudadValid: [
        v => !!v || 'El campo Ciudad es obligatorio',
],
telefonoValid: [
        v => !!v || 'El Campo teléfono es obligatorio',
],
RNCvalid: [
        v => !!v || 'Completa el campo RNC/Cédula para poder registrar el cliente',
        v => (v.length==9 | v.length==11)|| "El campo RNC O cédula solo puede contener 9 o 11 digitos"
],


      nameRules: [
        v => !!v || 'El cliente debe  contar con un nombre para ser registrado',
        v => (v && v.length <= 20) || 'El nombre del cliente no puede contener más de 20 letras',
        v => (v && v[0].match('[A-Z]')) || 'La primera letra ha de ser  mayuscula'

      ],
      
      client: {
        nombre:     '',
        direccion:  '',
        ciudad:     '',
        telefono:   '',
        rnc:        '',

      } }
  },
  created(){
    
    document.getElementById("boxPrincipal").style.overflow="visible";


  },

  methods: {
    envio () {
      var inputs = document.getElementsByTagName('input')

      var db = m.clientes.result
      var arreglo = []
    var nuevo = arreglo.push(this.client)
      var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readwrite')
      var solicitud = almacen.objectStore('Clientes')
if(inputs[1].value==''&&  inputs[2].value== ''&&  inputs[3].value== ''&&  inputs[4].value== ''&&  inputs[5].value== ''){
console.info("Completa los campos para poder enviar el formulario")
 }else{ 
    solicitud.add(this.client)
    setTimeout(_=>{
      this.registroControl=true;
    setTimeout(_=>{
      this.registroControl=false;
     },3000)},1000)
    
      inputs[1].value = ''
      inputs[2].value = ''
      inputs[3].value = ''
      inputs[4].value = ''
      inputs[5].value = ''
      inputs[6].value = ''

}

    },
    bloquear(){
      var inputs = document.getElementsByTagName('input')
      
if(this.client.telefono.length==14){
        inputs[4].disabled=true;
      }
if(this.client.rnc.length==11){
        inputs[5].disabled=true;
      }
      
if(this.client.telefono.match(/['@','#','%','$','!',' ']/)){
  setTimeout(_=>{
     inputs[4].value=''
          this.client.telefono=''
  },100)
   
}else if(this.client.telefono.match(/[A-z]/)){
  setTimeout(_=>{
     inputs[4].value=''
          this.client.telefono=''
  },100)

}
if(this.client.rnc.match(/['@','#','%','$','!','-','(','),' ' ']/)){
  setTimeout(_=>{
     inputs[5].value=''
          this.client.rnc=''
  },100)
   
}else if(this.client.rnc.match(/[A-z]/)){
  setTimeout(_=>{
     inputs[5].value=''
          this.client.rnc=''
  },100)

}



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
font:bold 25px verdana;
}

.cajaPresentacion{
    display: flex;
    flex-direction: column;
width: 100%;
background:#919891;
height:650px;
justify-content: center

}
.blanco{
  display: flex;
  flex-direction: row;
background: #fff;
padding:100px;
text-align: center;
  border-radius: 5%;
    width: 90em;

}
form{
    width: 35em;
text-align: center;
}
form > input{
text-align: center;
  width: 100%;
}
a{

text-decoration: none;
color: #fff;
font: bold verdana ;

}

</style>

