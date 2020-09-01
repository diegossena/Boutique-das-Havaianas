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

    const filters = {
      generos,
      tamanhos,
      cores
    }
    mainWindow.webContents.send('filters', filters)
  })

  ipcMain.on("metodosPagamento", async () => mainWindow.webContents.send('metodosPagamento', await knex('metodosPagamento')))

  ipcMain.on("tiposPagamento", async () => mainWindow.webContents.send('tiposPagamento', await knex('tiposPagamento')))
  ipcMain.on("vendedores", async () => mainWindow.webContents.send('vendedores', await knex('vendedores')))

  ipcMain.on("cadastroProduto", async(e, product) => {
    if(product.imagem != null) {
      let extension = product.imagem.slice(product.imagem.indexOf('data:image/')+11,product.imagem.indexOf(';'))
      if(extension=='jpeg') extension = 'jpg'
      product.imagem = product.imagem.slice(product.imagem.indexOf(";base64,")+8)
      fs.writeFile(resolve(__dirname, rootPath, 'uploads', product.descricao+'.'+extension), product.imagem, 'base64', err=>{
        if(err) {
          mainWindow.webContents.send('cadastroProduto', { err })
        }
      });
      product.imagem = product.descricao+'.'+extension
    } else {
      product.imagem = ''
    }

    knex('havaianas').insert({
      descricao: product.descricao,
      tamanho_id: product.tamanho,
      cor_id: product.cor,
      genero_id: product.genero,
      preco: product.preco,
      qtdEmEstoque: product.qtdEmEstoque,
      imagem: product.imagem
    }).then(resolve=>{
      product.id = resolve[0]
      mainWindow.webContents.send('cadastroProduto', product)
    }).catch(err=>{
      mainWindow.webContents.send('cadastroProduto', { err })
    })
  })
  ipcMain.on("descadastroProduto", async(e, product) => {
    knex('havaianas')
      .where('id', product.id)
      .del()
    .then(()=>{
      if(product.imagem != '') {
        try {
          fs.unlinkSync(resolve(__dirname, rootPath, product.imagem))
        } catch (e) {}
      }
      mainWindow.webContents.send('descadastroProduto', product.id)
    }).catch(err=>{
      mainWindow.webContents.send('descadastroProduto', { err })
    })
  })
  ipcMain.on("venda", async(e, venda) => {
    const id_venda = await knex('vendas').insert({
      tipoPagamento_id: venda.tipoPagamento,
      metodoPagamento_id: venda.metodoPagamento,
      vendedor_id: venda.vendedor,
      dataVenda: new Date()
    })
    venda.products.forEach(async(element) => {
      const qtdEmEstoque =  await new Promise(resolve => {
        knex('havaianas')
        .select('qtdEmEstoque')
        .where('id', '=', element.id)
        .then(result => {
          resolve(result[0].qtdEmEstoque)
        })
      })

      await knex('havaianas')
      .where('id', '=', element.id)
      .update({
        qtdEmEstoque: qtdEmEstoque-element.quantidadeVenda
      })

      await knex('produtosVendas').insert({
        venda_id: id_venda,
        havaiana_id: element.id,
        quantidadeVenda: element.quantidadeVenda,
        desconto: element.desconto
      })
    })
  })
  ipcMain.on("alteracaoEstoque", async(e, product) => {
    knex('havaianas')
    .where('id', '=', product.id)
    .update({
      qtdEmEstoque: product.qtdEmEstoque
    }).then(result => {
      mainWindow.webContents.send('alteracaoEstoque', { product })
    }).catch(err => {
      mainWindow.webContents.send('alteracaoEstoque', { err })
    })
  })
  ipcMain.on("relatorioVendas", async(e, intervaloData) => {  
    const result = await knex
    .select()
    .from('vendas')
    .innerJoin('produtosVendas', 'vendas.id', 'produtosVendas.venda_id')
    .innerJoin('havaianas', 'produtosVendas.havaiana_id', 'havaianas.id')
    .innerJoin('generos', 'generos.id', 'havaianas.genero_id')
    .innerJoin('tamanhosHavaianas', 'tamanhosHavaianas.id', 'havaianas.tamanho_id')
    .innerJoin('cores', 'cores.id', 'havaianas.cor_id')
    .innerJoin('metodosPagamento', 'metodosPagamento.id', 'vendas.metodoPagamento_id')
    .innerJoin('tiposPagamento', 'tiposPagamento.id', 'vendas.tipoPagamento_id')
    .innerJoin('vendedores', 'vendas.vendedor_id', 'vendedores.id')
    .whereBetween('dataVenda', intervaloData)
    
    mainWindow.webContents.send('relatorioVendas', result)
  })
  ipcMain.on("exportProdutos", async() => {
    const result = await knex('havaianas')
    mainWindow.webContents.send('exportProdutos', result)
  })
  ipcMain.on("cadastroVendedor", (e, nome) => {
    knex('vendedores').insert({ nomeVendedor: nome })
    .then(vendedorId => {
      const vendedor = {
        id: vendedorId,
        nomeVendedor: nome
      }
      mainWindow.webContents.send('cadastroVendedor', { vendedor })
    }).catch(err => {
      mainWindow.webContents.send('cadastroVendedor', { err })
    })
  })
  ipcMain.on("removerVendedor", (e, id) => {
    knex('vendedores')
    .where('id', id)
    .del()
    .then(() => {
      mainWindow.webContents.send('removerVendedor', { id })
    }).catch(err => {
      mainWindow.webContents.send('removerVendedor', { err })
    })
  })
})

app.on('window-all-closed', () => app.quit())