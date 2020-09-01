const devMode = true
const rootPath = devMode ? '../../' : '../../../'

const ipc = require('electron').ipcRenderer
const { resolve } = require('path')

// Tools
const exportProdutos = function() {
  ipc.on('exportProdutos', (e, result) => console.log(JSON.stringify(result)))
  return () => ipc.send('exportProdutos')
}()

const defaultImage = resolve(__dirname, 'img', 'placeholder.svg')
const uploadPath = resolve(__dirname, rootPath, 'uploads')
window.onload = async()=>{
  const modalVenda = function() {
    ipc.send('tiposPagamento')
    ipc.send('metodosPagamento')
    ipc.send('vendedores')
    const divVenda = document.createElement('div')
    let div, label
    // Table
    const table = document.createElement('table')
    table.className = 'tabelaVenda'
    divVenda.append(table)
    const thead = document.createElement('thead')
    table.append(thead)
    let tr, th
    tr = document.createElement('tr')
    thead.append(tr)
    th = document.createElement('th')
    th.innerText = "Imagem"
    tr.append(th)
    th = document.createElement('th')
    th.innerText = "Produto"
    tr.append(th)
    th = document.createElement('th')
    th.innerText = "Qtd"
    tr.append(th)
    th = document.createElement('th')
    th.innerText = "Valor"
    tr.append(th)
    th = document.createElement('th')
    th.innerText = "Desconto"
    tr.append(th)
    th = document.createElement('th')
    th.innerText = "Total"
    tr.append(th)
    const tbody = document.createElement('tbody')
    table.append(tbody)
    // Tipo de Pagamento
    div = document.createElement('div')
    div.className = 'campoCadastro'
    divVenda.append(div)
    const selectTiposPagamento = document.createElement('select')
    selectTiposPagamento.required = true
    ipc.on('tiposPagamento', (e, tiposPagamento) => {
      tiposPagamento.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.tipoPagamento
        option.value = element.id
        selectTiposPagamento.append(option)
      })
    })
    // Label
    label = document.createElement('label')
    label.textContent = 'Tipo de Pagamento:'
    div.append(label)
    div.append(selectTiposPagamento)
    // Médoto de Pagamento
    div = document.createElement('div')
    div.className = 'campoCadastro'
    divVenda.append(div)
    const selectMetodosPagamento = document.createElement('select')
    selectMetodosPagamento.required = true
    ipc.on('metodosPagamento', (e, metodosPagamento) => {
      metodosPagamento.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.metodoPagamento
        option.value = element.id
        selectMetodosPagamento.append(option)
      })
    })
    // Label
    label = document.createElement('label')
    label.textContent = 'Método de Pagamento:'
    div.append(label)
    div.append(selectMetodosPagamento)
    // Vendedor
    div = document.createElement('div')
    div.className = 'campoCadastro'
    divVenda.append(div)
    const selectVendedor = document.createElement('select')
    selectVendedor.required = true
    {
      const option = document.createElement('option')
      selectVendedor.append(option)
    }
    function addVendedor({ nomeVendedor, id }) {
      const option = document.createElement('option')
      option.textContent = nomeVendedor
      option.value = id
      selectVendedor.append(option)
    }
    ipc.on('vendedores', (e, vendedores) => vendedores.forEach(addVendedor))
    // Label
    label = document.createElement('label')
    label.textContent = 'Vendedor:'
    div.append(label)
    div.append(selectVendedor)

    function realizarVenda(e) {
      e.preventDefault()
      const venda = {
        products: [],
        metodoPagamento: parseInt(selectMetodosPagamento.value),
        tipoPagamento: parseInt(selectTiposPagamento.value),
        vendedor: parseInt(selectVendedor.value)
      }
      while(productsGrid.productsInShop[0]) {
        venda.products.push({
          id: productsGrid.productsInShop[0].id,
          quantidadeVenda: parseInt(productsGrid.productsInShop[0].inShop.itemQtdCompra.value),
          desconto: productsGrid.productsInShop[0].desconto
        })
        productsGrid.productsInShop[0].inShop.shopRemove()
      }

      ipc.send('venda', venda)

      venda.products.forEach(element => {
        const product = productsGrid.findById(element.id)
        product.setQuantidade(product.quantidade-element.quantidadeVenda)
      })
      modal.down() 
    }
    function form(e) {
      e.preventDefault()
      modal.title.textContent = 'Venda'
      tbody.innerHTML = ''
      productsGrid.productsInShop.forEach(element => {
        tr = document.createElement('tr')
        tbody.append(tr)
        let td
        // Imagem
        td = document.createElement('td')
        tr.append(td)
        const img = document.createElement("img")
        if(!element.imagem) {
          img.src = defaultImage
        } else {
          img.src = resolve(uploadPath, element.imagem)
        }
        td.append(img)
        // Descrição
        td = document.createElement('td')
        td.innerText = element.descricao
        tr.append(td)
        // Qtd
        td = document.createElement('td')
        td.innerText = element.inShop.itemQtdCompra.value
        tr.append(td)
        // Valor
        td = document.createElement('td')
        td.innerText = element.preco.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        })
        tr.append(td)
        // Desconto
        td = document.createElement('td')
        tr.append(td)
        const desconto = document.createElement('input')
        desconto.type = 'number'
        desconto.min = 0
        desconto.max = element.preco
        desconto.step = 0.05
        desconto.value = 0
        desconto.style.maxWidth = '4rem'
        td.append(desconto)
        // Total
        td = document.createElement('td')
        const valorCompra = element.preco*element.inShop.itemQtdCompra.value
        td.innerText = valorCompra.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        })
        element.desconto = 0
        desconto.onchange = desconto.onkeyup = () => {
          const valor = valorCompra-desconto.value
          element.desconto = parseFloat(desconto.value)
          td.innerText = valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
          })
        }
        tr.append(td)
      });
      modal.form.onsubmit = realizarVenda
      modal.modalDiv.style.maxWidth = '50%'
      modal.up()
      modal.body.append(divVenda)
      modal.form.append(modal.footer)
    }
    return { form, addVendedor, selectVendedor }
  }()
  const productsGrid = function() {
    const productGridElement = document.getElementById('products-grid')
    const shopGridElement = document.getElementById('shop-grid')
    const formVenda = document.getElementById('formVenda')

    const buttonEfetuarVenda = document.createElement('button')
    buttonEfetuarVenda.type = 'submit'
    buttonEfetuarVenda.className = 'efetuarVenda'
    buttonEfetuarVenda.innerText = 'Efetuar Venda'
    buttonEfetuarVenda.style.display = 'none'
    formVenda.appendChild(buttonEfetuarVenda)

    const productsInGrid = []
    const productsInShop = []

    function clearProductsInShop() {
      while(productsInShop[0]) productsInShop[0].inShop.shopRemove()
    }
    formVenda.onsubmit = modalVenda.form
    function findById(productId) {
      return productsInGrid.find(e => e.id == productId)
    }
    function add(productsToInsert) {
      productsToInsert.forEach(productToInsert => {
        const product = {
          id: productToInsert.id,
          descricao: productToInsert.descricao,
          preco: productToInsert.preco,
          quantidade: productToInsert.qtdEmEstoque,
          genero_id: productToInsert.genero_id,
          tamanho_id: productToInsert.tamanho_id,
          cor_id: productToInsert.cor_id,
          imagem: productToInsert.imagem,
          setQuantidade(quantidade) {
            return inGrid.quantidade.innerText = inShop.quantidade.innerText = this.quantidade = quantidade
          }
        }
        const src = productToInsert.imagem == '' ? defaultImage : resolve(uploadPath, productToInsert.imagem)
        const currency = productToInsert.preco.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        })
        const inShop = function() {
          const li = document.createElement('li')
          li.className = 'product-grid-item'
          li.style.cursor = 'unset'
          const remove = document.createElement('button')
          remove.className = 'product-remove'
          remove.innerText = 'X'
          li.appendChild(remove)
          const img = document.createElement('img')
          img.className = 'item-showcase'
          img.src = src
          li.appendChild(img)
          const div = document.createElement('div')
          li.appendChild(div)
          const descricao = document.createElement('div')
          descricao.className = 'item-name'
          descricao.innerText = productToInsert.descricao
          div.appendChild(descricao)
          const price = document.createElement('div')
          price.className = 'item-price'
          price.innerText = currency
          div.appendChild(price)
          const qtdDiv = document.createElement('div')
          qtdDiv.className = 'item-qtd'
          qtdDiv.innerHTML = '<div>Quantidade:</div>'
          const quantidade = document.createElement('div')
          quantidade.innerText = productToInsert.qtdEmEstoque
          qtdDiv.append(quantidade)
          div.appendChild(qtdDiv)
          const itemQtdCompra = document.createElement('input')
          itemQtdCompra.type = "number"
          itemQtdCompra.min = 1
          itemQtdCompra.value = 1
          itemQtdCompra.max = productToInsert.qtdEmEstoque
          div.appendChild(itemQtdCompra)

          const shopRemove = remove.onclick = () => {
            productsInShop.splice(productsInShop.findIndex(obj=>obj==product),1)
            li.remove()
            if(shopGridElement.childElementCount == 0) {
              buttonEfetuarVenda.style.display = 'none'
            }
            itemQtdCompra.value = 1
            inGrid.element.style.display = ''
          }
          return {
            element: li,
            quantidade,
            itemQtdCompra,
            shopRemove
          }
        }()
        const inGrid = function() {
          const li = document.createElement('li')
          li.className = 'product-grid-item'
          productGridElement.appendChild(li)
          const img = document.createElement('img')
          img.className = 'item-showcase'
          img.src = src
          li.appendChild(img)
          const div = document.createElement('div')
          li.appendChild(div)
          const descricao = document.createElement('div')
          descricao.className = 'item-name'
          descricao.innerText = productToInsert.descricao
          div.appendChild(descricao)
          const price = document.createElement('div')
          price.className = 'item-price'
          price.innerText = currency
          div.appendChild(price)
          const qtdDiv = document.createElement('div')
          qtdDiv.className = 'item-qtd'
          qtdDiv.innerHTML = '<div>Quantidade:</div>'
          const quantidade = document.createElement('div')
          quantidade.innerText = productToInsert.qtdEmEstoque
          qtdDiv.append(quantidade)
          div.appendChild(qtdDiv)

          li.onclick = () => {
            if(product.quantidade > 0) {
              productsInShop.push(product)
              buttonEfetuarVenda.style.display = ''
              li.style.display = "none"
              shopGridElement.appendChild(inShop.element)
            }
          }
          return {
            element: li,
            quantidade
          }
        }()
        product.inGrid = inGrid
        product.inShop = inShop
        productsInGrid.push(product)
      })
    }

    ipc.send('products')
    ipc.on('products', (e, products) => {
      add(products)
    })

    return { productsInGrid, productsInShop, add, findById, clearProductsInShop }
  }()
  const productFilters = await async function() {
    const filterInUse = []
    const search = function(){
      const searchBox = document.getElementById('search')
      return searchBox.onkeyup = () => {
        if(filterInUse.length) {
          productsGrid.productsInGrid.forEach(element => {
            if(!element.inShop.element.parentElement) {
              const found = filterInUse.findIndex(obj=>obj.id==element[obj.name]) == -1 ? false : true
              if(found && element.descricao.toLowerCase().indexOf(searchBox.value.toLowerCase()) != -1) {
                element.inGrid.element.style.display = ''
              } else {
                element.inGrid.element.style.display = 'none'
              }
            }
          }) 
        } else {
          productsGrid.productsInGrid.forEach(element => {
            if(!element.inShop.element.parentElement) {
              if(element.descricao.toLowerCase().indexOf(searchBox.value.toLowerCase()) != -1) {
                element.inGrid.element.style.display = ''
              } else {
                element.inGrid.element.style.display = 'none'
              }
            }
          })
        }
      }
    }()
    function addFilter(filter, title, key) {
      // section
      const section = document.createElement('section')
      section.className = 'filter-group'
      filterBarId.append(section)
      // header
      const header = document.createElement('header')
      header.className = 'filter-title'
      header.textContent = title
      section.append(header)
      // ul
      const ul = document.createElement('ul')
      section.append(ul)
      filter.forEach(element => {
        // li
        const li = document.createElement('li')
        li.className = 'filter-list-item'
        ul.append(li)
        // inputFilter
        const inputFilter = document.createElement('input')
        inputFilter.id = element[key]
        inputFilter.type = 'checkbox'
        inputFilter.name = key
        inputFilter.value = element.id
        inputFilter.onchange = function(){
          if (this.checked) {
            filterInUse.push({
              name: this.name+'_id',
              id: this.value
            })
            search()
          } else {
            let index = filterInUse.findIndex(obj=>obj.value == this.value)
            filterInUse.splice(index,1)
            search()
          }
        }
        li.append(inputFilter)
        // label
        const label = document.createElement('label')
        label.htmlFor = element[key]
        label.textContent = element[key]
        li.append(label)
      })
    }

    ipc.send('filters')
    const filterBarId = document.getElementById('filter-bar')
    const { cores, generos, tamanhos } = await new Promise(resolve => {
      ipc.on('filters', (e, filters) => resolve(filters))
    })
    addFilter(generos, 'Gênero', 'genero')
    addFilter(tamanhos, 'Tamanho', 'tamanho')
    addFilter(cores, 'Cor', 'cor')

    return { search, cores, generos, tamanhos }
  }()
  const alerta = function() {
    const div = document.createElement('div')
    div.className = 'alert'
    div.style.display = 'none'
    div.style.opacity = '0'
    document.body.append(div)
  
    const alertBody = document.createElement('div')
    alertBody.className = 'alert-body'
    div.append(alertBody)
  
    const progressBar = document.createElement('div')
    progressBar.className = 'alert-progress-bar'
    div.append(progressBar)
  
    let interval, pause
    div.onmouseenter = () => {
      pause = new Promise(resolve=>{})
    }
    div.onmouseleave = () => {
      pause = null
    }

    function closeAlert() {
      return new Promise(resolve=> {
        clearInterval(interval)
        div.style.opacity = '0'
        setTimeout(() => {
          div.style.display = 'none'
          resolve()
        }, 100);
      })
    }
    function progressAnimation() {
      div.style.display = 'block'
      div.style.opacity = '1'
      progressBar.style.width = '100%'
      let count = 100
      interval = setInterval(async() => {
        await pause
        count -= 1
        progressBar.style.width = count+'%'
        if(count == 0) {
          closeAlert()
        }
      }, 30);
    }
  
    div.onclick = () => {
      closeAlert()
    }
  
    return async(string) => {
      await closeAlert()
      alertBody.innerText = string
      progressAnimation()
    }
  }()
  const modal = function() {
    function up() {
      modal.body.innerHTML = ''
      document.body.append(fadeDiv)
      document.body.append(modalDisplay)
      document.body.style.overflow = 'hidden'
    }
    function down() {
      fadeDiv.remove()
      modalDisplay.remove()
      modal.footer.remove()
      modal.body.innerHTML = ''
      document.body.style.overflow = ''
      modal.footer.style.display = ''
    }
    // Fade
    const fadeDiv = document.createElement('div')
    fadeDiv.className = 'fade'
    // Modal Display
    const modalDisplay = document.createElement('div')
    modalDisplay.className = 'modalDisplay'
    modalDisplay.onclick = (e) => {
      if(e.target==modalDisplay) down()
    }
    // Modal
    const modalDiv = document.createElement('div')
    modalDiv.className = 'modal'
    modalDisplay.append(modalDiv)
    // Header
    const modalHeader = document.createElement('header')
    modalHeader.className = 'modal-header'
    modalDiv.append(modalHeader)
    // Header/Title
    const title = document.createElement('h5')
    title.className = 'modal-title'
    modalHeader.append(title)
    // Header/Close
    const modalClose = document.createElement('buttons')
    modalClose.className = 'modal-close'
    modalClose.textContent = 'x'
    modalClose.onclick = down
    modalHeader.append(modalClose)
    /* Form
    ---------*/
    const form = document.createElement('form')
    modalDiv.append(form)
    // Form/Body
    const body = document.createElement('div')
    body.className = 'modal-body'
    form.append(body)
    // Form/Footer
    const footer = document.createElement('footer')
    footer.className = 'modal-footer'
    // Form/Footer/Button-Close
    const modalBtnClose = document.createElement('button')
    modalBtnClose.className = 'btn btn-secondary'
    modalBtnClose.textContent = 'Fechar'
    modalBtnClose.onclick = down
    footer.append(modalBtnClose)
    // Form/Footer/Button-Save
    const modalBtnSave = document.createElement('button')
    modalBtnSave.className = 'btn btn-success'
    modalBtnSave.textContent = 'Salvar'
    footer.append(modalBtnSave)
    return {
      title, body, footer, form, up, down, modalDiv
    }
  }()
  /* Modal Views
  ---------------*/
  // Menu
  document.getElementById("inventory-controller").onclick = function() {
    // Switchs
    function cadastroEstoque() {
      const divCadastro = document.createElement('div')
      let div, label
      // Descrição
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const descricao = document.createElement('input')
      descricao.required = true
      descricao.type = 'text'
      // Label
      label = document.createElement('label')
      label.textContent = 'Descrição:'
      div.append(label)
      div.append(descricao)
      // Imagem
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const imagem = document.createElement('input')
      imagem.type = 'file'
      imagem.accept = 'image/png, image/jpeg, image/webp'
      // Label
      label = document.createElement('label')
      label.textContent = 'Imagem:'
      div.append(label)
      div.append(imagem)
      // Tamanho
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const tamanho = document.createElement('select')
      productFilters.tamanhos.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.tamanho
        option.value = element.id
        tamanho.append(option)
      });
      // Label
      label = document.createElement('label')
      label.textContent = 'Tamanho:'
      div.append(label)
      div.append(tamanho)
      // Cor
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const cor = document.createElement('select')
      productFilters.cores.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.cor
        option.value = element.id
        cor.append(option)
      });
      // Label
      label = document.createElement('label')
      label.textContent = 'Cor:'
      div.append(label)
      div.append(cor)
      // Gênero
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const genero = document.createElement('select')
      productFilters.generos.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.genero
        option.value = element.id
        genero.append(option)
      });
      // Label
      label = document.createElement('label')
      label.textContent = 'Gênero:'
      div.append(label)
      div.append(genero)
      // Preço
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const preco = document.createElement('input')
      preco.type = 'number'
      preco.min = 0.00
      preco.max = 10000.00
      preco.step = 0.05
      preco.required = true
      // Label
      label = document.createElement('label')
      label.textContent = 'Preço:'
      div.append(label)
      div.append(preco)
      // Quantidade Estoque
      div = document.createElement('div')
      div.className = 'campoCadastro'
      divCadastro.append(div)
      const qtdEstoque = document.createElement('input')
      qtdEstoque.type = 'number'
      qtdEstoque.min = 0
      qtdEstoque.required = true
      // Label
      label = document.createElement('label')
      label.textContent = 'Qtd em Estoque:'
      div.append(label)
      div.append(qtdEstoque)
      // Interface
      function cadastroEstoque(e) {
        e.preventDefault()
        try {
          if(productsGrid.productsInGrid.findIndex(obj => descricao.value == obj.descricao) != -1) {
            throw 'Produto já existe'
          }
          const newProduct = {
            descricao: descricao.value,
            tamanho: parseInt(tamanho.value),
            cor: parseInt(cor.value),
            genero: parseInt(genero.value),
            preco: parseFloat(preco.value),
            qtdEmEstoque: parseInt(qtdEstoque.value),
          }
          if(imagem.files[0] != null) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imagem.files[0])
    
            fileReader.addEventListener("loadend", function() {
              newProduct.imagem = fileReader.result
              ipc.send('cadastroProduto', newProduct)
            });
          } else {
            ipc.send('cadastroProduto', newProduct)
          }
        } catch (err) {
          alerta(err)
        }
      }
      ipc.on('cadastroProduto', (e, result) => {
        if(result.err == null) {
          productsGrid.add([result])
          // Limpa Campos
          descricao.value = null
          preco.value = null
          qtdEstoque.value = null
          imagem.value = null
          alerta('Cadastrado com sucesso')
        } else {
          alerta('Falha no cadastro: '+ result.err)
        }
      })
      return (e) => {
        e.preventDefault()
        modal.title.textContent = 'Cadastro Estoque'
        modal.body.innerHTML = ''
        descricao.value = null
        imagem.value = null
        preco.value = null
        qtdEstoque.value = null
        
        modal.form.onsubmit = cadastroEstoque
        modal.form.append(modal.footer)
        modal.body.append(divCadastro)
      }
    }
    function descadastroEstoque() {
      const formDiv = document.createElement('div')
      // Div
      const div = document.createElement('div')
      div.className = 'campoCadastro'
      formDiv.append(div)
      // Produtos
      const select = document.createElement('select')
      // Label
      label = document.createElement('label')
      label.textContent = 'Produto:'
      div.append(label)
      div.append(select)

      function formSubmit(e) {
        e.preventDefault()
        try {
          if(select.value == 0) throw 'Selecione um produto!'
          const { id, imagem } = productsGrid.productsInGrid.find(obj => obj.id == select.value)
          ipc.send('descadastroProduto', { id, imagem })
        } catch (e) {
          alerta(e)
        }
      }
      ipc.on('descadastroProduto', (event, result) => {
        if(result.err == null) {
          select.selectedOptions[0].remove()
          const i = productsGrid.productsInGrid.findIndex(obj=>obj.id==result)
          const product = productsGrid.productsInGrid.splice(i,1)[0]
          product.inGrid.element.remove()
          product.inShop.element.remove()
          alerta('Removido com sucesso')
        } else {
          alerta('Falha na remoção do produto: '+ result.err)
        }
      })
      return (e) => {
        e.preventDefault()
        modal.title.textContent = 'Exclusão Estoque'
        modal.body.innerHTML = ''

        select.innerHTML = ''
        {
          const option = document.createElement('option')
          option.textContent = ""
          option.value = 0
          select.append(option)
        }
        productsGrid.productsInGrid.forEach(element => {
          const option = document.createElement('option')
          option.textContent = element.descricao
          option.value = element.id
          select.append(option)
        });
        
        modal.body.append(formDiv)
        modal.form.onsubmit = formSubmit
        modal.form.append(modal.footer)
      }
    }
    function adicionarVendedor() {
      const formDiv = document.createElement('div')
      // Div
      const div = document.createElement('div')
      div.className = 'campoCadastro'
      formDiv.append(div)
      // Nome
      const input = document.createElement('input')
      input.title = 'Números não são permitidos; 3-20 caracteres'
      input.pattern = '[^0-9]{3,20}'
      // Label
      label = document.createElement('label')
      label.textContent = 'Nome:'
      div.append(label)
      div.append(input)
      function formSubmit(e) {
        e.preventDefault()
        try {
          if(input.length < 3) throw 'Digite um nome válido!'
          for(let i=0; i < modalVenda.selectVendedor.childElementCount; i++) {
            if(modalVenda.selectVendedor.children[i].innerText == input.value) {
              throw 'Vendedor já existe'
            }
          }
          ipc.send('cadastroVendedor', input.value)
        } catch (e) {
          alerta(e)
        }
      }
      ipc.on('cadastroVendedor', (e, result) => {
        if(result.err == null) {
          input.value = null
          modalVenda.addVendedor(result.vendedor)
          alerta(`Vendedor ${result.vendedor.nomeVendedor} Cadastrado`)
        } else {
          alerta(result.err)
        }
      })
      return (e) => {
        e.preventDefault()
        input.value = ''
        modal.title.textContent = 'Adicionar Vendedor'
        modal.body.innerHTML = ''
        modal.body.append(formDiv)
        modal.form.onsubmit = formSubmit
        modal.form.append(modal.footer)
      }
    }
    function removerVendedor() {
      const formDiv = document.createElement('div')
      // Div
      const div = document.createElement('div')
      div.className = 'campoCadastro'
      formDiv.append(div)
      // Produtos
      const select = document.createElement('select')
      select.required = true
      // Label
      label = document.createElement('label')
      label.textContent = 'Vendedor:'
      div.append(label)
      div.append(select)

      function formSubmit(e) {
        e.preventDefault()
        try {
          ipc.send('removerVendedor', select.value)
        } catch (e) {
          alerta(e)
        }
      }
      ipc.on('removerVendedor', (event, result) => {
        if(!result.err) {
          modalVenda.selectVendedor
          for(let i=0; i < modalVenda.selectVendedor.childElementCount; i++) {
            if(modalVenda.selectVendedor.children[i].value == result.id) {
              modalVenda.selectVendedor.children[i].remove()
              select.children[i].remove()
              break
            }
          }
          alerta('Removido com sucesso')
        } else {
          alerta(result.err)
        }
      })
      return (e) => {
        e.preventDefault()
        modal.title.textContent = 'Remover Vendedor'
        modal.body.innerHTML = ''

        select.innerHTML = ''
        for(let i=0; i < modalVenda.selectVendedor.childElementCount; i++) {
          select.append(modalVenda.selectVendedor.children[i].cloneNode(true))
        }
        
        modal.body.append(formDiv)
        modal.form.onsubmit = formSubmit
        modal.form.append(modal.footer)
      }
    }
    function alterarEstoque() {
      const formDiv = document.createElement('div')
      let div
      // Produtos
      div = document.createElement('div')
      div.className = 'campoCadastro'
      formDiv.append(div)
      const select = document.createElement('select')
      select.onchange = () => {
        if(select.value) {
          qtdInput.disabled = false
          qtdInput.value = productsGrid.findById(select.value).quantidade
        } else {
          qtdInput.disabled = true
          qtdInput.value = null
        }
      }
      // Label
      label = document.createElement('label')
      label.textContent = 'Produto:'
      div.append(label)
      div.append(select)
      // Quantidade
      div = document.createElement('div')
      div.className = 'campoCadastro'
      formDiv.append(div)
      const qtdInput = document.createElement('input')
      qtdInput.type = "number"
      qtdInput.min = 1
      // Label
      label = document.createElement('label')
      label.textContent = 'Quantidade:'
      div.append(label)
      div.append(qtdInput)
      // Label
      function formSubmit(e) {
        e.preventDefault()
        try {
          if(select.value == 0) throw 'Selecione um produto!'

          ipc.send('alteracaoEstoque', {
            id: select.value,
            qtdEmEstoque: parseInt(qtdInput.value)
          })
          
        } catch (e) {
          alerta(e)
        }
      }
      ipc.on('alteracaoEstoque', (e, result) => {
        if(result.product) {
          const product = productsGrid.findById(result.product.id)
          product.setQuantidade(result.product.qtdEmEstoque)
          alerta('Produto Alterado')
        } else {
          alerta(result.err)
        }
      })
      return (e) => {
        e.preventDefault()
        modal.title.textContent = 'Entrada Estoque'
        modal.body.innerHTML = ''
        qtdInput.disabled = true
        qtdInput.value = null

        select.innerHTML = ''
        {
          const option = document.createElement('option')
          option.textContent = ""
          select.append(option)
        }
        productsGrid.productsInGrid.forEach(element => {
          const option = document.createElement('option')
          option.textContent = element.descricao
          option.value = element.id
          select.append(option)
        });
        
        modal.body.append(formDiv)
        modal.form.onsubmit = formSubmit
        modal.form.append(modal.footer)
      }
    }
    function relatorioVendas() {
      const formDiv = document.createElement('div')
      let div
      div = document.createElement('div')
      div.className = 'filtrosRelatorio'
      formDiv.append(div)
      // Data Inicial
      const dataInicial = document.createElement('input')
      dataInicial.type = 'date'
      div.append(dataInicial)
      // Data Final
      const dataFinal = document.createElement('input')

      dataFinal.type = 'date'
      div.append(dataFinal)
      // Table
      const table = document.createElement('table')
      table.className = 'tabelaVenda'
      formDiv.append(table)
      // Table Header
      const thead = document.createElement('thead')
      table.append(thead)
      {
        let tr, th
        tr = document.createElement('tr')
        thead.append(tr)
        th = document.createElement('th')
        th.innerText = 'Código Venda'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Descrição'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Gênero'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Tamanho'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Cor'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Qtd Vendida'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Vendedor'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Método Pagamento'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Tipo Pagamento'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Sem Desconto'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Com Desconto'
        tr.append(th)
        th = document.createElement('th')
        th.innerText = 'Data Venda'
        tr.append(th)
      }
      // Table Body
      const tbody = document.createElement('tbody')
      table.append(tbody)
      
      const formButton = modal.footer.children[1]
      dataInicial.onchange = () => {
        dataFinal.min = dataInicial.value

        const after30Days = new Date(dataInicial.value + ' 00:00:00')
        after30Days.setDate(after30Days.getDate()+30)

        const today = new Date()
        if(after30Days > today) {
          dataFinal.max = today.toISOString().substr(0,10)
        } else {
          dataFinal.max = after30Days.toISOString().substr(0,10)
        }
        formButton.click()
      }
      dataFinal.onchange = () => {
        dataInicial.max = dataFinal.value
        formButton.click()
      }

      function formSubmit(e) {
        e.preventDefault()
        const dataI = new Date(dataInicial.value)
        const dataF = new Date(dataFinal.value + ' 23:59:59.999')
        ipc.send('relatorioVendas', [dataI,dataF])
      }
      ipc.on('relatorioVendas', (e, result) => {
        tbody.innerHTML = ''
        console.log(result)
        result.forEach(element => {
          const tr = document.createElement('tr')
          tbody.append(tr)
          let td
          td = document.createElement('td')
          td.innerText = element.venda_id
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.descricao
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.genero
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.tamanho
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.cor  
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.quantidadeVenda  
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.nomeVendedor
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.metodoPagamento
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.tipoPagamento
          tr.append(td)
          td = document.createElement('td')
          td.innerText = element.preco.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
          })
          tr.append(td)
          td = document.createElement('td')
          td.innerText = (element.preco-element.desconto).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
          })
          tr.append(td)
          td = document.createElement('td')
          td.innerText = new Date(element.dataVenda).toLocaleString()
          tr.append(td)
        })
      })

      return (e) => {
        e.preventDefault()
        modal.modalDiv.style.maxWidth = ''
        modal.title.textContent = 'Relatório de Vendas'
        modal.body.innerHTML = ''
        modal.form.onsubmit = formSubmit

        const today = new Date().toISOString().substr(0,10)
        dataInicial.max = dataInicial.value = today
        dataFinal.max = dataFinal.value = today

        modal.body.append(formDiv)
        modal.footer.style.display = 'none'
        modal.form.append(modal.footer)

        formButton.click()
      }
    }
    /* Modal Template
    ------------------*/
    // Form/Body/Switch
    const modalSwitch = document.createElement('div')
    modalSwitch.className = 'modal-switch'
    // Form/Body/Switch/Group1
    const switchGroup1 = document.createElement('div')
    switchGroup1.className = 'switch-group'
    modalSwitch.append(switchGroup1)
    // Form/Body/Switch/Group1/Choice1
    const switchChoice1 = document.createElement('button')
    switchChoice1.textContent = 'Cadastro Estoque'
    switchChoice1.className = 'switch-choice'
    switchChoice1.onclick = cadastroEstoque()
    switchGroup1.append(switchChoice1)
    // Form/Body/Switch/Group1/Choice2
    const switchChoice2 = document.createElement('button')
    switchChoice2.textContent = 'Exclusão Estoque'
    switchChoice2.className = 'switch-choice'
    switchChoice2.onclick = descadastroEstoque()
    switchGroup1.append(switchChoice2)
    // Form/Body/Switch/Group2
    const switchGroup2 = document.createElement('div')
    switchGroup2.className = 'switch-group'
    modalSwitch.append(switchGroup2)
    // Form/Body/Switch/Group2/Choice3
    const switchChoice3 = document.createElement('button')
    switchChoice3.textContent = 'Adicionar Vendedor'
    switchChoice3.className = 'switch-choice'
    switchChoice3.onclick = adicionarVendedor()
    switchGroup2.append(switchChoice3)
    // Form/Body/Switch/Group2/Choice4
    const switchChoice4 = document.createElement('button')
    switchChoice4.textContent = 'Remover Vendedor'
    switchChoice4.className = 'switch-choice'
    switchChoice4.onclick = removerVendedor()
    switchGroup2.append(switchChoice4)
    // Form/Body/Switch/Group3
    const switchGroup3 = document.createElement('div')
    switchGroup3.className = 'switch-group'
    modalSwitch.append(switchGroup3)
    // Form/Body/Switch/Group2/Choice5
    const switchChoice5 = document.createElement('button')
    switchChoice5.textContent = 'Alterar Estoque'
    switchChoice5.className = 'switch-choice'
    switchChoice5.onclick = alterarEstoque()
    switchGroup3.append(switchChoice5)
    // Form/Body/Switch/Group2/Choice6
    const switchChoice6 = document.createElement('button')
    switchChoice6.textContent = 'Relatório de Vendas'
    switchChoice6.className = 'switch-choice'
    switchChoice6.onclick = relatorioVendas()
    switchGroup3.append(switchChoice6)
    return () => {
      productsGrid.clearProductsInShop()
      modal.title.textContent = 'Menu'
      modal.modalDiv.style.maxWidth = '50%'
      modal.up()
      modal.body.append(modalSwitch)
    }
  }()
}