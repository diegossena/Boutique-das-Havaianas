
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('metodosPagamento').del()
    .then(function () {
      // Inserts seed entries
      return knex('metodosPagamento').insert([
        {id: 1, metodoPagamento: 'Cartão Débito'},
        {id: 2, metodoPagamento: 'Cartão Crédito'},
        {id: 3, metodoPagamento: 'Dinheiro'},
      ]);
    });
};
