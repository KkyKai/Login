# Login
Completed Using ReactJS and TypeScript for View,
Java Spring for Model and Controller

To start, Run LoginApplication.java in the backend folder to start Spring Server.
2 Accounts and profiles have been created via Spring Controllers through JSON injection through Postman (https://www.postman.com/downloads/)
1. CreateUserProfileController.java
3. CreateUserAccController.java

userprofile

![image](https://github.com/KkyKai/Login/assets/79208005/1056983f-78ad-4b45-8b2e-bfd44ee0ce80)

useraccount

![image](https://github.com/KkyKai/Login/assets/79208005/11cef97f-0e05-4424-91e4-032d73e64e5b)

To start Frontend, cd into frontend folder
Type npm start to start React server

Enter the following Account details when testing
For manager:

email: manager@gmail.com

password: password

Select: manager

For user:

email: user@gmail.com

password: password

Select: user

All routes to user or manager pages are protected by encryption via tokens and protected routes
To overwrite CORS policy,

![image](https://github.com/KkyKai/Login/assets/79208005/4f9778b3-62b8-49d3-af7c-7a81de076154)

has been added to LoginApplication.java. 
Where port 3000 is defined. (To be changed if port used is different i.e. http://localhost:5173).


On Manager Sucessful Login

![image](https://github.com/KkyKai/Login/assets/79208005/ce513310-557b-4bc5-99fc-2176105cf5ef)

Accessing Manager only Page

![image](https://github.com/KkyKai/Login/assets/79208005/130f804d-8169-41aa-bb40-e22e318d787f)

On User Successful Login

![image](https://github.com/KkyKai/Login/assets/79208005/3970d797-5d66-43ae-8447-f6fbada13b9d)








