let db = {
  "orders": [

  ],

}
for(var i = 0; i < 100; i++) {
  db['orders'].push({
    id: i,
    name: "order-" + i
  });
}
module.exports = db;
