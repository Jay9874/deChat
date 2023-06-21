// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ChatApp {
    // User struct
    struct User {
        string name;
        Friend[] friendList;
    }

    // Friend struct
    struct Friend {
        address pubkey;
        string name;
    }

    // Message struct
    struct Message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUsers {
        string name;
        address accountAddress;
    }

    AllUsers[] public getAllUsers;

    // Mapping of users
    mapping(address => User) users;
    mapping(bytes32 => Message[]) messages;

    // Check if user exists
    function checkUserExist(address curr_user) public view returns (bool) {
        return bytes(users[curr_user].name).length > 0;
    }

    // Create user
    function createAccount(string calldata name) external {
        require(!checkUserExist(msg.sender), "User already exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        users[msg.sender].name = name;
        getAllUsers.push(AllUsers(name, msg.sender));
    }

    // Get user name
    function getUsername(
        address searched_key
    ) external view returns (string memory) {
        require(checkUserExist(searched_key), "User does not exist");
        return users[searched_key].name;
    }

    // Add friend
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "Friend does not exist");
        require(msg.sender != friend_key, "Cannot add yourself as a friend");
        require(
            checkAldreadyFriend(msg.sender, friend_key) == false,
            "Already friends"
        );
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, users[msg.sender].name);
    }

    //Check if already friends
    function checkAldreadyFriend(
        address user_key,
        address friend_key
    ) internal view returns (bool) {
        if (
            users[user_key].friendList.length >
            users[friend_key].friendList.length
        ) {
            address temp = user_key;
            user_key = friend_key;
            friend_key = temp;
        }
        for (uint256 i = 0; i < users[user_key].friendList.length; i++) {
            if (users[user_key].friendList[i].pubkey == friend_key) {
                return true;
            }
        }
        return false;
    }

    // Add friend to friend list
    function _addFriend(
        address user_key,
        address friend_key,
        string memory name
    ) internal {
        users[user_key].friendList.push(Friend(friend_key, name));
    }

    //Get friend list
    function getMyFriendList() external view returns (Friend[] memory) {
        require(checkUserExist(msg.sender), "User does not exist");
        return users[msg.sender].friendList;
    }

    //get chat code
    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        require(pubkey1 != pubkey2, "Cannot chat with yourself");
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    // Send message
    function sendMessage(address friend_key, string calldata _msg) external {
        
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "Friend does not exist");
        require(
            checkAldreadyFriend(msg.sender, friend_key) == true,
            "Not friends"
        );
        bytes32 chat_code = _getChatCode(msg.sender, friend_key);
        messages[chat_code].push(Message(msg.sender, block.timestamp, _msg));
    }

    // Get message
    function readMessage(
        address friend_key
    ) external view returns (Message[] memory) {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "Friend does not exist");
        require(
            checkAldreadyFriend(msg.sender, friend_key) == true,
            "Not friends"
        );
        bytes32 chat_code = _getChatCode(msg.sender, friend_key);
        return messages[chat_code];
    }

    // Get all users
    function getAllAppUser() external view returns (AllUsers[] memory) {
        return getAllUsers;
    }
}
