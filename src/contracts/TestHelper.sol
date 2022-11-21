pragma solidity ^0.8.0;

contract TestHelper {
    function seedToBytes(string calldata seed) external pure returns (bytes32) {
        return
            bytes32(
                keccak256(
                    abi.encodePacked("function setPassword(string)", seed)
                )
            );
    }
}
