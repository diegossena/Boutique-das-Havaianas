
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('generos').del()
    .then(function () {
      // Inserts seed entries
      return knex('generos').insert([
        {id:1, genero: 'Masculino'},
        {id:2, genero: 'Feminino'},
      ]);
    });
};
