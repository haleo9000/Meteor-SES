var AWSAccessKeyID, AWSSecretKey, AWSRegion;

var sendEmail = function(params, callback) {
	var transport = Nodemailer.createTransport("SES", {
	    accessKeyId: AWSAccessKeyID,
	    secretAccessKey: AWSSecretKey,
	    region: AWSRegion
	});

	if(!callback) callback = function(err,result) {
		if(err) throw new Meteor.Error(500, err.message, err)
	}

	transport.sendMail(params, callback);
	transport.close();
}

Email.configSES = function(params) {

	AWSSecretKey = params.AWSSecretKey; //REQUIRED
	AWSAccessKeyID = params.AWSAccessKeyID; //REQUIRED
	AWSRegion = (params.AWSRegion) ? params.AWSRegion:'us-east-1'; //OPTIONAL, defaults to us-east-1

	Email.send = sendEmail;
}
