
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('havaianas').del()
    .then(function () {
      /*
      return knex('havaianas').insert([{"id":1,"descricao":"HAV SLIDE BRASIL ROSA CROCUS","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":90,"qtdEmEstoque":3},{"id":2,"descricao":"HAV POWER PRETO","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":60,"qtdEmEstoque":4},{"id":3,"descricao":"HAV POWER AZUL MARINHO","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":60,"qtdEmEstoque":4},{"id":4,"descricao":"HAV SLIM MLP LAVANDA","tamanho_id":1,"cor_id":11,"genero_id":1,"imagem":"","preco":40,"qtdEmEstoque":6},{"id":5,"descricao":"HAV TOP DISNEY INFANTIL CINZA GELO","tamanho_id":1,"cor_id":6,"genero_id":1,"imagem":"","preco":35,"qtdEmEstoque":5},{"id":6,"descricao":"HAV TOP ATLHETIC LARANJA BEGONIA","tamanho_id":1,"cor_id":1,"genero_id":1,"imagem":"","preco":28,"qtdEmEstoque":15},{"id":7,"descricao":"HAV KIDS CARTOON STIVE MARINHO","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":3},{"id":8,"descricao":"HAV KIDS CARTOON TITIO AVO ICE BLUE","tamanho_id":1,"cor_id":3,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":4},{"id":9,"descricao":"HAV SLIM PETS BEGE PALHA/MARAVILHA","tamanho_id":1,"cor_id":4,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":5},{"id":10,"descricao":"HAV SLIM PETSAZUL CEU","tamanho_id":1,"cor_id":3,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":8},{"id":11,"descricao":"HAV KIDS SLIM PRINCESS ROSA FLUX","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":1},{"id":12,"descricao":"HAV SLIM MLP BRANCO","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":40,"qtdEmEstoque":3},{"id":13,"descricao":"HAV INFANTIL MINIONS BEGE PALHA","tamanho_id":1,"cor_id":4,"genero_id":1,"imagem":"","preco":32,"qtdEmEstoque":6},{"id":14,"descricao":"HAV MASCOTES DAS OLIMPIADAS","tamanho_id":1,"cor_id":12,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":4},{"id":15,"descricao":"HAV BABY CHIC AZUL","tamanho_id":1,"cor_id":3,"genero_id":2,"imagem":"","preco":30,"qtdEmEstoque":8},{"id":16,"descricao":"HAV BABY CLASSIS  MINNIE ROSA CREAM","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":30,"qtdEmEstoque":3},{"id":17,"descricao":"BABY HEROIS BATMAM AMARELO BANANA","tamanho_id":1,"cor_id":1,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":3},{"id":18,"descricao":"BABY OLAF","tamanho_id":1,"cor_id":1,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":3},{"id":19,"descricao":"BABY HEROIS BATMAM PRETO/PRETO","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":6},{"id":20,"descricao":"HAV BABY HEROIS SUPER MAM TURQUESA/VERMELHO","tamanho_id":1,"cor_id":3,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":6},{"id":21,"descricao":"HAV BABY CLASSIS MICKEY AMARELO LIMAO","tamanho_id":1,"cor_id":1,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":5},{"id":22,"descricao":"HAV BABY BRASIL LOGO ROSA HOLLI","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":30,"qtdEmEstoque":5},{"id":23,"descricao":"HAV BABY DUMBO ROSA BALET","tamanho_id":2,"cor_id":10,"genero_id":2,"imagem":"","preco":30,"qtdEmEstoque":2},{"id":24,"descricao":"HAV BABY CHICK BRANCO MARINHO","tamanho_id":2,"cor_id":5,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":3},{"id":25,"descricao":"HAVHAV FL URBAN NUDE ROSA","tamanho_id":2,"cor_id":10,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":9},{"id":26,"descricao":"HAV LUNA ROSE GOLD/ROSE BEGE","tamanho_id":2,"cor_id":10,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":13},{"id":27,"descricao":"HAV LUNA ROSA CROCUS","tamanho_id":2,"cor_id":10,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":3},{"id":28,"descricao":"HAV BRASIL MARINHO","tamanho_id":2,"cor_id":7,"genero_id":1,"imagem":"","preco":28,"qtdEmEstoque":1},{"id":29,"descricao":"HAV BRASIL BRANCA","tamanho_id":2,"cor_id":5,"genero_id":1,"imagem":"","preco":28,"qtdEmEstoque":2},{"id":30,"descricao":"HAV DINAMIC PRETO","tamanho_id":2,"cor_id":9,"genero_id":1,"imagem":"","preco":45,"qtdEmEstoque":4},{"id":31,"descricao":"HAV DINAMIC BRANCO","tamanho_id":2,"cor_id":5,"genero_id":1,"imagem":"","preco":45,"qtdEmEstoque":1},{"id":32,"descricao":"HAV CASUAL BRANCO/CINZA","tamanho_id":2,"cor_id":5,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":5},{"id":33,"descricao":"HAV CASUAL PRETO/VERMELHO","tamanho_id":2,"cor_id":9,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":3},{"id":34,"descricao":"HAV TOP MAX BASIC CINZA","tamanho_id":2,"cor_id":6,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":4},{"id":35,"descricao":"HAV TOP NAUTICAL BRANCO/MARINHO","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":4},{"id":36,"descricao":"HAV TOP NAUTICAL MARINHO/BRANCO/BR","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":3},{"id":37,"descricao":"HAV TOP NAUTICAL BCO/MARINHO","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":7},{"id":38,"descricao":"HYPE PRETO","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":13},{"id":39,"descricao":"HAV HYPE AREIA/MARINHO","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":4},{"id":40,"descricao":"HAV HYPE BRANCO/BRANCO/AZUL","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":8},{"id":41,"descricao":"HAV HYPE BRANCO/AZUL SKY","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":8},{"id":42,"descricao":"HAV SLIDE BRASIL AZUL NAVAL/BRANCO","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":90,"qtdEmEstoque":7},{"id":43,"descricao":"HAV SLIDE BRASIL MARINHO","tamanho_id":1,"cor_id":7,"genero_id":1,"imagem":"","preco":90,"qtdEmEstoque":4},{"id":44,"descricao":"HAV SLIDE BRASIL BRANCO/PRETO","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":90,"qtdEmEstoque":3},{"id":45,"descricao":"HAV BRASIL LOGO AZUL NAVAL","tamanho_id":1,"cor_id":3,"genero_id":1,"imagem":"","preco":32,"qtdEmEstoque":6},{"id":46,"descricao":"HAV BRASIL PRETO","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":28,"qtdEmEstoque":5},{"id":47,"descricao":"HAV TREND BRANCO/AMARELO","tamanho_id":1,"cor_id":1,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":5},{"id":48,"descricao":"HAV CONS. INTER. BEGE PALHA","tamanho_id":1,"cor_id":4,"genero_id":1,"imagem":"","preco":43,"qtdEmEstoque":11},{"id":49,"descricao":"HAV CONS. INTER. BRANCO/AZUL","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":43,"qtdEmEstoque":3},{"id":50,"descricao":"HAV SIMPSONS AMAR OURO","tamanho_id":1,"cor_id":1,"genero_id":1,"imagem":"","preco":42,"qtdEmEstoque":4},{"id":51,"descricao":"HAV DISNEY STYLISH MICKEY BRANCO/PRETO","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":45,"qtdEmEstoque":2},{"id":52,"descricao":"HAV TOP STREET","tamanho_id":1,"cor_id":12,"genero_id":1,"imagem":"","preco":45,"qtdEmEstoque":8},{"id":53,"descricao":"HAV DISNEY STYLISH VERDE TROPICAL","tamanho_id":1,"cor_id":12,"genero_id":1,"imagem":"","preco":45,"qtdEmEstoque":10},{"id":54,"descricao":"HAV SIMPSONS BRANCO/TURQUEZA","tamanho_id":1,"cor_id":3,"genero_id":1,"imagem":"","preco":45,"qtdEmEstoque":11},{"id":55,"descricao":"HAV ALOHA NOVA BRANCO/BRANCO/PRETO","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":35,"qtdEmEstoque":9},{"id":56,"descricao":"HAV ALOHA BRANCO/BRANCO/BRANCO","tamanho_id":1,"cor_id":5,"genero_id":1,"imagem":"","preco":30,"qtdEmEstoque":13},{"id":57,"descricao":"HAV TOPP LOGOMANIA VERMELHO CRUCH","tamanho_id":1,"cor_id":13,"genero_id":1,"imagem":"","preco":37.99,"qtdEmEstoque":5},{"id":58,"descricao":"HAV TOP BASIC BEGE PALHA","tamanho_id":1,"cor_id":4,"genero_id":1,"imagem":"","preco":37.99,"qtdEmEstoque":17},{"id":59,"descricao":"HAV TOP ATHLETIC AZUL ACO","tamanho_id":1,"cor_id":3,"genero_id":1,"imagem":"","preco":35,"qtdEmEstoque":2},{"id":60,"descricao":"HAV TOP ATHLETIC VERDE GALACTICO","tamanho_id":1,"cor_id":12,"genero_id":1,"imagem":"","preco":35,"qtdEmEstoque":8},{"id":61,"descricao":"HAV TOP LOGOMANIA CINZA ACO","tamanho_id":1,"cor_id":6,"genero_id":1,"imagem":"","preco":37.99,"qtdEmEstoque":7},{"id":62,"descricao":"HAV TOP BASIC PRETO","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":40,"qtdEmEstoque":16},{"id":63,"descricao":"HAV 45/46","tamanho_id":1,"cor_id":9,"genero_id":1,"imagem":"","preco":40,"qtdEmEstoque":7},{"id":64,"descricao":"HAV SLIM HARMONY BRANCO","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":32,"qtdEmEstoque":4},{"id":65,"descricao":"HAV SLIM HARMONY BEGE PALHA","tamanho_id":1,"cor_id":4,"genero_id":2,"imagem":"","preco":32,"qtdEmEstoque":14},{"id":66,"descricao":"HAV SLIM RETRO ROSA CREAM","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":30,"qtdEmEstoque":4},{"id":67,"descricao":"HAV FLAT MIX AZUL PROVENCE","tamanho_id":1,"cor_id":3,"genero_id":2,"imagem":"","preco":24,"qtdEmEstoque":11},{"id":68,"descricao":"HAV FANTASIA UP AMAR OURO","tamanho_id":1,"cor_id":1,"genero_id":2,"imagem":"","preco":25,"qtdEmEstoque":4},{"id":69,"descricao":"HAV SLIM ANIMALS BRANCO/MARAVILHA","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":31,"qtdEmEstoque":7},{"id":70,"descricao":"HAV SLIM ORGANIC BRANCO/BRIGHT","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":10},{"id":71,"descricao":"HAV SLIM ORGANIC ROSA BALET","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":4},{"id":72,"descricao":"HAV SLIM ORGANIC VERMELHO APACHE","tamanho_id":1,"cor_id":13,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":5},{"id":73,"descricao":"HAV SLIM ORGANIC PRETO","tamanho_id":1,"cor_id":9,"genero_id":2,"imagem":"","preco":31,"qtdEmEstoque":8},{"id":74,"descricao":"HAV TOP DISNEY VERM/MAR","tamanho_id":1,"cor_id":13,"genero_id":1,"imagem":"","preco":35,"qtdEmEstoque":5},{"id":75,"descricao":"HAV TOP DISNEY CINZA GELO","tamanho_id":1,"cor_id":6,"genero_id":1,"imagem":"","preco":35,"qtdEmEstoque":3},{"id":76,"descricao":"HAV TOP DISNEY ROSA FLUX","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":35,"qtdEmEstoque":3},{"id":77,"descricao":"HAV SLIM DISNEY ROSA MACARON","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":39,"qtdEmEstoque":2},{"id":78,"descricao":"HAV SLIM DISNEY VERMELHO CRUCH","tamanho_id":1,"cor_id":13,"genero_id":2,"imagem":"","preco":39,"qtdEmEstoque":2},{"id":79,"descricao":"HAV SLIM NAUTICAL MARINHO/PRATA","tamanho_id":1,"cor_id":7,"genero_id":2,"imagem":"","preco":38,"qtdEmEstoque":8},{"id":80,"descricao":"HAV SLIM NAUTICAL BRANCO/ROSE GOLD","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":38,"qtdEmEstoque":15},{"id":81,"descricao":"HAV SLIM SPARKLE BEGE PALHA","tamanho_id":1,"cor_id":4,"genero_id":2,"imagem":"","preco":59.99,"qtdEmEstoque":11},{"id":82,"descricao":"HAV SLIM PAISAGE CANDY PINK","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":3},{"id":83,"descricao":"HAV SLIM PAISAGE PESSEGO/PESSEGO","tamanho_id":1,"cor_id":1,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":1},{"id":84,"descricao":"HAV SLIM PAISAGE AZUL CEU","tamanho_id":1,"cor_id":3,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":2},{"id":85,"descricao":"HAV SLIM PALETTE GLW  CANDY PINK","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":43,"qtdEmEstoque":10},{"id":86,"descricao":"HAV SLIM PALETTE GLW BRANCO","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":43,"qtdEmEstoque":8},{"id":87,"descricao":"HAV SLIM 41/42","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":42,"qtdEmEstoque":5},{"id":88,"descricao":"HAV SLIM GLITTER ROSA BALET","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":55,"qtdEmEstoque":11},{"id":89,"descricao":"HAV SLIM GLITTER CINZA GELO","tamanho_id":1,"cor_id":6,"genero_id":2,"imagem":"","preco":55,"qtdEmEstoque":6},{"id":90,"descricao":"HAV SLIM HEROINAS PRETO","tamanho_id":1,"cor_id":9,"genero_id":2,"imagem":"","preco":43,"qtdEmEstoque":5},{"id":91,"descricao":"HAV SLIM HEROINAS BEGE PALHA/CINZA","tamanho_id":1,"cor_id":4,"genero_id":2,"imagem":"","preco":43,"qtdEmEstoque":6},{"id":92,"descricao":"HAV TPZ FERRUGEM","tamanho_id":1,"cor_id":8,"genero_id":2,"imagem":"","preco":70,"qtdEmEstoque":1},{"id":93,"descricao":"HAV BRASIL ROSA FLUX","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":32,"qtdEmEstoque":1},{"id":94,"descricao":"HAV BRASIL VERMELHO CRUCH","tamanho_id":1,"cor_id":13,"genero_id":2,"imagem":"","preco":32,"qtdEmEstoque":1},{"id":95,"descricao":"HAV SLIM MISTIC BEGE PALHA","tamanho_id":1,"cor_id":4,"genero_id":2,"imagem":"","preco":43,"qtdEmEstoque":3},{"id":96,"descricao":"HAV SLIM MISTIC PRETO","tamanho_id":1,"cor_id":9,"genero_id":2,"imagem":"","preco":43,"qtdEmEstoque":3},{"id":97,"descricao":"HAV SLIM FLORAL ROSA PORCELANA","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":39,"qtdEmEstoque":5},{"id":98,"descricao":"HAV SLIM TRIBUTO","tamanho_id":1,"cor_id":5,"genero_id":2,"imagem":"","preco":38,"qtdEmEstoque":3},{"id":99,"descricao":"HAV SLIM GLOSS AZUL ACO","tamanho_id":1,"cor_id":3,"genero_id":2,"imagem":"","preco":38.99,"qtdEmEstoque":1},{"id":100,"descricao":"HAV SLIM GLOSS ROSA BALET","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":38.99,"qtdEmEstoque":1},{"id":101,"descricao":"HAV SLIM GLOSS AREIA","tamanho_id":1,"cor_id":2,"genero_id":2,"imagem":"","preco":38.99,"qtdEmEstoque":6},{"id":102,"descricao":"HAV YOU METALIC AREIA/DOURADO CLARO","tamanho_id":1,"cor_id":2,"genero_id":2,"imagem":"","preco":45,"qtdEmEstoque":10},{"id":105,"descricao":"HAV BRASIL MARROM","tamanho_id":1,"cor_id":8,"genero_id":1,"imagem":"","preco":28,"qtdEmEstoque":3},{"id":106,"descricao":"HAV YOU SHINE ROSA BALET","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":55,"qtdEmEstoque":4},{"id":107,"descricao":"HAV YOU SHINE BEGE PALHA","tamanho_id":1,"cor_id":10,"genero_id":2,"imagem":"","preco":55,"qtdEmEstoque":5}]);
      */
    });
};