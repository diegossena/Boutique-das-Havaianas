const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('produtosVendas', table => {
    table.integer('venda_id')
      .notNullable()
      .references('id')
      .inTable('vendas')
    table.integer('havaiana_id')
      .notNullable()
      .references('id')
      .inTable('havaianas')
    table.integer('quantidadeVenda').notNullable()
    table.decimal('desconto',2).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtosVendas')
};