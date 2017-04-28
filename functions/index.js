'user strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const graph = require('fbgraph');
// graph.setAppSecret('-----') // Replace with secret!

const crypto = require('crypto');
const secureCompare = require('secure-compare');

exports.mutualFriends = functions.https.onRequest((req,res) => {
	// see https://github.com/firebase/functions-samples/blob/master/github-to-slack/functions/index.js

  // const cipher = 'sha1';
  // const signature = req.headers['x-hub-signature'];

  // const hmac = crypto.createHmac(cipher, functions.config().github.secret)
  //     .update(JSON.stringify(req.body, null, 0))
  //     .digest('hex');
  // const expectedSignature = `${cipher}=${hmac}`;

  // if (secureCompare(signature, expectedSignature)) {

    getMutualFriends(req.body.userId1, req.body.userId2, req.body.acessToken, res).then(() => {
      res.end();
    }).catch(error => {
      console.error(error);
      res.status(500).send('Something went wrong while finding mutual friends.');
    });

  // } else {
  //   console.error('x-hub-signature', signature, 'did not match', expectedSignature);
  //   res.status(403).send('Your x-hub-signature\'s bad and you should feel bad!');
  // }

});

function getMutualFriends(userId1, userId2, accessToken, res){
	console.log(userId1, userId2, accessToken);
	// Alex: There may be some bugs in below code but it can't be tested
	// without a paid Firebase account. Instead we spoof the data.

	// console.log('Making facebook call', accessToken, userId1, userId2);

	// const options = {
	// 	timeout: 3000,
	// 	pool: {maxSockets: Infinity},
	// 	headers: {connection: "keep-alive"}
	// };

	// const params = {
	// 	fields: 'context.fields(mutual_friends)'
	// }

	// return graph
	// 	.setAccessToken(accessToken)
	// 	.setOptions(options)
	// 	.get(firstId, params, function(err, res2) {
	// 		res.json(res2.body);
	// 	});

	var query = admin.database().ref('users').orderByKey();
	return query.once('value')
		.then(function(snapshot){
			var mutualFriends = {};
			var temp_key;

			for (temp_key in snapshot.val()) {
				if (
						snapshot.val().hasOwnProperty(temp_key) &&
						temp_key != userId1 &&
						temp_key != userId2 &&
						(Math.random()<0.5)
					){
					mutualFriends[temp_key]=snapshot.val()[temp_key];
				}
			}

			res.json(mutualFriends);
			return Promise.resolve();
		});
}







