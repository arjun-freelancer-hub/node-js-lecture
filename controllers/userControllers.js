import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { generateToken } from "../utils/token.js";

export const getAllUsers = catchAsync(async (req, res) => {
    const allUsers = await User.find();
    res.status(200).json({
        message: 'All users fetched successfully',
        users: allUsers
    });
})

export const createUser =catchAsync( async (req, res) => {

        const { name, age, city, country, hair, email, password } = req.body; // destructuring the request body to extract user details


        if (!name) {
            throw new AppError('Name is required', 400);
        }

        if (!age) {
            throw new AppError('Age is required', 400);
        }

        if (password.length < 8) {
            throw new AppError('Password must be at least 8 characters long', 400);
        }

        if (!email) {
            throw new AppError('Email is required', 400);
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
    
})

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            throw new AppError('User ID is required', 400);
        }
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
            // throw new Error('User not found');
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user: user
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            throw new AppError('User ID is required', 400);
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
            throw new AppError('Email and password are required', 400);
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        console.log(user);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (user.password !== password) {
            throw new AppError('Invalid password', 400);
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