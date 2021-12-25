<h1 align="center">Website Rekap Barang</h1>
<p align="center">
    <a href="https://newitemsapps.netlify.app/" target="blank">View Demo</a>
  · <a href="https://github.com/wsaefulloh/front-item/issues">Report Bug</a>
  · <a href="https://github.com/wsaefulloh/front-item/pulls">Request Feature</a>
</p>
  

## Built With

[![React.js](https://img.shields.io/badge/React.js-4.x-orange.svg?style=rounded-square)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v4.6.x-blue)](https://github.com/react-bootstrap/react-bootstrap)


## Description about project
Aplikasi ini berfungsi untuk memudahkan kita dalam melakukan pendataan ketersediaan barang atau bahan. Aplikasi ini dirancang dengan Express JS pada bagian backend dengan mengimplementasikan JSON Web Token untuk keperluan otentikasi dan otorisasi. Pada bagian frontend, aplikasi ini dibangun dengan React JS serta telah mengimplementasikan redux untuk keperluan pertukaran data. Database yang digunakan pada aplikasi ini adalah PostgreSQL untuk menyimpan data user serta barang(item) dari user yang bersangkutan.


## Feature
- Authentication users with JWT
- CRUD


## Environmental Variables
Provide the env value to use the api from the backend like this : 
REACT_APP_API = http://localhost:9000


## Installation Steps

1. Clone the repository

   ```bash
    https://github.com/wsaefulloh/front-item
    ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Add .env file at root folder project

   ```sh
   REACT_APP_API = [Backend API]
   ```

4. Run the app

   ```bash
   yarn start
   ```

5. You are all set!

   ```bash
   View the website at: http://localhost:3000
   ```


## Demo Account
Anda dapat melakukan registrasi untuk menjalankan demo aplikasi ini, atau dapat juga menggunakan akun dibawah ini
   ```sh
   username = usercoba02
   password = admin1234
   ```

## Backend Repository
Backend API : Items App - Backend [here](https://github.com/wsaefulloh/app-items)


## License

© [Wahyu Saefulloh](https://github.com/wsaefulloh/)
