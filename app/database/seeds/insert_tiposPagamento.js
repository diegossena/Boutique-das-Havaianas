
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tiposPagamento').del()
    .then(function () {
      // Inserts seed entries
      return knex('tiposPagamento').insert([
        {id: 1, tipoPagamento: 'Loja'},
        {id: 2, tipoPagamento: 'Extra loja'},
      ]);
    });
};
