const { service, user, category, categoryService } = require('../../models');

exports.getServices = async (req, res) => {
    try {
        let data = await service.findAll({
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: "categoryService",
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });

        data = JSON.parse(JSON.stringify(data));
        data = data.map((item) => {
            return { ...item };
        });

        res.send({
            status: "Success",
            message: "Get All Service Success",
            data,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};

exports.getService = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await service.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: "categoryService",
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });

        data = JSON.parse(JSON.stringify(data));

        data = {
            ...data,
        };

        res.send({
            status: "Success",
            message: `Get data with ID: ${id} Success`,
            data,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error"
        });
    }
};

exports.addService = async (req, res) => {
    try {
        let { categoryId } = req.body;

        if (categoryId) {
            categoryId = categoryId.split(',');
        }

        const data = {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            idUser: req.user.id,
        };

        let newService = await service.create(data);

        if (categoryId) {
            const categoryServiceData = categoryId.map((item) => {
                return {
                    idService: newService.id,
                    idCategory: parseInt(item)
                };
            });

            await categoryService.bulkCreate(categoryServiceData);
        };

        let serviceData = await service.findOne({
            where: {
                id: newService.id,
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: "categoryService",
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });

        serviceData = JSON.parse(JSON.stringify(serviceData));

        res.send({
            status: "Success",
            message: "Add New Service Success",
            data: {
                ...serviceData,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Failed",
            message: "Server Error",
        });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        let { categoryId } = req.body;
        categoryId = await categoryId.split(',');

        const data = {
            name: req?.body?.name,
            desc: req?.body?.desc,
            price: req?.body?.price,
            idUser: req?.user?.id,
        };

        await categoryService.destroy({
            where: {
                idService: id,
            },
        });

        let categoryServiceData = [];
        if (categoryId != 0 && categoryId[0] != '') {
            categoryServiceData = categoryId.map((item) => {
                return {
                    idService: parseInt(id),
                    idCategory: parseInt(item)
                };
            });
        }

        if (categoryServiceData.length != 0) {
            await categoryService.bulkCreate(categoryServiceData);
        }

        await service.update(data, {
            where: {
                id,
            },
        });

        res.send({
            status: "Success",
            message: `Update Data with ID: ${id} Success`,
            data: {
                id,
                data,
                categoryServiceData,
            },
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        await service.destroy({
            where: {
                id,
            },
        });

        await categoryService.destroy({
            where: {
                idService: id,
            },
        });

        res.send({
            status: "Success",
            message: `Delete service with ID: ${id} Success`,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
};