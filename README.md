# swifty-companion

<p align="center">
  <img src="https://github.com/ThibautCharpentier/swifty-companion/blob/main/previews/loginScreen.png" alt="preview"/>
  <img src="https://github.com/ThibautCharpentier/swifty-companion/blob/main/previews/searchScreen.png" alt="preview"/>
</p>

swifty-companion is an individual 42 school mobile project where we have to build an application that will retrieve the information of 42 students, using the **42 API**.

## Status

* Success
* Grade: 110/100

## Rules

We need to meet the following criteria:

* Our app must have at least **two views**. The first view is used to search for a 42 student and the second view must display the login information, if the login exists.
* We must display some details for the user.
* We must display the user's skills with level and percentage.
* We must display the projects that the user has completed, including failed ones.
* Our app must allow for navigating back to the first view.
* The app has to be responsive and displays correctly on different screen sizes and mobile platforms.
* We must handle all cases of errors.
* We must use **intra 42 OAuth2**.

### Bonus

If the **42 API token** expires, the application must refresh it. It must still be able to work properly in any case.

## Usage

In `swiftyCompanion` and `backend`, you need to create an **.env** file, like this:
```
LOCAL_IP=localhost
LOCAL_IP2=127.0.0.1

#ifconfig | grep 'inet'
#OR
#ip addr | grep 'inet '
HOST_IP=

BACK_PORT=8000

#You need an ID and a secret generated by the 42 API to make the app work 
CLIENT_ID=
CLIENT_SECRET=
```
Then, you have to install all necessary packages in these two folders with:
```
npm install
```
Make sure that an **android device** (it can be a virtual device) is connected to run the application:
```
adb devices
```
To run the application, in `backend`:
```
node src/app.js
```
in `swiftyCompanion`:
```
npx expo run:android
```
If you want to see my profil, search for **tcharpen**

***
Made by Thibaut Charpentier: <thibaut.charpentier42@gmail.com>
