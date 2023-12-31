const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        next(new AppError('No document found with that ID', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
})

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        },
    });

});
exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!doc) {
        next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: newDoc,
        },
    });

});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id)
    query.populate(popOptions)
    const doc = await query;

    if (!doc) {
        next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        },
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    //To allow for nested GET
    let filter = {}
    if (req.params.tourId) filter = { 'tour': req.params.tourId }

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();
    // const doc = await features.query.explain();
    const doc = await features.query;
    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc,
        },
    });
});
