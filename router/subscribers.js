const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Get all
router.get("/", async (req, res, next) => {
	try {
		const subscriber = await Subscriber.find();
		res.json(subscriber);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
//Get one
router.get("/:id", getSubscriber, (req, res, next) => {
	res.json(res.subscriber);
});
//Create one
router.post("/", async (req, res, next) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel,
	});
	try {
		const newSubscriber = await subscriber.save();
		res.status(201).json({ message: "New subscriber", newSubscriber });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
//Update one
router.patch("/:id", getSubscriber, async (req, res, next) => {
	if (req.body.name !== null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.subscribedToChannel !== null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save();
		res.json({ message: "Update successfully", updatedSubscriber });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});
//Delete one
router.delete("/:id", async (req, res, next) => {
	try {
		await Subscriber.findByIdAndDelete(req.params.id);
		res.json({ message: "Subscriber deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

async function getSubscriber(req, res, next) {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber === null) {
			return res.status(404).json({ message: "Can't find subscriber" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.subscriber = subscriber;
	next();
}

module.exports = router;
