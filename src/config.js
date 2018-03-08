var rootUrl = "http://192.168.0.154:8000/"
var apiUrl = rootUrl + "api/"
export default{
	apiDomain: apiUrl,
	authUrl: apiUrl + 'users/auth/',
	loginUrl: apiUrl + 'auth/login/',
	postsUrl: apiUrl + 'posts/',
	followersUrl: apiUrl + 'followers/',
	registerUrl: apiUrl + 'auth/signup',
	checkUsername: apiUrl + 'checkUsername',
	findUser: apiUrl + 'users/find?username=',
	userExists: apiUrl + 'users/exists?username=',
	imageRoot: rootUrl + 'storage/',
	commentsUrl: apiUrl + 'comments/',
	likesUrl: apiUrl + 'likes/'
}