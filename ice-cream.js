/* In a synchronous system like JS by default, tasks are completed one after another. for Example. 

Synchronous system, three images are in the same lane. One can't overtake the other. The race is finished one by one. If image number 2 stops, the following image stops.

Asynchronous system, the three images are in different lanes. They'll finish the race on their own pace. Nobody stops for anybody:
*/
/*
// Syncronous Example
console.log(" I ");

console.log(" eat ");

console.log(" Ice Cream ");

// asynchronous example

console.log("I");

// This will be shown after 2 seconds

setTimeout(()=>{
  console.log("eat");
},2000)

console.log("Ice Cream")
*/

/*
Callbacks

When you nest a function inside another function as an argument, that's called a callback.

When doing a complex task, we break that task down into smaller steps. To help us establish a relationship between these steps according to time (optional) and order, we use callbacks.
*/

//Get order from customer, fetch ingredients, start production, then serve.

let stocks = {
    Fruits : ["strawberry", "grapes", "banana", "apple"],
    liquid : ["water", "ice"],
    holder : ["cone", "cup", "stick"],
    toppings : ["chocolate", "peanuts"],
};



//Now, let's establish a relationship  using a callback

/*

let order = (call_production) =>{

    console.log("Order placed. Please call production")

    // function 👇 is being called 
  call_production();
};

let production = () =>{

    console.log("Production has started")

};

order(production);

// Function 1

let order = (fruit_name, call_production) =>{

  call_production();
};

// Function 2

let production = () =>{};


// Trigger 👇

order("", production);
*/
/*
In this chart, you can see that step 1 is to place the order, which takes 2 seconds. Then step 2 is cut the fruit (2 seconds), step 3 is add water and ice (1 second), step 4 is to start the machine (1 second), step 5 is to select the container (2 seconds), step 6 is to select the toppings (3 seconds) and step 7, the final step, is to serve the ice cream which takes 2 seconds.

To establish the timing, the function setTimeout() is excellent as it is also uses a callback by taking a function as an argument.
*/
/*

let order = (fruit_name, call_production) =>{

  setTimeout(function(){

    console.log(`${stocks.Fruits[fruit_name]} was selected`)

// Order placed. Call production to start
   call_production();
  },2000)
};
*/

// 2nd Function
/* Callback Hell
let production = () =>{

  setTimeout(()=>{
    console.log("production has started")
    setTimeout(()=>{
      console.log("The fruit has been chopped")
      setTimeout(()=>{
        console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
        setTimeout(()=>{
          console.log("start the machine")
          setTimeout(()=>{
            console.log(`Ice cream placed on ${stocks.holder[1]}`)
            setTimeout(()=>{
              console.log(`${stocks.toppings[0]} as toppings`)
              setTimeout(()=>{
                console.log("serve Ice cream")
              },2000)
            },3000)
          },2000)
        },1000)
      },1000)
    },2000)
  },0000)

};
*/
//Promises were invented to solve the problem of callback hell and to better handle our tasks.

/*
 promise has three states:

Pending: This is the initial stage. Nothing happens here. Think of it like this, your customer is taking their time giving you an order. But they haven't ordered anything yet.
Resolved: This means that your customer has received their food and is happy.
Rejected: This means that your customer didn't receive their order and left the restaurant.
*/

// Trigger 👇
//order(0, production);

//For this to happen, let's create a variable in JavaScript: 👇

//let is_shop_open = true;
//error handling - changed to 
let is_shop_open = false;

//Now, we're gonna make a promise to our customer, "We will serve you ice-cream"


let order = ( time, work ) => {

  return new Promise( ( resolve, reject )=>{

    if( is_shop_open ){

      setTimeout(()=>{

       // work is 👇 getting done here
        resolve( work() )

// Setting 👇 time here for 1 work
       }, time)

    }

    else{
      reject( console.log("Our shop is closed") )
    }

  })
}

// Set 👇 time here
//order( 2000, ()=>console.log(`${stocks.Fruits[0]} was selected`))
//    pass a ☝️ function here to start working

// The .then handler returns a promise when our original promise is resolved.
/*
Let me make it simpler: it's similar to giving instructions to someone. You tell someone to " First do this, then do that, then this other thing, then.., then.., then..." and so on.

The first task is our original promise.
The rest of the tasks return our promise once one small bit of work is completed
*/

// step 1
order(2000,()=>console.log(`${stocks.Fruits[0]} was selected`))

// step 2
.then(()=>{
  return order(0000,()=>console.log('production has started'))
})

// step 3
.then(()=>{
  return order(2000, ()=>console.log("Fruit has been chopped"))
})

// step 4
.then(()=>{
  return order(1000, ()=>console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
})

// step 5
.then(()=>{
  return order(1000, ()=>console.log("start the machine"))
})

// step 6
.then(()=>{
  return order(2000, ()=>console.log(`ice cream placed on ${stocks.holder[1]}`))
})

// step 7
.then(()=>{
  return order(3000, ()=>console.log(`${stocks.toppings[0]} as toppings`))
})

// Step 8
.then(()=>{
  return order(2000, ()=>console.log("Serve Ice Cream"))
})

.catch(()=>{
  console.log("Customer left")
})

//We need a way to handle errors when something goes wrong. But first, we need to understand the promise cycle:
// To catch our errors, let's change our variable to false.
//let is_shop_open = false;

/* 
To handle this, we use the .catch handler. Just like .then, it also returns a promise, but only when our original promise is rejected.

A small reminder here:

.then works when a promise is resolved
.catch works when a promise is rejected
*/

/*
A couple things to note about this code:

The 1st message is coming from the reject() part of our promise
The 2nd message is coming from the .catch handler
*/

/*
There's something called the finally handler which works regardless of whether our promise was resolved or rejected.

For example: whether we serve no customers or 100 customers, our shop will close at the end of the day
*/

.finally(()=>{
  console.log("end of day")
})

// Now please welcome Async / Await
//All you have to do is write the word async before any regular function and it becomes a promise.