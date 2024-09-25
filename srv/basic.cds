namespace basic;

using { 
  sap.common as Common 
} from '@sap/cds/common';

@path: '/basic'
service BasicService {
  //task 1
  function ping() returns String;
  //task 2
  function hello(to:String) returns String;
  //task 3
  function sum(a: Int32, b: Int32) returns Int32;
}

//task 4: plain rest service
@rest
service plain {
  function theAnswer() returns Int32;

  //task 5: to find the differences in service definition when it is served via Odata protocol and when it is done using rest protocol
  entity task5 {
    differences : String;
  }

  //task 6: unbound action that expects a list of integer and return largest number
  action highestValue(numbers : array of Int32) returns Int32;
}
