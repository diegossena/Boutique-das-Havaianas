const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('produtosVendas', table => {
    table.integer('venda_id')
      .notNullable()
      .references('id')
      .inTable('vendas')
    table.integer('qtd').notNullable()
    table.integer('havaiana_id')
      .notNullable()
      .references('id')
      .inTable('havaianas')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtosVendas')
};