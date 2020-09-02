var clientes;
function creacion_database () {

 if(clientes){
 return}

clientes=indexedDB.open('baseClientes');
};
creacion_database();




const result = clientes.addEventListener('success', e => {
  let db = e.target.result
  return db
});
let errores = clientes.addEventListener('error', e => {
  let errores = e.target.result
  return errores
});

var tabla;
let tablaClientes=clientes.addEventListener('upgradeneeded', e => {
  let db = e.result || e.target.result
  try {
    var tablaCliente = db.createObjectStore('Clientes', { keyPath: 'id', autoIncrement: true })
    tablaCliente.createIndex('nombre', 'nombre', { unique: false })
    tablaCliente.createIndex('direccion', 'direccion', { unique: false })
    tablaCliente.createIndex('ciudad', 'ciudad', { unique: false })
    tablaCliente.createIndex('telefono', 'telefono', { unique: false })
    tablaCliente.createIndex('rnc', 'rnc', { unique: false })

  } catch {
console.log('la tabla Clientes no pudo ser creada')
  }
  
  tabla = db
});


module.exports = {
  creacion_database,
  clientes,
  result,
tablaClientes
}
