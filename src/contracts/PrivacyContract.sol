pragma solidity ^0.8.0;

contract PrivacyContract {
    modifier checkPassword(bytes32 _pw) {
        bytes32 password = _accounts[msg.sender].password;
        require(_pw == password && password != 0, "password");
        _;
    }

    mapping(address => uint256[2]) private _indexCount; //0 for messages 1 for data
    mapping(address => Account) private _accounts;

    struct Message {
        address from;
        string text;
        uint256 timestamp;
    }

    struct Data {
        uint256 timestamp;
        string name;
        string data;
    }
    struct Account {
        bytes32 password;
        mapping(uint256 => Data) data;
        mapping(uint256 => Message) messages;
    }

    function setPassword(string calldata passwordSeed) external {
        _accounts[msg.sender].password = bytes32(
            keccak256(
                abi.encodePacked("function setPassword(string)", passwordSeed)
            )
        );
    }

    function dataWrite(
        bytes32 password,
        string calldata name,
        string calldata data
    ) external checkPassword(password) {
        _accounts[msg.sender].data[++_indexCount[msg.sender][1]] = Data({
            timestamp: block.timestamp,
            name: name,
            data: data
        });
    }

    function dataRead(bytes32 password, uint256 index)
        external
        view
        checkPassword(password)
        returns (Data memory)
    {
        return _accounts[msg.sender].data[index];
    }

    function messageWrite(
        bytes32 password,
        address to,
        string calldata text
    ) external checkPassword(password) {
        _accounts[to].messages[++_indexCount[to][0]] = Message({
            from: msg.sender,
            text: text,
            timestamp: block.timestamp
        });
    }

    function messageRead(bytes32 password, uint256 index)
        external
        view
        checkPassword(password)
        returns (Message memory)
    {
        return _accounts[msg.sender].messages[index];
    }
}
