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
  },
  storeToken: function queryStoreToken(payload) {
    let query = {
      TableName: "pocket-dimension-auth",
      Key: { username: payload.username },
      UpdateExpression: "set sessionToken = :t",
      ExpressionAttributeValues: { ":t": payload.token }
    };
    return query;
  },
  getUser: function queryGetUser(username) {
    let query = {
      TableName: "pocket-dimension-auth",
      ExpressionAttributeNames: { "#username": "username" },
      ExpressionAttributeValues: { ":u": username },
      KeyConditionExpression: "#username = :u"
    };
    return query;
  },
  getUserByToken: function queryGetUser(sessionToken) {
    let query = {
      TableName: "pocket-dimension-auth",
      IndexName: "sessionToken-index",
      ExpressionAttributeNames: { "#sessionToken": "sessionToken" },
      ExpressionAttributeValues: { ":t": sessionToken },
      KeyConditionExpression: "#sessionToken = :t"
    };
    return query;
  }
};
