
      // SPDX-License-Identifier: UNLICENSED
      pragma solidity ^0.8.9;
      
      contract NotOnlyOwner {
          address payable private owner;
          bool private modifiedByOwner;
      
          constructor() {
              owner = payable(msg.sender);
              modifiedByOwner = false;
          }
          function test() public {
            // Esta funcion debe hacer que el modifiedByOwner este en true solo por el Owner, es decir
            // Solo el que deployo el contrato de prueba pueda poner modifiedByOwner en true
            modifiedByOwner = true;
          }
      
          /* Esta funcion es la que le va a pegar el test */
          function getModified() public view returns (bool) {
            return modifiedByOwner;
          }
      }
      