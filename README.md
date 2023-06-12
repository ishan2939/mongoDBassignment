# MongoDB Assignment

## 📝 Table of Contents

- [AIM](#aim)
- [Usage](#usage)
- [Output](#output)

<br/>

## 🏁 AIM <a name = "aim"></a>

- Create demo application using express
- Create database. (For tooling: Use Nosql booster or Mongodb compass)
- Connect database using mongoose package.
- Add authentication (Username/password)
- Create fake json data. 
- Save data into collection
- Create multiple collection for relations.
- Basic fetch queries using find api.
- Create list apis.
- Use aggregations to filter out data.
- Add sorting and searching functionalities.
- Add pagination.
- Add projection and grouping to get extract data from collection. 

<br/>

> ### ⛏️ Dependencies

- EJS
- Express
- bcryptjs
- cookie-parser
- dotenv
- jsonwebtoken
- mongoose
- node-cron

<br/>

## 🎈 Usage <a name = "usage"></a>
Clone the repo using below command:<br/>
<code>$ git clone (web URL)</code><br/>

<br/>

Then open the terminal and run the below command:<br/>

<code>$ npm i</code><br/>

<br />

Then run below command to start the application<br/>
<code>$ nodemon index.js</code><br/>

<br/>

and then go to "localhost:3000" to see the output.
<br/>

<br/>

## 🎉 Output <a name = "output"></a>

<br/>

<ol>
    <li>Signup page:</li><br/>
    <img src="./outputs/output1.png"><br/><br/>
    <ul>
        <li>It will also show errors if any occurs while signup.</li><br/>
    </ul>
    <li>Login page:</li><br/>
    <img src="./outputs/output2.png"><br/><br/>
    <ul>
        <li>It will also show errors if any occurs while login.</li><br/>
        <img src="./outputs/output3.png"><br/><br/>
        <img src="./outputs/output4.png"><br/><br/>
    </ul>
    <li>Home Page:</li><br/>
    <ul>
        <li>Section 1</li><br/>
        <img src="./outputs/output5.png"><br/><br/>
        <li>Section 2</li><br/>
        <img src="./outputs/output6.png"><br/><br/>
        <li>Section 3</li><br/>
        <img src="./outputs/output7.png"><br/><br/>
        <li>Section 4</li><br/>
        <img src="./outputs/output8.png"><br/><br/>
    </ul>
    <li>Catalog:</li><br/>
    <img src="./outputs/output9.png"><br/><br/>
    <img src="./outputs/output10.png"><br/><br/>
    etc...<br/><br/>
    <li>Catagories:</li><br/>
    <ul>
        <li>All catagories</li><br/>
        <img src="./outputs/output14.png"><br/><br/>
        <li>Products inside those categories</li><br/>
        <img src="./outputs/output15.png"><br/><br/>
        <img src="./outputs/output16.png"><br/><br/>
        <li>When clicked on product it takes you to products description part</li><br/>
        <img src="./outputs/output17.png"><br/><br/>
        <img src="./outputs/output18.png"><br/><br/>
    </ul>
    <li>Products:</li><br/>
    <ul>
        <li>All products pagination</li><br/>
        <img src="./outputs/output19.png"><br/><br/>
        <img src="./outputs/output20.png"><br/><br/>
        <img src="./outputs/output21.png"><br/><br/>
        <li>Searching</li><br/>
        <ul>
            <li>When result is found</li><br/>
            <img src="./outputs/output22.png"><br/><br/>
            <li>When result is not found</li><br/>
            <img src="./outputs/output23.png"><br/><br/>
        </ul>
        <li>Sorting</li><br/>
        <ul>
            <li>Sorted By Name</li><br/>
            <img src="./outputs/output24.png"><br/><br/>
            <li>Sorted By Price</li><br/>
            <img src="./outputs/output25.png"><br/><br/>
        </ul>
    </ul>
    <li>Cart:</li><br/>
    <ul>
        <li>You can add product to cart from any add to cart options provided.</li><br/>
        <li>If there are no products in cart</li><br/>
        <img src="./outputs/output26.png"><br/><br/>
        <li>If there are products in cart</li><br/>
        <img src="./outputs/output27.png"><br/><br/>
        <li>Now if you checkout then control takes you to orders page.</li>
    </ul><br/>
    <li>Orders:</li><br/>
    <ul>
        <li>If there are no orders</li><br/>
        <img src="./outputs/output28.png"><br/><br/>
        <li>If there are orders</li><br/>
        <li>Order's status will keep on changing after every 1 minute.</li><br/>
        <ul>
            <li>Confirmed</li><br/>
            <img src="./outputs/output29.png"><br/><br/>
            <li>Shipped</li><br/>
            <img src="./outputs/output30.png"><br/><br/>
            <li>Out For Delivery</li><br/>
            <img src="./outputs/output31.png"><br/><br/>
            <li>Placed</li><br/>
            <img src="./outputs/output32.png"><br/><br/>
            <li>Cancelled</li><br/>
            <img src="./outputs/output33.png"><br/><br/>
            <li>You can cancel your order as long as it's not placed.</li><br />
        </ul>
    </ul>
    <li>Logout</li><br/>
</ol>

##  ✍️ Author: ISHAN HARKHANI