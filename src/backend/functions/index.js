/**
 * Copyright (c) 2017 by Michael Egli
 *
 *
 *
 * firebase database structure
 *
 * - session
 * --- {userid}
 * ----- {project}
 * ------ {object} business objects
 * ------- {objectid} business object identifier / single record
 * --------- data (mixed)
 * --------- action
 * ----------- {actionid}
 * ------------- name (string)
 * ------------- state (string)

 *
 */

'use strict';

/**
 * load core modules
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const uuidV1 = require('uuid/v1');
const request = require('request-promise');

/**
 * load action modules
 */
const actions = require('./actions');

/**
 * set decrypt hashes
 * @type {{}}
 */
let decryptHashes = {};

admin.database().ref("_sha1").on('value', (snapshot) => {
  decryptHashes = snapshot.val();
});


/**
 * Connects database
 *
 */
exports.connectRealtimeDatabase = functions.database.ref('session/{user}/{project}/{object}/{objectid}/action/{actionid}').onCreate(event => {
  const date = new Date();
  const original = event.data.val();
  const identifier = uuidV1();

  if (original.state !== 'requested') {
    return null;
  }

  const actiondata = {
    'date': date.getTime(),
    'project': event.params.project,
    'object': event.params.object,
    'objectid': event.params.objectid,
    'user': event.params.user,
    'action': original,
    'actionid': event.params.actionid,
    'source': 'database',
    'snapshot': null,
    'target': 'session/' + event.params.user + '/' + event.params.project + '/' + event.params.object + '/' + event.params.objectid
  };


  return new Promise(function (resolve, reject) {

    admin.database().ref(actiondata.target + "/data").once('value', (snapshot) => {
      actiondata.snapshot = snapshot.val();
      let actiondataFinal = actiondata;
      actiondataFinal.additionActions
      admin.database().ref('_events/' + identifier).set(actiondataFinal).then();

      if (actiondata.action.additionActions && typeof actiondata.action.additionActions == 'object') {
        actiondata.action.additionActions.forEach((additionalAction) => {
          actiondata.action = additionalAction;
          actiondata.target = null;
          admin.database().ref('_events/' + uuidV1()).set(actiondata).then();
        });
      }

      resolve(true);

    }).catch(() => {
      admin.database().ref('_events/' + identifier).set(actiondata).then();
      if (actiondata.action.additionActions && typeof actiondata.action.additionActions == 'object') {
        actiondata.action.additionActions.forEach((additionalAction) => {
          actiondata.action = additionalAction;
          actiondata.target = null;
          admin.database().ref('_events/' + uuidV1()).set(actiondata).then();
        });
      }

      resolve(true);

    });

  });

});

/**
 * Connects firestore
 *
 */
exports.connectCloudFirestore = functions.firestore.document('session/{user}/{project}/{object}/{objectid}/action/{actionid}/{action}').onCreate(event => {

  const date = new Date();


  const actiondata = {
    'date': date.getTime(),
    'project': event.params.project,
    'object': event.params.object,
    'objectid': event.params.objectid,
    'user': event.params.user,
    'action': event.params.action,
    'actionid': event.params.actionid,
    'source': 'firestore'
  }

  return admin.database().ref('_events/' + uuidV1()).set(actiondata).then(function () {
    // call
    return true;
  }).catch(function (error) {
    return error;
  });


});


/**
 * Connects database
 *
 */
exports.connectEvents = functions.database.ref('_events/{actionid}').onCreate(event => {

  const original = event.data.val();
  const identifier = event.params.actionid;

  const actiondata = {
    'date': original.date,
    'project': original.project,
    'object': original.object,
    'objectid': original.objectid,
    'user': original.user,
    'action': original.action,
    'actionid': original.actionid,
    'source': original.source,
    'snapshot': null,
    'target': original.target ? original.target : null
  };


  return new Promise(function (resolve, reject) {

    call(actiondata, original.snapshot !== undefined ? original.snapshot : null).then((status) => {

      admin.database().ref('_events/' + identifier).remove().then(function () {
        if (actiondata.target !== undefined && actiondata.target) {
          admin.database().ref(actiondata.target + "/action/" + actiondata.actionid).update(status).then(function () {
            admin.database().ref(actiondata.target + "/action/" + actiondata.actionid).remove().then();
            resolve(true);
          });
        }
      });

      resolve(data);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });

  });

});


/**
 * generic call of pre defined actions
 * @param action
 * @param original data
 */
function call(action, data) {

  return new Promise(function (resolve, reject) {
    if (action.action !== undefined && action.action.name !== undefined && actions[action.action.name] !== undefined) {

      decrypt(action).then((action) => {
        actions[action.action.name](action, data).then(function (data) {
          resolve(data);
        }).catch(function (error) {
          reject(error);
        });
      });

    }

  });

}

/**
 *
 * @param data
 */
function decrypt(data) {

  return new Promise(function (resolve, reject) {
    resolve(data);
  });

}

