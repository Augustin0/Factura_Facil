module.exports = {

  'transpileDependencies': [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
     builderOptions: {
        "appId": "Factura_facil",
        "asar": true,
        "dmg": {
          "contents": [
            {
              "x": 110,
              "y": 150
            },
            {
              "x": 240,
              "y": 150,
              "type": "link",
              "path": "/Aplications"
            }
          ]
        },
        "win": {
          "target": "portable",
          "icon": "./build/facturaFacil-256x256.ico"
        },
        "extraResources": [
          {
            "from": "./extraResources/",
            "to": "extraResources",
            "filter": [
              "**/  //*"
         ]
          }
        ]
      },
    }
  }
}
module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  }
}
