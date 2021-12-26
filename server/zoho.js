let test_cred = {
	// email: 'dan.irinkov@elixglobal.com',
	email: 'shraddha@thikdglobal.com',
	redirect_uri: 'http:/localhost:4000',
	client_id: '1000.I6CTMDJWMTOPCVJV7E16QW9DG8YVLQ',
	client_secret: '772929f1df07feecd2c48fe0807d076941d3af6aab',
	grant_token: '1000.8c81c87dc09eed1a05596da4cfdc7f89.18520dc5f46925b84a7cdfbf4f6c3b1f'
}

const fs = require('fs');
const path = require('path')
const axios = require('axios')
// const ZCRMRestClient = require('zcrmsdk');
const InitializeBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/initialize_builder").InitializeBuilder;
const OAuthBuilder = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/oauth_builder").OAuthBuilder;
const UserSignature = require("@zohocrm/nodejs-sdk-2.0/routes/user_signature").UserSignature;
const Levels = require("@zohocrm/nodejs-sdk-2.0/routes/logger/logger").Levels;
const LogBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/logger/log_builder").LogBuilder;
const USDataCenter = require("@zohocrm/nodejs-sdk-2.0/routes/dc/us_data_center").USDataCenter;
// const INDataCenter = require("@zohocrm/nodejs-sdk-2.0/routes/dc/in_data_center").INDataCenter;
// const DBBuilder = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/db_builder").DBBuilder;
const FileStore = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/file_store").FileStore;
const SDKConfigBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/sdk_config_builder").SDKConfigBuilder;
// const ProxyBuilder = require("@zohocrm/nodejs-sdk-2.0/routes/proxy_builder").ProxyBuilder;

// eslint-disable-next-line consistent-return
async function initialiseClient() {
	try {
		let logger = new LogBuilder()
			.level(Levels.INFO)
			.filePath(path.resolve('./server/logs/zoho_sdk_log.log'))
			.build();

		let user = new UserSignature(test_cred.email);

		/*
			 * Configure the environment
			 * which is of the pattern Domain.Environment
			 * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
			 * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
			 */
		// let environment = USDataCenter.PRODUCTION();
		let environment = USDataCenter.SANDBOX();
		// let environment = INDataCenter.SANDBOX();

		if (!test_cred.refresh_token)
			await getOauthTokens()

		let token
		if (test_cred.access_token && (new Date).getTime() < (new Date(test_cred.granted_on)).getTime() + test_cred.expires_in * 1000) {
			token = new OAuthBuilder()
				.clientId(test_cred.client_id)
				.clientSecret(test_cred.client_secret)
				.accessToken(test_cred.access_token)
				.redirectURL("http:/localhost:4000")
				.build();
		} else {
			token = new OAuthBuilder()
				.clientId(test_cred.client_id)
				.clientSecret(test_cred.client_secret)
				.refreshToken(test_cred.refresh_token)
				.redirectURL("http:/localhost:4000")
				.build();
		}

		let tokenstore = new FileStore(path.resolve('./server/zoho_sdk_tokens.txt'));

		/*
			* autoRefreshFields
			* if true - all the modules' fields will be auto-refreshed in the background, every hour.
			* if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
			*
			* pickListValidation
			* A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
			* if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
			* if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
			*/
		let sdkConfig = new SDKConfigBuilder().pickListValidation(false).autoRefreshFields(true).build();

		/*
			 * The path containing the absolute directory path to store user specific JSON files containing module fields information.
			 */
		let resourcePath = path.resolve('../');

		/*
			 * Call the static initialize method of Initializer class that takes the following arguments
			 * user -> UserSignature instance
			 * environment -> Environment instance
			 * token -> Token instance
			 * store -> TokenStore instance
			 * SDKConfig -> SDKConfig instance
			 * resourcePath -> resourcePath
			 * logger -> Logger instance
			 */
		console.log('Initialize Start');
		(await new InitializeBuilder())
			.user(user)
			.environment(environment)
			.token(token)
			.store(tokenstore)
			.SDKConfig(sdkConfig)
			.resourcePath(resourcePath)
			.logger(logger)
			.initialize();

		let current_tokens = tokenstore.getTokens()
		console.log('current_tokens', current_tokens);
		if (current_tokens.access_token) {
			test_cred.access_token = current_tokens.access_token
			test_cred.expires_in = current_tokens.expires_in
			test_cred.id = current_tokens.id
			fs.writeFileSync("./server/zoho_cred.json", JSON.stringify(test_cred, null, '\t'))
		}
	} catch (e) {
		console.log('Initialize Error', e);
		return Promise.reject(e)
	}
}

async function getOauthTokens() {
	let zoho_cred
	if (fs.existsSync('./server/zoho_cred.json'))
		zoho_cred = JSON.parse(fs.readFileSync('./server/zoho_cred.json').toString())
	else
		console.log('zoho_cred NOT FOUND')

	console.log('getOauthTokens zoho_cred', zoho_cred)

	if (zoho_cred && zoho_cred.refresh_token)
		test_cred = zoho_cred
	else { // Generate tokens via API
		let res = await axios.post(`https://accounts.zoho.com/oauth/v2/token?scope=ZohoCRM.modules.ALL&grant_type=authorization_code&client_id=${test_cred.client_id}&client_secret=${test_cred.client_secret}&redirect_uri=${test_cred.redirect_uri}&code=${test_cred.grant_token}`)
		console.log("getOauthTokens res:", res.data)
		if (res.data.error)
			return Promise.reject('Grant Token Expired; '+ res.data.error)
		test_cred.access_token = res.data.access_token
		test_cred.refresh_token = res.data.refresh_token
		test_cred.expires_in = res.data.expires_in
		test_cred.granted_on = new Date()
		fs.writeFileSync("./server/zoho_cred.json", JSON.stringify(test_cred, null, '\t'))
	}
	console.log("getOauthTokens test_cred:", test_cred)
	return test_cred
}
// const {ModulesOperations, GetModulesHeader} = require("zcrmsdk/core/com/zoho/crm/api/modules/modules_operations");
// const HeaderMap = require("zcrmsdk/routes/header_map").HeaderMap;
// eslint-disable-next-line no-unused-vars
const {RecordOperations, GetRecordsHeader, GetRecordsParam} = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record_operations");
const {ModulesOperations} = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/modules/modules_operations");
const ParameterMap = require("@zohocrm/nodejs-sdk-2.0/routes/parameter_map").ParameterMap;
const HeaderMap = require("@zohocrm/nodejs-sdk-2.0/routes/header_map").HeaderMap;

async function testSDK() {
	try {
		await initialiseClient();
		console.log('Initialize End');
		//Get instance of RecordOperations Class
		// let moduleAPIName = "Leads";
		// let recordOperations = new RecordOperations();

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
		let modules = null
		if (response.body) {
			modules = JSON.parse(response.body).modules;

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
		return modules
	} catch (e) {
		console.log('testSDK err: ', e)
		return Promise.reject(e)
	}
}

testSDK().catch(()=>{})
