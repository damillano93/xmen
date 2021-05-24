exports.up = function(knex, Promise) {
    return knex.schema.createTable('xmen', function(table) {
      table.increments();
      table.string('request')
      table.string('response')
      table.boolean('error')
      table.boolean('is_mutant')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('xmen');
  }