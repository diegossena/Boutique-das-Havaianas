const devMode = true
const rootPath = devMode ? '../' : '../../'

const {app, BrowserWindow, ipcMain} = require('electron')
const knex = require('./database/connection')
const fs = require('fs')
const { resolve } = require('path')

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  if(devMode) {
    mainWindow.openDevTools()
  } else {
    mainWindow.setMenu(null)
  }
  
  mainWindow.loadFile('app/public/index.html')
  mainWindow.once("ready-to-show", () => mainWindow.show())
  
  ipcMain.on("products", async () => mainWindow.webContents.send('products', await knex('havaianas')))

  ipcMain.on("filters", async () => {
    const generos = await knex('generos')
    const tamanhos = await knex('tamanhosHavaianas')
    const cores = await knex('cores')

    const filters = [
      {
        name: 'Gênero',
        generos
      },
      {
        name: 'Tamanho',
        tamanhos
      },
      {
        name: 'Cor',
        cores
      }
    ]
    mainWindow.webContents.send('filters', filters)
  })

  ipcMain.on("metodosPagamento", async () => mainWindow.webContents.send('metodosPagamento', await knex('metodosPagamento')))

  ipcMain.on("tiposPagamento", async () => mainWindow.webContents.send('tiposPagamento', await knex('tiposPagamento')))

  ipcMain.on("cadastroProduto", async(e, product) => {
    if(product.imagem != null) {
      let extension = product.imagem.slice(product.imagem.indexOf('data:image/')+11,product.imagem.indexOf(';'))
      if(extension=='jpeg') extension = 'jpg'
      product.imagem = product.imagem.slice(product.imagem.indexOf(";base64,")+8)
      fs.writeFile(resolve(__dirname, rootPath, 'uploads', product.descricao+'.'+extension), product.imagem, 'base64', err=>{
        if(err) {
          mainWindow.webContents.send('cadastroProduto', {error: err})
        }
      });
      product.image = product.descricao+'.'+extension
    } else {
      product.image = 'default'
    }

    knex('havaianas').insert({
      descricao: product.descricao,
      tamanho_id: product.tamanho,
      cor_id: product.cor,
      genero_id: product.genero,
      preco: product.preco,
      qtdEmEstoque: product.qtdEmEstoque,
      imagem: product.image
    }).then(resolve=>{
      mainWindow.webContents.send('cadastroProduto', {id: resolve[0], imagem: product.image})
    }).catch(err=>{
      mainWindow.webContents.send('cadastroProduto', {error: err})
    })
  })
  ipcMain.on("descadastroProduto", async(e, product) => {
    knex('havaianas')
      .where('id', product.id)
      .del()
    .then(()=>{
      if(product.imagem != 'default') {
        try {
          fs.unlinkSync(resolve(__dirname, rootPath, product.imagem))
        } catch (e) {}
      }
      mainWindow.webContents.send('descadastroProduto', product)
    }).catch(err=>{
      mainWindow.webContents.send('descadastroProduto', {error: err})
    })
  })
  ipcMain.on("venda", async(e, venda) => {
    console.log(venda)
    knex('vendas').insert({
      tipoPagamento_id: venda.tipoPagamento,
      metodoPagamento_id: venda.metodoPagamento,
    }).then(id_venda=> {
      console.log(id_venda)
    }).catch(err=>{
      mainWindow.webContents.send('venda', {error: err})
    })
   
  })
})

app.on('window-all-closed', () => app.quit())