function email(action, data) {
  return new Promise(function (resolve, reject) {

    console.log(data);
    console.log(action);

    resolve({state: 'done'});
  });
}

module.exports = email;
