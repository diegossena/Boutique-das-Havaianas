const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('havaianas', table => {
    table.increments()
    table.string('descricao').notNullable()
    table.integer('tamanho_id')
      .notNullable()
      .references('id')
      .inTable('tamanhosHavaianas')
    table.integer('cor_id')
      .notNullable()
      .references('id')
      .inTable('cores')
    table.integer('genero_id')
      .notNullable()
      .references('id')
      .inTable('generos')
    table.string('imagem').notNullable()
    table.decimal('preco',2).notNullable()
    table.integer('qtdEmEstoque').defaultTo(0).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('havaianas')
};