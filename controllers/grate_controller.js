const dotenv = require('dotenv');
const GrateFul = require('../models/grateful.js');
const multer = require('multer');
dotenv.config();


//  video are here

const AudioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './records/grateful/audio');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const GratefulAudio = multer({
    storage: AudioStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'video/3gpp') {
            cb(null, true);
        } else {
            cb(new Error('Only audio/3gp files are allowed!'), false);
        }
    }
});

// File MIME type: video/3gpp
// File MIME type: video/3gpp

// const GratefulAudio = multer({
//     storage: AudioStorage,
//     fileFilter: function (req, file, cb) {
//         console.log('File MIME type:', file.mimetype);
//         if (file.mimetype.startsWith('audio/3gp') || file.mimetype.startsWith('video/3gpp')) {
//             cb(null, true); // Accept audio and video MIME types
//         } else {
//             cb(new Error('Only audio files are allowed!'), false);
//         }
//     }
// });

/* <><><><><>----------------------<><><><><> */

/* create Grate */


const Recording_grateful = async (req, res) => {
    try {
        GratefulAudio.single('grateful')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: "File upload failed.", status: 'failed', error: err.message });
            }

            if (!req.file) {
                return res.status(402).json({ message: "File is Required", status: "failed", });
            }

            const grate = await GrateFul({
                user_id: req.user._id,
                grateful: req.file.filename
            });

            await grate.save();
            res.status(200).json({ message: "Grate Create successfully", gratetful: grate, code: 200, status: "success" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "failed" });
    }
};



/* <><><><><>----------------------<><><><><> */

/* All grateful */

const Fetch_grateful = async (req, res) => {
    try {
        const userId = req.user.id;
        const grate = await GrateFul.find({ user_id: userId });

        if (!grate || grate.length === 0) {
            return res.status(404).json({ message: 'GrateFul not found for this user.', status: "failed" });
        }

        res.status(200).json({ message: 'GrateFul Retrieved successfully', grateful: grate, code: 200, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message, status: "failed" });
    }
};

/* <><><><><>----------------------<><><><><> */

/* single grateful */


const Single_grateful = async (req, res) => {
    try {
        const grate = await GrateFul.findById(req.params.id);
        if (!grate || grate.length === 0) {
            return res.status(201).json({ message: 'Grateful Not Found', gratefull: grate, code: 201 });
        }

        return res.status(200).json({ message: 'Grateful Retrived Successfully', gratefull: grate, code: 200 });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', status: 'failed' });
    }
};


/* <><><><><>----------------------<><><><><> */

/* Delete grateful */

const Remove_grateful = async (req, res) => {
    try {
        const grateId = await GrateFul.findById(req.params.id);
        if (!grateId) {
            return res.status(200).json({ message: 'GrateFul not found', code: 401, status: "failed" });
        }
        await GrateFul.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'GrateFul Successfully Deleted', code: 200, status: "success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message, status: "failed" });
    }
};



module.exports = { Recording_grateful, Remove_grateful, Fetch_grateful, Single_grateful }