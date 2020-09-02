<template>
<v-layout class="cajaPresentacion" >
<h1 class="centrar" id="tituloPage">EDITAR FACTURA PARA  {{nombre.toUpperCase()}}</h1>


   <v-flex xs align-self-center  >
     
        <v-form
        lazy-validation
        class="blanco"
        >
<v-dialog
v-model="registroControl"
  max-width="500" 
  draggable="enable"
>
<v-card     style="border:5px solid ">
<v-card-title  class="arck" style="background:#ccc;font:bold 25px verdana; padding:20px;">ALERTA FACTURA-FACIL</v-card-title>
<v-card-text style="background:#363333;color:#fff;font:bold 15px verdanca; padding:20px;">FACTURA  REGISTRADA CON EXITO EN NOMBRE DE  <strong style="text-decoration: underline;
">{{nombre.toUpperCase()}} </strong>
 </v-card-text>
<v-spacer></v-spacer>

<v-card-actions  style="background:#ccc; padding:5px; ">
</v-card-actions>
</v-card>


</v-dialog>
<v-card
 v-show="alert_user"
 max-width="527px"
 style="
 float:left;
background: rgb(190, 57, 57);
color: #fff;
margin-left: 20px;
font: bold 15px verdana;
page-break-after: 5px;
text-align: center!important;
margin-bottom: 5px;
padding:7px;">
<span @click="alert_user=false" style="float:left;margin-bottom: 5px; margin-left:10px;color:#fff; font:bold 20px verdana">
 <router-link to="" style="color:#fff;text-decoration:none"> X</router-link>
</span>

  <span v-text="error_user" style=" margin-left:15px"></span>

</v-card>
<v-text-field
  style="  width: 25%!important; float:right;"
  color="rgb(59, 56, 56)"   
 v-model="factura.fecha"
 outlined
 type="date"
 label="Fecha"
 required
 autofocus
 :rules="validarFecha"
 @input="alert_user=false"
>
</v-text-field>
<v-textarea
 style="  width: 100%"
 color="rgb(59, 56, 56)"  
 label="Descripcion del product"
 placeholder="Descripcion del product"
 single-line
 v-model="factura.description"
 rows="2"
 counter="200"
 outlined>
 </v-textarea>

<v-text-field
  color="rgb(59, 56, 56)"  
v-model="factura.precio"
 outlined
 label="Precio del producto"
 placeholder="Precio del producto"
 type="number"
 id="precio"
 @input="caracterInadmitido"

>
</v-text-field>

<v-text-field
 style= "width:10%;float:right;"
 outlined
v-model="factura.itbis"
 required
type="number"
placeholder="%ITBIS"
label="% ITBIS"
:rules="itbis"
>

</v-text-field>

<v-text-field
style="width:100%"
color="rgb(59, 56, 56)"
v-model="factura.creditoFiscal"
 outlined
 placeholder="Crédido fiscal"
 label="Credido fiscal"
>
</v-text-field>
<v-select
  color="rgb(59, 56, 56)"
v-model="factura.condiciones"
 outlined
 :items="modosPago"
placeholder="Condiciones de pago"
label="Condiciones de pago"

>
</v-select>

 <v-btn  class="botones" color="rgb(59, 56, 56)"  @click="archivar" >
ARCHIVAR<i class="fas fa-save " ></i>
 </v-btn>

        </v-form>

</v-flex>

    </v-layout>

</template>
<script>
import m from './indexDb'
import f from './indexFacturas'
export default {
  name: 'formFactura',
  data () {
    return {
      alert_user:false,
      error_user:"",
       registroControl:false,
      factura: {
        description: '',
        precio:"",
        cantidad:1,
        modoPago: '',
        creditoFiscal: '',
        fecha: '',
        condiciones: '',
        itbis: null,
        id: ''
      },
      modosPago:[{text:'EFECTIVO'},{text:'CHEQUE'},{text:'TRANSFERENCIA'}],
      yave: this.$route.params.id,
      nombre: '',
      validarFecha:[ v=> (v && v!="") ||"Campo fecha obligatorio"],
      itbis:[v=>(v &&v!=null)||"Campo ITBIS requerido"]
    }
  
  },
  created () {
    document.getElementById("boxPrincipal").style.overflow="visible";

       document.onselectstart=_=>false
   document.onmousedown=_=>false
    let db = m.clientes.result
    var almacen = db.transaction(['Clientes'], IDBObjectStore.mode = 'readonly')
    var solicitud = almacen.objectStore('Clientes')
    let cursol = solicitud.openCursor()
    let id = this.yave
    var nombres = []
    cursol.onsuccess = e => {
      let cursor = e.target.result
      if (cursor.key == id) {
        this.nombre = cursor.value.nombre
      }
      cursor.continue()
    }

  },
  methods: {
    caracterInadmitido(e){
      var preio = document.getElementById("precio");
var texto="";

      if(precio.value.match(/[","  ,"#","$","%"]/)){
  
        this.alert_user=true; this.error_user= "El campo precio solo admite 0-9 y punto "; 
      setTimeout(_=>{
      this.factura.precio=''

      },100)
      
      }else if(precio.value.match(/[A-z]/)){
        
        this.alert_user=true; this.error_user=`El campo precio no admite letras  `; 
     setTimeout(_=>{
      this.factura.precio=''

      },100)
       
      }else{
        this.alert_user=false;
      }

    },
    archivar () {
      let subTotal = this.factura.precio * this.factura.cantidad
      let total = subTotal * this.factura.itbis / 100 + subTotal
      let objfecha = new Date()
      let dia = objfecha.getDate()
      let mes = objfecha.getMonth()
      let ano = objfecha.getFullYear()
      let result = f.clientesFac.result
      let mes2 =mes+1;

      let factura = {
        fecha: this.factura.fecha,
        description: this.factura.description,
        precio: this.factura.precio,
        cantidad: this.factura.cantidad,
        modoPago: this.factura.modoPago,
        creditoFiscal: this.factura.creditoFiscal,
        condiciones: this.factura.condiciones,
        total,
        subTotal: subTotal,
        itbis: this.factura.itbis,
        cliente: this.yave

      }
      let db = f.clientesFac.result
      var almacen = db.transaction(['facturas'], IDBObjectStore.mode = 'readwrite')
      var solicitud = almacen.objectStore('facturas')
        var inputs = document.getElementsByTagName('input');
        var texto = document.getElementsByTagName('textarea');
     if(this.factura.fecha!=""){
       if( this.factura.itbis!=null){ 
         solicitud.add(factura);
         
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
      inputs[5].value = ''
       texto[0].value = ''
      }else{this.alert_user=true; this.error_user="El campo ITBIS es obligatorio";}
      }
      else{this.alert_user=true; this.error_user="El campo fecha es obligatorio"; inputs[0].innerText="Agrega la fecha"}
    }

  } }

</script>

<style  scoped>
#gerente{
float:right;
width:300px;
background: #000000
}
#cliente{
float:left;
width:300px;
background: #000000
}
br{
width: 200px;
background: #000;
font: bold 25PX VERDANA;

}

.cajaPresentacion{
    display: flex;
    flex-direction:column;
width: 100%;
background:gray;

}

.centrar{
text-align: center;
width: 100%;
margin-top: 5px;
color:rgba(65, 60, 60, 0.171);
color: #fff;
font:bold 25px verdana;
}

.centrar2{
text-align: center;
width: 100%;
margin-top: 5px;
background:rgba(65, 60, 60, 0.171);
color: rgb(255, 255, 255)
}
.blanco{
    width: 1000px;
    margin-top: 15px;
background:#fff;
padding:50px;
text-align: center;
  border-radius: 5%;
}
.modo{
  float:left;
   margin-top: 5px;
height:45px;
color: #fff;
font:25px verdana;

}
.modo2{
width:100%;
height:45px;
background:#2a2e2a;
color: #fff;
font:25px verdana;
text-align: center;
padding: 10PX;

}
.botones{
color: #fff !important;
font: 20px bold verdana ;
margin-top: 10px;

    font: bold 15px verdana;
    background: rgb(59, 56, 56)!important;
    width: 200px;
    height: 50px;
    border-radius: 15px;
}
h2{
background: #fff;
color: rgb(94, 238, 65)

}
.span{
    width: 236px;
margin-left: 90px;

}
img{
    width: 200px;
    height: 200px;
    border-radius: 100%;
    background: #119911;

}
div.v-input__slot>div.v-text-field__slot >label.v-label{
  font: bold 40px verdana;
}

</style>
