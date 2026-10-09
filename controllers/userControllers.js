import User from "../models/userModel.js";
import { generateToken } from "../utils/token.js";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({
            message: 'All users fetched successfully',
            users: allUsers
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Error fetching users',
            error: error.message
        })
    }

}

export const createUser = async (req, res) => {

    try {

        const { name, age, city, country, hair, email, password } = req.body; // destructuring the request body to extract user details


        if (!name) {
            throw new Error('Name is required');
        }

        if (!age) {
            throw new Error('Age is required');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        if (!email) {
            throw new Error('Email is required');
        }

        const user = await User.create({
            name,
            age,
            city,
            country,
            hair,
            email: email?.toLowerCase(),
            password
        });


        res.status(200).json({
            message: 'User created successfully',
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Error creating user',
            error: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            throw new Error('User ID is required');
        }
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user: user
        });

    }
    catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Error fetching user',
            error: error.message
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            throw new Error('User ID is required');
        }
        const user = await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: 'User deleted successfully',
            user: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Error deleting user',
            error: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        console.log(user);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        user.password = undefined; // remove password from user object before sending response
        const token = generateToken(user); // generate token for the user


        res.status(200).json({
            message: 'User logged in successfully',
            user: user,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error logging in user',
            error: error.message
        })
    }
}