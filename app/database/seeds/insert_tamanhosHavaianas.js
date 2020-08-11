
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tamanhosHavaianas').del()
    .then(function () {
      // Inserts seed entries
      return knex('tamanhosHavaianas').insert([
        {id: 1, tamanho: '23/24'},
        {id: 2, tamanho: '25/26'},
        {id: 3, tamanho: '27/28'},
        {id: 4, tamanho: '29/30'},
        {id: 5, tamanho: '33/34'},
        {id: 6, tamanho: '35/36'},
        {id: 7, tamanho: '37/38'},
        {id: 8, tamanho: '39/40'},
        {id: 9, tamanho: '41/42'},
        {id: 10, tamanho: '43/44'},
        {id: 11, tamanho: '45/46'},
        {id: 12, tamanho: '47/48'}
      ]);
    });
};
