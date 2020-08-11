
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
        {id:7, cor: 'Marinho'},
        {id:8, cor: 'Marrom'},
        {id:9, cor: 'Preto'},
        {id:10, cor: 'Rosa'},
        {id:11, cor: 'Roxo'},
        {id:12, cor: 'Verde'},
        {id:13, cor: 'Vermelho'}
      ]);
    });
};
