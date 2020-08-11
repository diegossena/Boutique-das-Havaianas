const devMode = true
const rootPath = devMode ? '../../' : '../../../'

const ipc = require('electron').ipcRenderer
const { resolve } = require('path')

ipc.send('products')
ipc.send('filters')
ipc.send('tiposPagamento')
ipc.send('metodosPagamento')

let products = new Promise(result => {
  ipc.on('products', (e, products) => {
    result(products)
  })
})
let filters = new Promise(result => {
  ipc.on('filters', (e, filters) => {
    result(filters)
  })
})
let tiposPagamento = new Promise(result => {
  ipc.on('tiposPagamento', (e, tiposPagamento) => {
    result(tiposPagamento)
  })
})
let metodosPagamento = new Promise(result => {
  ipc.on('metodosPagamento', (e, metodosPagamento) => {
    result(metodosPagamento)
  })
})

window.onload = async()=>{
  products = await products
  filters = await filters
  tiposPagamento = await tiposPagamento
  metodosPagamento = await metodosPagamento
  /* Modals
  ----------*/
  // Modal Up
  function modalUp() {
    document.body.append(fadeDiv)
    document.body.append(modalDisplay)
    document.body.style.overflow = 'hidden'
  }
  // Modal Down
  function modalDown(e) {
    if(e.target==modalDisplay || e.target==modalBtnClose || e.target==modalClose){
      e.preventDefault()
      fadeDiv.remove()
      modalDisplay.remove()
      modalFooter.remove()
      modalBody.innerHTML = ''
      document.body.style.overflow = ''
    }
  }
  // Fade
  const fadeDiv = document.createElement('div')
  fadeDiv.className = 'fade'
  // Modal Display
  const modalDisplay = document.createElement('div')
  modalDisplay.className = 'modalDisplay'
  modalDisplay.onclick = modalDown
  // Modal
  const modalDiv = document.createElement('div')
  modalDiv.className = 'modal'
  modalDisplay.append(modalDiv)
  // Header
  const modalHeader = document.createElement('header')
  modalHeader.className = 'modal-header'
  modalDiv.append(modalHeader)
  // Header/Title
  const modalTitle = document.createElement('h5')
  modalTitle.className = 'modal-title'
  modalHeader.append(modalTitle)
  // Header/Close
  const modalClose = document.createElement('buttons')
  modalClose.className = 'modal-close'
  modalClose.textContent = 'x'
  modalClose.onclick = modalDown
  modalHeader.append(modalClose)
  /* Form
  ---------*/
  const modalForm = document.createElement('form')
  modalDiv.append(modalForm)
  // Form/Body
  const modalBody = document.createElement('div')
  modalBody.className = 'modal-body'
  modalForm.append(modalBody)
  // Form/Footer
  const modalFooter = document.createElement('footer')
  modalFooter.className = 'modal-footer'
  // Form/Footer/Button-Close
  const modalBtnClose = document.createElement('button')
  modalBtnClose.className = 'btn btn-secondary'
  modalBtnClose.textContent = 'Fechar'
  modalBtnClose.onclick = modalDown
  modalFooter.append(modalBtnClose)
  // Form/Footer/Button-Save
  const modalBtnSave = document.createElement('button')
  modalBtnSave.className = 'btn btn-success'
  modalBtnSave.textContent = 'Salvar'
  modalFooter.append(modalBtnSave)
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
      filters[1][Object.keys(filters[1])[1]].forEach(element => {
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
      filters[2][Object.keys(filters[2])[1]].forEach(element => {
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
      filters[0][Object.keys(filters[0])[1]].forEach(element => {
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
      preco.step = 0.01
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
      label.textContent = 'Qtd.Estoque:'
      div.append(label)
      div.append(qtdEstoque)
      // Interface
      let newProduct
      function cadastroEstoque(e) {
        e.preventDefault()
        try {
          products.forEach(element => {
            if(descricao.value == element.descricao) {
              throw 'Produto já existe'
            }
          });
          newProduct = {
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
          alert(err)
        }
      }
      ipc.on('cadastroProduto', (event, result) => {
        if(result.error == null) {
          newProduct.id = result.id
          newProduct.imagem = result.imagem
          products.push(newProduct) // Adiciona na lista de produtos
          insertProductsInGrid([newProduct]) // Adiciona produto no grid
          // Limpa Campos
          descricao.value = null
          preco.value = null
          qtdEstoque.value = null
          imagem.value = null
          alert('Cadastrado com sucesso')
        } else {
          alert('Falha no cadastro: '+ result.error)
        }
        newProduct = {}
      })
      return (e) => {
        e.preventDefault()
        modalTitle.textContent = 'Cadastro Estoque'
        modalBody.innerHTML = ''
        descricao.value = null
        imagem.value = null
        preco.value = null
        qtdEstoque.value = null
        
        modalForm.onsubmit = cadastroEstoque
        modalForm.append(modalFooter)
        modalBody.append(divCadastro)
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
          for (const key in products) {
            if(select.value == products[key].id) {
              ipc.send('descadastroProduto', products[key])
              break
            }
          }
        } catch (e) {
          alert(e)
        }
      }
      ipc.on('descadastroProduto', (event, result) => {
        if(result.error == null) {
          products.splice(products.findIndex(e=>e.id==result.id),1)
          document.getElementById('product-'+result.id).remove()
          {
            const element = document.getElementById('inShop-'+result.id)
            if(element){
              element.remove()
            }
          }
          for (const key in select.children) {
            if(result.id == select.children[key].value) {
              select.children[key].remove()
              break
            }
          }
          alert('Removido com sucesso')
        } else {
          alert('Falha na remoção do produto: '+ result.error)
        }
      })
      return (e) => {
        e.preventDefault()
        modalTitle.textContent = 'Exclusão Estoque'
        modalBody.innerHTML = ''

        select.innerHTML = ''
        {
          const option = document.createElement('option')
          option.textContent = ""
          option.value = 0
          select.append(option)
        }
        products.forEach(element => {
          const option = document.createElement('option')
          option.textContent = element.descricao
          option.value = element.id
          select.append(option)
        });
        
        modalBody.append(formDiv)
        modalForm.onsubmit = formSubmit
        modalForm.append(modalFooter)
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
    switchChoice3.textContent = 'Saída'
    switchChoice3.className = 'switch-choice'
    switchChoice3.onclick = (e) => e.preventDefault()
    switchGroup2.append(switchChoice3)
    // Form/Body/Switch/Group2/Choice4
    const switchChoice4 = document.createElement('button')
    switchChoice4.textContent = 'Descadastro'
    switchChoice4.className = 'switch-choice'
    switchChoice4.onclick = (e) => e.preventDefault()
    switchGroup2.append(switchChoice4)
    return () => {
      modalTitle.textContent = 'Menu'
      modalBody.append(modalSwitch)
      modalUp()
    }
  }()
  let productsInShop = []
  const modalVenda = (() => {
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
    // Label
    label = document.createElement('label')
    label.textContent = 'Método de Pagamento:'
    div.append(label)
    div.append(selectMetodosPagamento)
    
    function realizarVenda(e) {
      e.preventDefault()
      const venda = {
        products: productsInShop,
        metodoPagamento: parseInt(selectMetodosPagamento.value),
        tipoPagamento: parseInt(selectTiposPagamento.value)
      }
      ipc.send('venda', venda)
    }
    return () => {
      modalTitle.textContent = 'Venda'
      tbody.innerHTML = ""
      modalBody.append(divVenda)

      selectTiposPagamento.innerHTML = ''
      tiposPagamento.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.tipoPagamento
        option.value = element.id
        selectTiposPagamento.append(option)
      })

      selectMetodosPagamento.innerHTML = ''
      metodosPagamento.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.metodoPagamento
        option.value = element.id
        selectMetodosPagamento.append(option)
      })
      
      productsInShop.forEach(element => {
        tr = document.createElement('tr')
        tbody.append(tr)

        let td

        td = document.createElement('td')
        tr.append(td)
        const img = document.createElement("img")
        if(element.imagem == 'default') {
          img.src = defaultImage
        } else {
          img.src = resolve(uploadPath, element.imagem)
        }
        td.append(img)

        td = document.createElement('td')
        td.innerText = element.descricao
        tr.append(td)

        td = document.createElement('td')
        td.innerText = element.unidades
        tr.append(td)

        td = document.createElement('td')
        td.innerText = element.preco.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        })
        tr.append(td)

        td = document.createElement('td')
        td.innerText = (element.preco*element.unidades).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        })
        tr.append(td)
      });

      modalForm.onsubmit = realizarVenda
      modalForm.append(modalFooter)

      modalUp()
    }
  })()
  /* Products Grid
  -----------------*/
  const defaultImage = resolve(__dirname, 'img', 'placeholder.svg')
  const uploadPath = resolve(__dirname, rootPath, 'uploads')

  const productGrid = document.getElementById('products-grid')
  const shopGrid = document.getElementById('shop-grid')
  const formVenda = document.getElementById('formVenda')
  
  const buttonEfetuarVenda = document.createElement('button')
  buttonEfetuarVenda.type = 'submit'
  buttonEfetuarVenda.className = 'efetuarVenda'
  buttonEfetuarVenda.innerText = 'Efetuar Venda'
  buttonEfetuarVenda.style.display = 'none'
  formVenda.appendChild(buttonEfetuarVenda)


  formVenda.onsubmit = function(e) {
    e.preventDefault()
    productsInShop = []
    for(let i=0, length=shopGrid.childElementCount; i<length; i++) {
      const element = shopGrid.children[i].children[2].children[3]
      const productId  = element.name
      const unidades = parseInt(element.value)
      for (const key in products) {
        const product = products[key];
        if(productId == product.id) {
          productsInShop.push({
            id: product.id,
            descricao: product.descricao,
            imagem: product.imagem,
            unidades: unidades,
            preco: product.preco
          })
          break;
        }
      }
    }
    modalVenda()
  }
  insertProductsInGrid(products)
  function insertProductsInGrid(productsToInsert) {
    productsToInsert.forEach(element => {
      let src
      if(element.imagem == 'default') {
        src = defaultImage
      } else {
        src = resolve(uploadPath, element.imagem)
      }
      let currency = element.preco.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
      })
      // Produtos
      const product = document.createElement('li')
      {
        product.id = 'product-'+element.id
        product.className = 'product-grid-item'
        productGrid.appendChild(product)
        const img = document.createElement('img')
        img.className = 'item-showcase'
        img.src = src
        product.appendChild(img)
        const div = document.createElement('div')
        product.appendChild(div)
        const itemName = document.createElement('span')
        itemName.className = 'item-name'
        itemName.innerText = element.descricao
        div.appendChild(itemName)
        const itemPrice = document.createElement('span')
        itemPrice.className = 'item-price'
        itemPrice.innerText = currency
        div.appendChild(itemPrice)
        const itemQtd = document.createElement('span')
        itemQtd.className = 'item-qtd'
        itemQtd.innerText = 'Quantidade: '+element.qtdEmEstoque
        div.appendChild(itemQtd)
      }
      // Em Compra
      const inShop = document.createElement('li')
      {
        inShop.id = 'inShop-'+element.id
        inShop.style.cursor = 'unset'
        inShop.className = 'product-grid-item'
        const remove = document.createElement('button')
        remove.className = 'product-remove'
        remove.innerText = 'X'
        inShop.appendChild(remove)
        const img = document.createElement('img')
        img.className = 'item-showcase'
        img.src = src
        inShop.appendChild(img)
        const div = document.createElement('div')
        inShop.appendChild(div)
        const itemName = document.createElement('span')
        itemName.className = 'item-name'
        itemName.innerText = element.descricao
        div.appendChild(itemName)
        const itemPrice = document.createElement('span')
        itemPrice.className = 'item-price'
        itemPrice.innerText = currency
        div.appendChild(itemPrice)
        const itemQtd = document.createElement('span')
        itemQtd.className = 'item-qtd'
        itemQtd.innerText = 'Quantidade: '+element.qtdEmEstoque
        div.appendChild(itemQtd)
        const itemQtdCompra = document.createElement('input')
        itemQtdCompra.name = element.id
        itemQtdCompra.type = "number"
        itemQtdCompra.min = 1
        itemQtdCompra.value = 1
        itemQtdCompra.max = element.qtdEmEstoque
        div.appendChild(itemQtdCompra)
        remove.onclick = () => {
          product.inShop = false
          inShop.remove()
          filterSearch()
          itemQtdCompra.value = 1
          if(shopGrid.childElementCount==0) {
            buttonEfetuarVenda.style.display = 'none'
          }
        }
      }
      product.onclick = () => {
        product.inShop = true
        product.style.display = "none"
        shopGrid.appendChild(inShop)
        buttonEfetuarVenda.style.display = 'block'
      }
    });
  }

  /* Filter Bar
  --------------*/
  const filterBarId = document.getElementById('filter-bar')
  const searchBox = document.getElementById('search')
  let filterInUse = []

  filters.forEach(element => {
    // section
    const section = document.createElement('section')
    section.className = 'filter-group'
    filterBarId.append(section)
    // header
    const header = document.createElement('header')
    header.className = 'filter-title'
    header.textContent = element.name
    section.append(header)
    // ul
    const ul = document.createElement('ul')
    section.append(ul)
    element[Object.keys(element)[1]].forEach(input=>{
      // li
      const li = document.createElement('li')
      li.className = 'filter-list-item'
      ul.append(li)
      // inputFilter
      const keys = Object.keys(input)
      const inputFilter = document.createElement('input')
      inputFilter.id = input[keys[1]]
      inputFilter.type = 'checkbox'
      inputFilter.name = keys[1]
      inputFilter.value = input.id
      inputFilter.onchange = function(){
        if (this.checked) {
          filterInUse.push({
            name: this.name+'_id',
            id: this.value
          })
          filterSearch()
        } else {
          let index = filterInUse.findIndex(obj=>obj.name==this.name+'_id' && obj.id == this.value)
          filterInUse.splice(index,1)
          filterSearch()
        }
      }
      li.append(inputFilter)
      // label
      const label = document.createElement('label')
      label.htmlFor = input[keys[1]]
      label.textContent = input[keys[1]]
      li.append(label)
    })
  });

  const filterSearch = searchBox.onkeyup = () => {
    if(filterInUse.length) {
      products.forEach(element => {
        let found = false
        filterInUse.forEach(sub=>{
          if(element[sub.name] == sub.id) {
            found = true
          }
        })
        const productElement = document.getElementById('product-'+element.id)
        if(!productElement.inShop && found && element.descricao.toLowerCase().indexOf(searchBox.value.toLowerCase()) != -1) {
          productElement.style.display = ''
        } else {
          productElement.style.display = 'none'
        }
      }) 
    } else {
      products.forEach(element => {
        const productElement = document.getElementById('product-'+element.id)
        if(!productElement.inShop && element.descricao.toLowerCase().indexOf(searchBox.value.toLowerCase()) != -1) {
          productElement.style.display = ''
        } else {
          productElement.style.display = 'none'
        }
      })
    }
  }
}