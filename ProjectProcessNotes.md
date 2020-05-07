							* Welocome to MEAN *

$ First create Angular Project   ng new ProjectName --style scss --routing

	In Angular we can put marker on html element, for example on input <input #inputMarker> and 
	if we console.dir(inputMarker) we will see that element, also we can get the value of this 
	element, inputMarker.value, and we can use it wherever we want.

	To use [(NgModel)] in angular, we need import in app.module.ts this --- import { FormsModule } from '@angular/forms'
	and add in imports this --- FormsModule.

	For forms we must add in app.module.ts in imports ReactiveFormsModule.

	rxjs----
	In service create private postsUpdate = new Subject<Post[]>(); in some method in service this.postsUpdate.next([...this.posts])
	and return it in some getUpdatedPosts() {return this.postsUpdate.asObservable();}, then in other component ts, create some
	Subscription like this, postsSub: Subscription;, then in ngOnInit add this
	this.postsSub = this.postsSerice.getPostUpdate().subscribe((posts: Post[]) => {this.posts = posts;},and then in ngOnDestroy add this
	this.postsSub.unsubscribe();.
	--------

	
	When we use [routerLink]="['/posts', i] and this  this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = +paramMap.get('id');}), here we must put ":id" from routing.module "+paramMap.get('id')".

	npm ngx-smart-modal https://www.npmjs.com/package/ngx-smart-modal


* Node JS * -------------------------------------------------------------------------------------------------------------------------------

simple http server------------------------------
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('This si response')
})

server.listen(3000)
------------------------------------------------

#npm init				//to create package.json
#npm install --save express		//install express

	creating express app 

		const express = require('express')
		const app = express()
		app.use('/some link', ()=>{})
		app.listen(3000)

	and also writing this 

		app.use('/api/somthing' (req, res, next) => {res.status(200).json(somthing)})

	instead of 'app.use' we can write 'app.get' 'app.post' and so on, but we ganna use routes and controllers, so we will use app.use... .

#npm install --save-dev nodemon		//to automaticly restart node app after changing code, in pakage.json scripts add "start": "nodemon app.js"

	after that we add cors 

		// cors //
		app.use((req, res, next) => {
	  		res.setHeader('Access-Control-Allow-Origin', '*')
	  		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
	  		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin,X-Requested-With')
  		next()
		})								
		/////////

#npm install --save body-parser		//we need this to parse body from requests

	to use body parser we need add this lines 

		const bodyParser = require('body-parser')
		...
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({extended: false}))


	now we can read (parse) request body 

		app.post('/', (req, res, next) => {
	  		const post = req.body
			console.log(post)
			res.status(201).json({
			message: "post added successfuly"
			})
		})

	some work with Angular rxjs -->
		we declaring in service Subject object, f.e. private postsUpdated = new Subject<Post[]>(), after that when we push some data
		in f.e. posts array, we call next() for our Subject, to write this posts array data in our Subject,
		this.postsUpdated.next([...this.posts]). After that in getter method we return this postsUpdated Subject, as Observable,
		getPostUpdateListener() {return this.postsUpdated.asObservable()}.
		Then in component ts, we declare Subscription Object, f.e. postsSub: Subscription; , and in ngOnInit we subscribe to this
		Subscription object, this.postsSub = this.postsSerice.getPostUpdateListener().subscribe((posts: Post[]) => {
      		this.posts = posts.
		After that in ngOnDestroy we unsubscribe from out Observable object, this.postsSub.unsubscribe().
		We also have some get method in service to get data form API, and we put this data in our main array, f.e. posts, after that
		we call next() for our Subject, whitch is also Observable.

		 getPosts() {
		     this.http.get<Post[]>('http://localhost:3000/api/posts')
		      .subscribe((data) => {
			this.posts = data;
			this.postsUpdated.next([...this.posts]);
		      })
		  }
		And we also call this getPosts (getter) method from compnent ts ngOnInit.

	
	*important
		createt routes and controllers, to see how, look in the code


* Mongo DB ------------
#npm install --save mongoose

	add models to backend using Schema

		const mongoose = require('mongoose')

			const postSchema = mongoose.Schema({
			title: { type: String, required: true },
			content: { type: String, required: true}
		})
		
		module.exports = mongoose.model('Post', postSchema)

	*one important thing, here in type, we using String, with capital S, not 'string' but 'String'

	conecting mongodb to project, in app.js file import mongoose, and add this lines

		mongoose.connect("key from mongo db conection")
		  .then(() => {
		    console.log('Conected to database')
		  })
		  .catch(() => {
		    console.log('Conection failed')
		  })

	
	creating get, post, delete, put requests routes
		
		// get
		exports.getPosts = async (req, res, next) => {
		  try{
		     const posts =  await Post.find()
		     res.status(200).json(posts)
		  }catch(e) {
		    console.log(e)
		  }
		}
		
		// delete
		exports.removePost = async (req, res, next) => {
		  try{
		    const result = await Post.deleteOne({_id: req.params.id}) // here we using req.params.id not _id,
		    console.log(result)					      // cuz route is //localhost:3000/api/posts/:id	
		    res.status(200).json({message: 'post deleted'})
		  }catch(e) {
		    console.log(e)
		  }
		}



	adding some spiner
		https://www.npmjs.com/package/ngx-loading#config-options
	adding npm angular notifications


*---------------------- Authorization -----------------------------*


	creating routes for login


install some validators for mongoose
#npm install --save mongoose-unique-validator	
	
	user model mogoose
		const mongoose = require('mongoose')
		const uniqueValidator = require('mongoose-unique-validator')

		const userSchema = mongoose.Schema({
		  status: {type: String, require: true },
		  username: {type: String, require: true },
		  email: {type: String, require: true, unique: true},
		  password: {type: String, require: true, unique: true}
		})

		userSchema.plugin(uniqueValidator)

		module.exports = mongoose.model('User', userSchema)

	
to save user in db we need to import User model in user contorller

	const User = require('../models/user')

then we need to create some user object

	  const user = new User({
	    status: req.body.status,
	    username: req.body.username,
	    email: req.body.email,
	!!! password: req.body.password !!! this is wrong!!!

but we don't store password in row form in db, we must encrypt it nefore sotre in db, so ...
we need install bcrypt
#npm install --save bcrypt

	import in contorller 

		const bcrypt = require('bcrypt')

	then using hash method ecrypting password

		exports.createUser = async (req, res, next) => {
		  const hash = await bcrypt.hash(req.body.password, 10)
		      const user = new User({
			status: req.body.status,
			username: req.body.username,
			email: req.body.email,
			password: hash
		      })
		      try{
			await user.save()
			res.status(201).json({
			  message: "user created",
			  result
			})
		      }catch(e) {
			console.log(e)
			res.status(500).json({
			  error: err
			})
		      }
		    }

login --------------------------------------------------------------------------------------------------

	checking password    const result = await bcrypt.compare(req.body.password, user.password)

install token, jwt
#npm install --save jsonwebtoken
	
	importing jsonwebtoken	const jwt = require('jsonwebtoken')
	creating new token	const token = jwt.sign({email: user.email, userId: user._id}, 'secret', {expiresIn: "1h"})
	send it to front-end	res.status(200).json({token})

	all code is in the project


check auth middlware ----------------------------------
	
	this middleware need to protect routes

	creating new folder middleware, with file check-auth.js and write there this code, which checks request header and token in request

		const jwt = require('jsonwebtoken')

		module.exports = (req, res, next) => {
		  try{
		    const token = req.headers.authorization.split(" ")[1]
		    jwt.verify(token, "secret")
		    next()
		  }catch(error) {
		    res.status(401).json({message: "auth failed"})
		  }
		}


	!!! We get token in auth.service and from posts.service get this token
    ------------------------------------------------------------------------------------
	!!! Creating interceptor, to send token in header with every request

		import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
		import { Injectable } from '@angular/core';
		import { AuthService } from './auth.service';

		@Injectable()
		export class AuthInterceptor implements HttpInterceptor {
		    constructor( private authService: AuthService) {  }

		    intercept(req: HttpRequest<any>, next: HttpHandler) {
			const authToken = this.authService.getToken();
			const authRequest = req.clone({
			  headers: req.headers.set('Authorization', "Bearer " + authToken)  // here after Bearer must be a space, it's very important
			});
			return next.handle(authRequest);
		    }
		}
	
	and also we need add some code in app.module.ts in providers, and some imports

		import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
		import { AuthInterceptor } from './shared/services/auth-interceptor';
				

		providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

	

adding some code in auth.service . save the token in service, boolen isAuthenticated in login and logout. router navigates

		in authService we now have isAuthenticated variable, it takes true when we login, and false when we logout
		and in auth.guard.ts we inject this variable, to protect our fron-end routes

	
	now we have with token, also time, when token will be expired
	then we set up timer, which will call logout after token time expired 

		        this.tokenTimer = setTimeout(() => {
			  this.logout();
			}, expiresInDuration*1000);

	and so on ... look at the code


---now it's time to save token in local storage------------------------------------------------------------------

	We just simply in login write token in local storage, and in logout remove token from local storage
	also we write method, autoAuthUser(), which will be called from app.component.ts, when app is starting or refreshing.
	This methid checks if in local storage exist token, it returns isAuthentication true, if not, false, and user automaticly
	authenticated or not.
	
	important !!! when we reload page, we lost token, so we saving it in local storage, and for inetrceptor we need token, so
	in autoAuthUser() we take token from local storage, and assign its value to token, to get token by getToken() method. We need it 
	in backend, for routes authorization.

------------------------------------------------------------------------------------------------------------------	

	in login, we save userID, token and userStatus in local storage, and when we creating new post, in post service, we use userId, as
	a creatorId when we creating new post.
	Also we use userId from localstorage( currentUserID), in posts component, reject user to see others posts, and only see its posts.
	

	
















