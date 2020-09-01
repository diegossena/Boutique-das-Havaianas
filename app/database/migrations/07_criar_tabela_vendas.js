const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('vendas', table => {
    table.increments()
    table.integer('tipoPagamento_id')
      .notNullable()
      .references('id')
      .inTable('tiposPagamento')
    table.integer('metodoPagamento_id')
      .notNullable()
      .references('id')
      .inTable('metodosPagamento')
    table.integer('vendedor_id')
      .notNullable()
      .references('id')
      .inTable('vendedores')
    table.datetime('dataVenda').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vendas')
};