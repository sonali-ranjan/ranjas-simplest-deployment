const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
    const { Products, Suppliers, Categories } = cds.entities('northbreeze');

    this.on('productInfo', async (req) => {

        let Prod = await SELECT.one.from(Products).where({ ProductID: req.data.id });
        let SupName = await SELECT.one.from(Suppliers).columns(['CompanyName']).where({ SupplierID: Prod.Supplier_SupplierID })
        return `${Prod.ProductName} by ${SupName.CompanyName}`

    });

    this.on('selectProduct', async (req) => {
        console.log(`SAP Community ID: ${req.data.communityid}`);

        //find ASCII code for the community ID
        const str = req.data.communityid;
        const calculateASCII = str => {
            let res = 0;
            for (let i = 0; i < str.length; i++) {
                const num = str[i].charCodeAt(0);
                res += num;
            };
            return res;
        };
        let ASCIIVal = Number(calculateASCII(str));
        // console.log(`ASCII: ${ASCIIVal}`);
        //find number of products
        let numOfProd = await SELECT.from(Products).columns('COUNT(*) AS total');
        console.log(numOfProd);
        let totalNumOfProd = Number(numOfProd[0].total);

        //modulo calculation + 1 (because you need to take into account that the result of a modulo calculation could be 0, which is not in the ID range.)
        let ProdID = (ASCIIVal % totalNumOfProd) + 1;
        console.log(ProdID);
        let ProdName = await SELECT.one.from(Products).columns(['ProductName']).where({ ProductID: ProdID })
        console.log(ProdName);

        return `Product: ${ProdName.ProductName}`
    })

    this.on('stockValue', Products, async ({...req}) => {
        let ProdId = req.params[0].ProductID;
        let Prod = await SELECT.one.from(Products).where({ProductID: req.params[0].ProductID})
        console.log(`Prod Unit Price: ${Prod.UnitPrice} Prod Stock Unit: ${Prod.UnitsInStock}`);

        return Prod.UnitPrice * Prod.UnitsInStock;
    })
}) 