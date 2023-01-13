const { user } = require("../../models");

const Joi = require('joi');

exports.addUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(11).required(),
        role: Joi.string().min(4).required(),
        gender: Joi.string().min(4).required(),
        bithdate: Joi.date().required(),
        address: Joi.string().min(5).required()
    });

    const {error} = schema.validate(req.body);

    if(error)
    return res.status(400).send({
        error: {
            message: error.details[0].message,
        },
    });

    try {
        const data = req.body;
        const newUser = await user.create(data);

        res.send({
            status: "Success",
            message: "Add User Finished",
            dataUser: {
                newUser,
            },
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};

exports.getUsers = async (req, res) => {
    try {

        const users = await user.findAll();

        res.send({
            status: "Success",
            message: "Get All User Success",
            data: {
                users,
            },
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await user.findOne({
            where: {
                id,
            },
        });

        res.send({
            status: "Success",
            data: {
                user: data
            }
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;

        await user.update(req.body, {
            where: {
                id,
            },
        });

        res.send({
            status: "Success",
            message: `Update User with ID: ${id} Success`,
            data: req.body
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await user.destroy({
            where: {
                id,
            },
        });

        res.send({
            status: "Success",
            message: `Delete User with ID: ${id} Success`,
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};