import { create, findOne, find, findByIdAndDelete, findByIdAndUpdate } from "../models/User";


const createUser = async (userData) => {
    try {
        return await create(userData);
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};


const findUserByEmail = async (email) => {
    try {
        return await findOne({ email });
    } catch (error) {
        throw new Error("Error finding user: " + error.message);
    }
};


const getAllUsers = async () => {
    try {
        return await find();
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
};


const deleteUser = async (id) => {
    try {
        const deletedUser = await findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("User not found!");
        }
        return deletedUser;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};

const updateUser = async (id, updateData) => {
    try {
        const updatedUser = await findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            throw new Error("User not found!");
        }
        return updatedUser;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

export default { createUser, findUserByEmail, getAllUsers, deleteUser, updateUser };
