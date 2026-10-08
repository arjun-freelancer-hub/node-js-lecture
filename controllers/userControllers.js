import User from "../models/userModel.js";

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
        console.log(req.body);

        // if(!req.body.name){
        //     res.status(400).json({
        //         message: 'Name is required'
        //     });
        // return;
        // }

        if(!req.body.name){
            throw new Error('Name is required');
        }

         if(!req.body.age){
            throw new Error('Age is required');
        }

        const userTocreate = {
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            country: req.body.country,
            hair: { color: req.body.hair?.color, hairType: req.body.hair?.type }
        };

        const user = await User.create(userTocreate);
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
        if(!userId){
            throw new Error('User ID is required');
        }
        const user = await User.findById(userId);

        if(!user){
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

        if(!userId){
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