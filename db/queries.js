module.exports = {
  getAll: function queryGetAll() {
    let query = { TableName: "pocket-dimension" };
    return query;
  },
  removeItem: function queryRemoveItem(id, timestamp) {
    let query = {
      TableName: "pocket-dimension",
      Key: { id: id, timestamp: timestamp }
    };
    return query;
  },
  updateItem: function queryUpdateItem(item) {
    let query = {
      TableName: "pocket-dimension",
      Key: { id: item.id, timestamp: item.timestamp },
      UpdateExpression: "set title = :t, body=:b",
      ExpressionAttributeValues: {
        ":t": item.title,
        ":b": item.body
      }
    };
    return query;
  }
};
