CENTRAL BANK OF GENESYS


Api documentation for the [Central Bank of Genesys](http://localhost:5000/api/v1/) API.

---------------------------------------------------------------------------------------------------------------------
SIGN UP
Sign up for a [free account](http://localhost:5000/api/v1/auth/signup) to get started.
HTTP METHOD: POST
Expecting a JSON object with the following fields: 

{       
    name: "String",
    email: "String",
    password: "String",     
}

Please Note That All Fields Are Required.


---------------------------------------------------------------------------------------------------------------------

LOG IN
Log in to your account.
URL: http://localhost:5000/api/v1/auth/login
HTTP METHOD: POST
Expecting a JSON object with the following fields: 
{       
    email: "String",
    password: "String",     
}

please make sure to note/copy down the generated accessToken once you login. And afterwards add it to the header of all your requests as "token".


---------------------------------------------------------------------------------------------------------------------
TRANSACTION HISTORY
URL: http://localhost:5000/api/v1/users/transaction/history
HTTP METHOD: GET
Expecting User "token" At The Request Header, if you dont understand see "LOG IN" paragraph/section for more info on this






TESTING
All Test Must Be Simple, So Simple That Even A Non-Programmer Will Look At It And Understand It.

Things Tested:
- Controllers