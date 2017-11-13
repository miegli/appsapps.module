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


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidV1 = require('uuid/v1');
const actions = require('./actions');

admin.initializeApp(functions.config().firebase);


/**
 * Connects database
 *
 */
exports.connectRealtimeDatabase = functions.database.ref('session/{user}/{project}/{object}/{objectid}/action/{actionid}').onCreate(event => {
  const date = new Date();
  const original = event.data.val();
  const identifier = uuidV1();

  const actiondata = {
    'date': date.getTime(),
    'project': event.params.project,
    'object': event.params.object,
    'objectid': event.params.objectid,
    'user': event.params.user,
    'action': original,
    'actionid': event.params.actionid,
    'source': 'database',
    'target': 'session/' + event.params.user + '/' + event.params.project + '/' + event.params.object + '/' + event.params.objectid
  };


  return admin.database().ref('_events/' + identifier).set(actiondata).then(function () {

    admin.database().ref(actiondata.target + "/data").once('value',(snapshot) => {
      call(actiondata, snapshot.val(), identifier);
    });

    return true;
  }).catch(function (error) {
    return error;
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
 * generic call of pre defined actions
 * @param action
 * @param identifier
 * @param original data
 */
function call(action, data, identifier) {

  if (action.action !== undefined && action.action.name !== undefined && actions[action.action.name] !== undefined) {
    actions[action.action.name](action, data).then(function (data) {
      admin.database().ref('_events/' + identifier).remove().then(function () {
        admin.database().ref(action.target + "/action/" + action.actionid).update(data).then(function () {
          admin.database().ref(action.target + "/action/" + action.actionid).remove().then();
        });

      });
    }).catch(function (error) {
      admin.database().ref('_events/' + identifier).remove().then(function () {
        admin.database().ref(action.target + "/action/" + action.actionid).remove().then(function () {
          console.log(error);
        });
      });
    });
  }


}


