const cds = require('@sap/cds');

module.exports = (srv) => {
  srv.on('ping', async () => {
    return {
      "@odata.context": "$metadata#Edm.String",
      "value": "pong"
    };
  });


  //task 2: Hello world
  srv.on('hello', async (req) => {
    return {
      "@odata.context": "$metadata#Edm.String",
      "value": `Hello ${req.data.to}!`
    };
  });

  //task 3: sum of intergers
  srv.on('sum', async (req) => {
    console.log(req.data);
    let a = req.data.a;
    let b = req.data.b;
    return {
      "@odata.context": "$metadata#Edm.Int32",
      "value": a + b
    };
  })

  srv.on('theAnswer', async () => 42);

  srv.on('highestValue', async (req) => {
    
    console.log(`req: ${req.data.numbers}`)
    let numbers = req.data.numbers;

    let maxNumber = numbers[0];

        // Use forEach to find the maximum number
        numbers.forEach(num => {
            if (num > maxNumber) {
                maxNumber = num;
            }
        });

        return maxNumber;

  } )

};
