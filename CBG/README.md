CENTRAL BANK OF GENESYS


Api documentation for the [Central Bank of Genesys](http://localhost:5000/api/v1/) API.

---------------------------------------------------------------------------------------------------------------------
### SIGN UP(Create New User)

Sign up to get started for free!. 

URL: http://localhost:5000/api/v1/auth/signup

HTTP METHOD: POST

Expecting a JSON object with the following fields: 

```
{       
    name: "String",
    email: "String",
    password: "String",     
}
```

Please Note That All Fields Are Required.

---------------------------------------------------------------------------------------------------------------------

### GET ALL USERS

URL: http://localhost:5000/api/v1/users

HTTP METHOD: GET

---------------------------------------------------------------------------------------------------------------------

### DISABLE USER

URL: http://localhost:5000/api/v1/users/disable/:id

HTTP METHOD: PATCH

Expecting a JSON object with the following fields: 

```
{       
    isUserActive: Boolean,    
}
```

true means user is active and false means user is disabled.

---------------------------------------------------------------------------------------------------------------------

### ENABLE USER

URL: http://localhost:5000/api/v1/users/enable/:id

HTTP METHOD: PATCH

Expecting a JSON object with the following fields: 

```
{       
    isUserActive: Boolean,    
}
```

true means user is active and false means user is disabled.

---------------------------------------------------------------------------------------------------------------------

### DELETE USER

URL: http://localhost:5000/api/v1/users/delete/:id

HTTP METHOD: delete

---------------------------------------------------------------------------------------------------------------------

### LOG IN

Log in to your account.

URL: http://localhost:5000/api/v1/auth/login

HTTP METHOD: POST

Expecting a JSON object with the following fields:

``` 
{       
    email: "String",
    password: "String",     
}
```

please make sure to note/copy down the generated accessToken once you login. And afterwards add it to the header of all your requests from here donwards,  as "token".

---------------------------------------------------------------------------------------------------------------------

### DEPOSIT

URL: http://localhost:5000/api/v1/users/transaction/deposit

HTTP METHOD: POST

Expecting a JSON object with the following fields:

```
{
    amount: "Number",    
}
```

Expecting User "token" At The Request Header, if you dont understand see "LOG IN" paragraph/section for more info on this

---------------------------------------------------------------------------------------------------------------------

### WITHDRAWAL

URL: http://localhost:5000/api/v1/users/transaction/withdraw

HTTP METHOD: POST

Expecting a JSON object with the following fields: 

```
{
    amount: "Number",    
}
```

Expecting User "token" At The Request Header, if you dont understand, see "LOG IN" paragraph/section for more info on this

---------------------------------------------------------------------------------------------------------------------

### TRANSFER

URL: http://localhost:5000/api/v1/users/transaction/transfer

HTTP METHOD: POST

Expecting a JSON object with the following fields: 

```
{
    amount: "Number",    
}
```

Expecting User "token" At The Request Header, if you dont understand, see "LOG IN" paragraph/section for more info on this

---------------------------------------------------------------------------------------------------------------------

### CHECK ACCOUNT BALANCE

URL: http://localhost:5000/api/v1/users/transaction/balance

HTTP METHOD: GET

Expecting User "token" At The Request Header, if you dont understand, see "LOG IN" paragraph/section for more info on this

---------------------------------------------------------------------------------------------------------------------

### TRANSACTION HISTORY

URL: http://localhost:5000/api/v1/users/transaction/history

HTTP METHOD: GET

Expecting User "token" At The Request Header, if you dont understand see "LOG IN" paragraph/section for more info on this

---------------------------------------------------------------------------------------------------------------------

### REVERSE TRANSACTION

URL: http://localhost:5000/api/v1/users/transaction/reverse

HTTP METHOD: GET

Expecting a JSON object with the following fields: 

```
{
    transactionId: "String",    
}
```
---------------------------------------------------------------------------------------------------------------------


<!-- TESTING
All Test Must Be Simple, So Simple That Even A Non-Programmer Will Look At It And Understand It.

Things Tested:
- Controllers -->