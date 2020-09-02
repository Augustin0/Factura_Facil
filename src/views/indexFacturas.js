function creacion_database () {
  if ('webkiteIndexeDB' in window) {
    window.indexedDB = window.webkitIndexeDB
    window.IDBCursor = window.webkitIDBCursor
    window.IDBTransaction = window.webkitIDBTransaction
    window.IDBKeyRange = Window.webkitIDBKeyRange
  } else if ('mozIndexeDB' in window) {
    window.indexedDB = window.mozIndexeDB
    window.IDBCursor = window.mozIDBCursor
    window.IDBTransaction = window.mozIDBTransaction
    window.IDBKeyRange = Window.mozIDBKeyRange
  }

}

const clientesFac = indexedDB.open('baseFacturas', 2)
const result2 = clientesFac.addEventListener('success', e => {
  let db2 = e.target.result

  return db2
})

let error = clientesFac.addEventListener('error', e => {
  let errores = e.target.result
  return errores
})

var tabla2

let nombreTabla = nombre => {
  return nombre
}
clientesFac.addEventListener('upgradeneeded', e => {
  let db2 = e.result || e.target.result

  try {
    var tablaFacturas = db2.createObjectStore('facturas', { keyPath: 'id', autoIncrement: true })
    tablaFacturas.createIndex('fecha', 'fecha', { unique: false })//Sera editable no automatico
    tablaFacturas.createIndex('description', 'description', { unique: false })
    tablaFacturas.createIndex('cliente', 'cliente', { unique: false })
    tablaFacturas.createIndex('precio', 'precio', { unique: false })
    tablaFacturas.createIndex('cantidad', 'cantidad', { unique: false })//Ahora sera una constante 1
    tablaFacturas.createIndex('creditoFiscal', 'creditoFiscal', { unique: false })//Ya no sera una constante
    tablaFacturas.createIndex('condiciones', 'condiciones', { unique: false })
    tablaFacturas.createIndex('subTotal', 'subTotal', { unique: false })
    tablaFacturas.createIndex('total', 'total', { unique: false })
  } catch {

  }
  tabla = db2
})
module.exports = {
  creacion_database,
  clientesFac,
  result2

}
