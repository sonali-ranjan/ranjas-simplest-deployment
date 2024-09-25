using northwind from '../db/schema';

@path: '/northbreeze'
service northbreeze {

    entity Products   as projection on northwind.Products actions{
        function stockValue (ProductID: Int32) returns Int32; //task: 11 Bound function
    };
    entity Suppliers  as projection on northwind.Suppliers;
    entity Categories as projection on northwind.Categories;

    //task: 7
    function productInfo(id:Int32) returns String;

    //task: 8 Just to test queries i.e., the CRUD+Q capabilities of OData

    //task: 9 unbound action that takes SAP Community id as argument and find ASCII code for it, calculate modulo value of it for the total number of Product in db and then return the product name using the modulo calculated value as id of the product
    action selectProduct(communityid: String) returns String;

    //task: 10 CDL with as-select
    entity TotalProducts as select from Products {
        COUNT(*) AS count
    }
}
