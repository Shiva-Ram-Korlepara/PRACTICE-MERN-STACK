const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, user.role),
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.role),
        });
    } else {
        res.status(400).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, loginUser };

// This code defines two functions: `registerUser` and `loginUser`.
// `registerUser` handles user registration by checking if the user already exists, hashing the password, and creating a new user in the database.
// It returns the user's details along with a generated token.
// `loginUser` checks if the user exists, verifies the password, and returns the user's details and a token if the login is successful.
// If the user does not exist or the password is incorrect, it returns an error message.
// Both functions use the `User` model to interact with the database and `bcrypt` for password hashing and comparison.
// The `generateToken` utility is used to create a JWT token for authenticated users.
// The functions are exported for use in other parts of the application, such as in routes or controllers.