<template>

 <v-layout  justify-center  class="row align-center styleContainer" >

  <v-flex xs5>

 <v-card v-show="alert_user" max-width="527px" class="boxErrorUser" >
    <span v-text="iconErrorText" class="iconError"></span>
    <span  v-text="errorUserName"></span>

  </v-card>

  <v-card v-show="alert_clave" max-width="527px" class="boxErrorUser">
    <span v-text="iconErrorText" class="iconError"></span>
   <span v-text="errorUserPassword"></span>

  </v-card>

  <v-form  class="blanco"
    v-model="valid"
    lazy-validation
    :action="path"
    @keypress="valorCampo"
    id="formulario"
   >
 <v-text-field
      prepend-icon="fas fa-user"
      @input="valorCampo()"
      autofocus
      single-line
      outlined
      v-model="usuario.nombre"
      type="text"
      placeholder="Usuario"
      required
      :counter="9"
      color="grey darken-3"
      >
    </v-text-field>

    <v-text-field
      color="grey darken-3"
      prepend-icon="fa fa-key"
      required
      :counter="14"
      single-line
      outlined
      v-model="usuario.clave"
      type="password"
      placeholder="Contraseña"
      @input="valorCampo()"
      >
  </v-text-field>

    <button
      :disabled="!valid"
      @click="envio()"
      type="submit"
      >

      <router-link
        :to="path"
        id="envio"
        tag="a" > INICIAR <i class="fa fa-flag"></i>

      </router-link>

    </button>

</v-form>

</v-flex>

</v-layout>

</template>

<script>
import {created2} from '../main'

export default {

  name: 'login',

  data () {
    return {
      iconErrorText: 'X',
      errorUserName: 'El usuario que has ingresado es incorrecto',
      errorUserPassword: 'La Contraseña que has ingresado es incorrecta',
      buttonText: 'INICIAR',
      path: '/',
      alert_user: false,
      alert_clave: false,
      habilitar: false,

      usuario: {
        nombre: '',
        clave: ''
      },

      valid: false,

      defaultUserData: {

        usurio: 'Canelo',
        clave: 'Canelo2171'

      }
    }
  },

  created () {



    document.onselectstart = _ => false

    document.onmousedown = _ => false

    document.getElementById('closeSesion').style.display = 'none'
    document.getElementById('closeSesion2').style.display = 'none'
    document.getElementById('pie_page').style.display = 'block'
    document.getElementById('boxPrincipal').style.overflow = 'visible'
  },
  methods: {

    valorCampo () {
      const campos = document.getElementsByTagName('input')

      const userName = campos[0]
      const userPassword = campos[1]
      const userNameValue = userName.value
      const userPasswordValue = userPassword.value

      if (userPasswordValue.length === 2) {
        userPassword.style.background = '#fff'
        this.alert_clave = false
        userPassword.type = 'password'
      }

      if (userNameValue.length === 2) {
        this.alert_user = false
      }

      if (userNameValue.length > 10) {
        userName.style.background = '#f90505'
        // eslint-disable-next-line no-undef
        Console.error('error valor campo')
        return 'error valor campo'
      }

      if (userNameValue.length < 10) {
        userName.style.background = '#fff'
        this.alert_user = false
        return 'el valor es corecto'
      }

      return 'los campos no fueron validados'
    },

    envio () {
      const campos = document.getElementsByTagName('input')
      const usuario = campos[0]
      const clave = campos[1]
      const valorClave = clave.value
      const valorUsuario = usuario.value
      const compara = this.defaultUserData.clave
      const first = valorUsuario.substr(0, 1).toUpperCase()
      const subS = valorUsuario.substr(1, valorUsuario.length)
      const userLogin = first + subS

      if (valorClave.match(/[A-Z]/) && valorClave.match(/[a-z]/) && valorClave.match(/[0-9]/) && valorClave === compara && userLogin === this.defaultUserData.usurio) {
        // manejando el evento KeyPress Code 13
        document.getElementById('formulario').onsubmit = _ => {
          this.path = '/helpPage'
          return false
        }
        this.path = '/helpPage'
        // //////////////////////////////////////
        
      } else {
        this.path = '/login'
        if (userLogin !== this.defaultUserData.usurio) {
          this.alert_user = true
          usuario.style.background = 'rgb(226, 124, 29)'
        }
        // manejando el evento KeyPress Code 13

        document.getElementById('formulario').onsubmit = _ => {
          return false
        }
        // //////////////////////////////////////
        if (clave.value !== this.defaultUserData.clave) {
          this.alert_clave = true
          clave.style.background = 'rgb(226, 124, 29)'
          clave.type = 'text'
        }
      }
    }

  }
}

</script>

<style  scoped>

.styleContainer{
  background:#717771;
  margin-top: 80px;
  height:70%
}

.boxErrorUser{
background: rgb(190, 57, 57)!important;
color: #fff!important;
margin-left: 20px!important;
font: bold 15px verdana!important;
page-break-after: 5px!important;
text-align: center!important;
margin-bottom: 5px!important;
padding:7px!important;

}

.iconError{
  float:left;
   margin-left:10px;
  color:#fff;
  font:bold 20px verdana
}

.blanco{
height: 300px;
background: #fff;
padding:67px;
text-align: center;
border-radius: 5%;
}

button{
background: #2c2e2c;
width: 10em;
height: 2em;
border-radius: 10em;
font: 15px bold verdana;
padding: 0px;
}

button > a{
text-decoration: none;
font: bold 15px  verdana;
color: #fff;
padding: 29px;
}

</style>
