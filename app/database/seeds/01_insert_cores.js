
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cores').del()
    .then(function () {
      // Inserts seed entries
      return knex('cores').insert([
        {id:1, cor: 'Amarelo'},
        {id:2, cor: 'Areia'},
        {id:3, cor: 'Azul'},
        {id:4, cor: 'Bege'},
        {id:5, cor: 'Branco'},
        {id:6, cor: 'Cinza'},
        {id:7, cor: 'Dourado'},
        {id:8, cor: 'Laranja'},
        {id:9, cor: 'Marinho'},
        {id:10, cor: 'Marrom'},
        {id:11, cor: 'Preto'},
        {id:12, cor: 'Rosa'},
        {id:13, cor: 'Roxo'},
        {id:14, cor: 'Verde'},
        {id:15, cor: 'Vermelho'}
      ]);
    });
};
