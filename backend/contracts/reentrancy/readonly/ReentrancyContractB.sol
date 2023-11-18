// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ReentrancyContractB {
    int private number;

    constructor() {
        number = 1;
    }
    function test() public {
      // Esta funcion debe hacer que el modifiedByOwner este en true solo por el Owner, es decir
      // Solo el que deployo el contrato de prueba pueda poner modifiedByOwner en true
    }

    /* Esta funcion es la que le va a pegar el test */
    function getNumber() public view returns (int) {
      return number;
    }
}
    