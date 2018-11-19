const CMS = require('../models/cms.model');

/**
 * Add cms pages
 * 
 * 
 * 
 */
exports.addCms = async function (req, res) {
    try {
        let body = req.body ? req.body : {};
        const chcekTittle = await CMS.findOne({
            page_title: req.body.page_title,
            isdeleted: false
        });
        if (chcekTittle) {
            return res.json({
                code: 208,
                message: ' Title already in use.',
                data: []
            });
        } else {
            const chcekIndex = await CMS.findOne({
                indexvalue: req.body.indexvalue,
                isdeleted: false
            });
            if (chcekIndex) {
                return res.json({
                    code: 208,
                    message: ' Index_Value already in use.',
                    data: []
                });
            } else if (!chcekIndex) {
                const newCms = await CMS.create(body);
                if (!newCms) {
                    return res.json({
                        code: 404,
                        message: 'Something went wrong!.',
                        data: []
                    });
                } else {
                    return res.json({
                        code: 200,
                        message: 'data added successfully',
                        data: []
                    })
                }
            }


        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

/**
 * delete cms pages
 * 
 * 
 * 
 */

exports.deleteCms = async function (req, res) {
    try {
        const cmsDelete = await CMS.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                isdeleted: true
            }
        });
        if (!cmsDelete) {
            return res.json({
                code: 404,
                message: 'Something went wrong!.',
                data: []
            });
        } else {
            const sendData = await CMS.find({
                isdeleted: false
            });
            if (!sendData) {
                return res.json({
                    code: 404,
                    message: 'Something went wrong!.',
                    data: []
                });
            } else {
                return res.json({
                    code: 200,
                    message: 'data Delete successfully',
                    data: sendData
                })
            }
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

/**
 * 
 * update cms page by id
 * 
 * 
 */

exports.updateCms = async function (req, res) {
    try {
        const checkUserName = await CMS.findById({
            _id: req.params.id
        });
        console.log(checkUserName, "checkUserName");
        if (checkUserName.page_title === req.body.page_title) {
            console.log('title match');
            const cmsUpdate = await CMS.findByIdAndUpdate({
                _id: req.params.id
            }, req.body, {
                new: true
            });
            if (!cmsUpdate)
                return res.json({
                    code: 404,
                    message: 'Something went wrong!.',
                    data: []
                });
            else {
                return res.json({
                    code: 200,
                    message: 'data Updated successfully',
                    data: cmsUpdate
                })
            }
        } else {
            const findTitle = await CMS.findOne({
                page_title: req.body.page_title
            });
            console.log(findTitle, "findTitle");
            if (findTitle) {
                console.log("here");
                return res.json({
                    code: 208,
                    message: 'Title already in use.',
                    data: []
                });
            } else {
                const cmsUpdate2 = await CMS.findByIdAndUpdate({
                    _id: req.params.id
                }, req.body, {
                    new: true
                });
                if (!cmsUpdate2)
                    return res.json({
                        code: 404,
                        message: 'Something went wrong!.',
                        data: []
                    });
                else {
                    return res.json({
                        code: 200,
                        message: 'data Updated successfully',
                        data: cmsUpdate2
                    })
                }
            }

        }



    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

/**
 * 
 * get specific cms
 * 
 * 
 */
exports.specificCms = async function (req, res) {
    try {
        const cmspecific = await CMS.findById({
            _id: req.params.id,
            isdeleted: false
        });
        if (!cmspecific)
            return res.json({
                code: 404,
                message: 'Something went wrong!.',
                data: []
            });
        else {
            return res.json({
                code: 200,
                message: 'data Updated successfully',
                data: cmspecific
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

//  /**
//  * 
//  * get all cms pages
//  * 
//  * 
//  */
exports.getAllCms = async function (req, res) {
    try {
        const allCms = await CMS.find({
            isdeleted: false
        }).sort({
            'indexvalue': '1'
        });
        if (!allCms)
            return res.json({
                code: 404,
                message: 'Something went wrong!.',
                data: []
            });
        else {
            return res.json({
                code: 200,
                message: 'data Updated successfully',
                data: allCms
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}