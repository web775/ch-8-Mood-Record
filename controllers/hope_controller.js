const multer = require('multer');
const dotenv = require('dotenv');
const Hopeful = require('../models/hopeful.js');
dotenv.config();


//  video are here

const AudioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './records/hope/audio');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const HopefulAudio = multer({
    storage: AudioStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'video/3gpp') {
            cb(null, true);
        } else {
            cb(new Error("Only audio/3gp files are allowed!"), false);
        }
    }
});


/* <><><><><>----------------------<><><><><> */


/* create Hopefull */


const Recording_hopeful = async (req, res) => {
    try {
        HopefulAudio.single('hopeful')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: "File upload failed.", status: "failed", error: err.message });
            }

            if (!req.file) {
                return res.status(402).json({ message: "All Fields and Image Are Required", status: "failed" });
            }

            const hope = await Hopeful({
                user_id: req.user._id,
                hopeful: req.file.filename
            });

            await hope.save();
            res.status(200).json({ message: "Hopeful Create successfully", hopeful: hope, code: 200, status: "success" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "failed" });
    }
};


/* All Hopefull */


const Fetch_hope = async (req, res) => {
    try {
        const userId = req.user.id;
        const hope = await Hopeful.find({ user_id: userId });

        if (!hope || hope.length === 0) {
            return res.status(404).json({ message: "Hope not found for this user.", status: "failed" });
        }

        res.status(200).json({ message: "Hope Retrieved successfully", hope: hope, code: 200, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message, status: "failed" });
    }
};


/* Delete Hopefull */


const Remove_hope = async (req, res) => {
    try {
        const hopeId = await Hopeful.findById(req.params.id);
        if (!hopeId) {
            return res.status(200).json({ message: "Hope not found", code: 401 });
        }
        await Hopeful.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Hope Successfully Deleted", code: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { Recording_hopeful, Remove_hope, Fetch_hope }