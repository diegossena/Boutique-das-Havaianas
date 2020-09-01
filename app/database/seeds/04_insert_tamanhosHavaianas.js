
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tamanhosHavaianas').del()
    .then(function () {
      // Inserts seed entries
      return knex('tamanhosHavaianas').insert([
        {id: 1, tamanho: '19'},
        {id: 2, tamanho: '20'},
        {id: 3, tamanho: '21'},
        {id: 4, tamanho: '22'},
        {id: 5, tamanho: '23/24'},
        {id: 6, tamanho: '25/26'},
        {id: 7, tamanho: '27/28'},
        {id: 8, tamanho: '29/30'},
        {id: 9, tamanho: '33/34'},
        {id: 10, tamanho: '35/36'},
        {id: 11, tamanho: '37/38'},
        {id: 12, tamanho: '39/40'},
        {id: 13, tamanho: '41/42'},
        {id: 14, tamanho: '43/44'},
        {id: 15, tamanho: '45/46'},
        {id: 16, tamanho: '47/48'},
        {id: 17, tamanho: '17/18'},
      ]);
    });
};
