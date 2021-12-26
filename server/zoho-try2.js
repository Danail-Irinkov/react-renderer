let test_cred = {
	email: 'dan.irinkov@elixglobal.com',
	client_id: '1000.MUNOH9KYBWTTU3O7BE0OFYWTYISG1T',
	client_secret: '893b0a443d1e7c233703e82aef58a0557bfb9c4c1f'
}
const path = require('path')

const ZCRMRestClient = require('zcrmsdk');

const configJson = {
	"client_id": test_cred.client_id, //mandatory
	"client_secret": test_cred.client_secret, //mandatory
	"redirect_url": "http:/localhost:3000", //mandatory
	"user_identifier": test_cred.email,
	"base_url": "www.zohoapis.com", //optional ,"www.zohoapis.com" is default value
	"iamurl": "accounts.zoho.com", //optional ,"accounts.zoho.com" is default value
	"version": "v2.1", //optional ,"v2" is default value
	// "mysql_username":"root",//optional ,"root" is default value
	// "mysql_password":"DBPassword",//optional ,"" is default value
	"tokenmanagement": path.resolve('./server/zohoTokenManagement.js')
}

async function initialiseClient() {
	console.log("TOKEN DIR", configJson.tokenmanagement);
	await ZCRMRestClient.initialize(configJson);
}

async function bootstrapOauthFromSelfClient() {
	await initialiseClient();
	//do whatever required after initialize
	let grant_token = "1000.912e771c770ae475250b1d123a1caf95.4c3cc4274c1f02f9e1f27a43bc67261e";
	let user_identifier = test_cred.email;

	const authResponse = await ZCRMRestClient.generateAuthTokens(user_identifier, grant_token);

	console.log("access token :" + authResponse.access_token);
	console.log("refresh token :" + authResponse.refresh_token);
	console.log("expires in :" + authResponse.expires_in);

}

async function testSDK1() {
	await initialiseClient();

	let input = {
		module: 'Allocators',
		params: {
			page: 0,
			per_page: 50,
			criteria: '((Keyword_1:equals:syz) or (Keyword_2:equals:syz) or (Keyword_3:equals:syz))'
		}
	}
	let testresponse = {};
	let message = '';
	message = await ZCRMRestClient.API.MODULES.search(input)
		.then(function (response) {
			testresponse = JSON.parse(response.body).data;
			let innermessage
			console.log("test response status === " +testresponse.status)
			if(testresponse.status === 'error') {
				console.log("test response status thrown === " +testresponse.message);
				innermessage = testresponse.message;
			} else {
				console.log("test response successful === " +testresponse.message);
				innermessage = 'success';
			}


			console.log(testresponse);

			//if(testresponse.status.error) console.log('got an error');
			//if(response.error) console.log('got an error')
			return innermessage
		});

	return "HELLO " +message;

}

bootstrapOauthFromSelfClient();
// testSDK1();

async function testSDK() {
	await initialiseClient();
	console.log('Initialize End');
	//Get instance of RecordOperations Class
	let moduleAPIName = "Leads";
	let recordOperations = new RecordOperations();

	let paramInstance = new ParameterMap();

	await paramInstance.add(GetRecordsParam.APPROVED, "both");

	let headerInstance = new HeaderMap();

	await headerInstance.add(GetRecordsHeader.IF_MODIFIED_SINCE, new Date("2020-01-01T00:00:00+05:30"));

	//Call getRecords method that takes paramInstance, headerInstance and moduleAPIName as parameters
	// let response = await recordOperations.getRecords(moduleAPIName, paramInstance, headerInstance);
	let response = await (new ModulesOperations()).getModules(headerInstance);

	console.log('moduleData response', response)

	// Response of the API call is returned in the 'body'

	// Modules data value available as JSON Array of the 'modules' key of the JSON response
	// Each JSON object of the array corresponds to a module
	// By iterating the JSON objects of the array, individual module details can be obtained

	const { modules } = JSON.parse(response.body);

	// Iterating the JSON array
	for (let module in modules) {
		const moduleData = modules[module];

		// For obtaining all the fields of the organization details, use the value of 'module_data' as such
		console.log('moduleData', moduleData)

		// For obtaining a particular field, use module_data.<api-name of field>
		// Sample API names: id, api_name
		console.log('moduleData.api_name ', moduleData.api_name);
	}
}

testSDK();
