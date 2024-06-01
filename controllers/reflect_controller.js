const multer = require('multer');
const dotenv = require('dotenv');
const ReflectFul = require('../models/reflectful.js');
dotenv.config();


//  video are here

const AudioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './records/reflect/audio');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const ReflectfulAudio = multer({
    storage: AudioStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'video/3gpp') {
            cb(null, true);
        } else {
            cb(new Error('Only audio/3gp files are allowed!'), false);
        }
    }
});


/* <><><><><>----------------------<><><><><> */

/* create ReflectFul */

const Recording_reflectful = async (req, res) => {
    try {
        ReflectfulAudio.single('reflectful')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: "File upload failed.", status: "failed" });
            }

            if (!req.file) {
                return res.status(402).json({ message: 'All Fields and Image Are Required', status: "failed" });
            }

            const reflect = await ReflectFul({
                user_id: req.user._id,
                reflectful: req.file.filename
            });

            await reflect.save();
            res.status(200).json({ message: 'Reflect Create successfully', reflectful: reflect, code: 200, status: "success" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', status: 'failed' });
    }
};


/* All ReflectFul */

const Fetch_reflectful = async (req, res) => {
    try {
        const userId = req.user.id;
        const reflect = await ReflectFul.find({ user_id: userId });

        if (!reflect || reflect.length === 0) {
            return res.status(404).json({ message: "Reflect not found for this user.", status: "failed" });
        }

        res.status(200).json({ message: "Reflect Retrieved successfully", reflectful: reflect, code: 200, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message, status: "failed" });
    }
};

/* <><><><><>----------------------<><><><><> */

/* Delete ReflectFul */

const Remove_reflectful = async (req, res) => {
    try {
        const reflectId = await ReflectFul.findById(req.params.id);
        if (!reflectId) {
            return res.status(200).json({ message: 'ReflectFul not found', code: 401, status: "failed" });
        }
        await ReflectFul.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'ReflectFul Successfully Deleted', code: 200, status: "success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, status: "failed" });
    }
};

/* Delete ReflectFul */

module.exports = { Recording_reflectful, Remove_reflectful, Fetch_reflectful }