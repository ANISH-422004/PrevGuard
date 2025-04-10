const fakeDataModel = require("../models/fakeData.model");
const userModel = require("../models/user.model");
const { faker } = require("@faker-js/faker");

exports.generateFakeData = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(req.headers)
        // Fetch the user to check savedFakeData array
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ errors: ["User not found"] });
        }

        // Check if the user already has 8 fake data entries
        if (user.savedFakeData.length >= 8) {
            return res.status(400).json({ errors: ["Maximum limit of 8 fake data entries reached. Please delete one to create a new one."] });
        }

        // Create new fake data
        const fakeDataInstance = new fakeDataModel({
            userId,
            name: faker.person.fullName(),
            email: `${faker.string.alphanumeric(6)}@privguard.me`,
            emailActive: true,
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            aadhar: faker.string.numeric(12),
        });

        await fakeDataInstance.save();

        // Push the new fake data ID into the user's savedFakeData array
        user.savedFakeData.push(fakeDataInstance._id);
        await user.save();

        res.status(201).json({ message: "Fake data generated", data: fakeDataInstance });
    } catch (error) {
        console.error("Generate Fake Data Error:", error);
        res.status(500).json({ errors: ["Failed to generate fake data"] });
    }
};

exports.getFakeData = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await fakeDataModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({fakedata : data});
  } catch (error) {
    console.error("Fetch Fake Data Error:", error);
    res.status(500).json({ error: "Failed to fetch fake data" });
  }
};


exports.deleteFakeData = async (req, res) => {
    try {
        const userId = req.user._id;
        const fakeDataId = req.body.fakeDataId; 

        // Find the fake data entry to delete
        const fakeDataEntry = await fakeDataModel.findOneAndDelete({ _id: fakeDataId, userId });

        if (!fakeDataEntry) {
            return res.status(404).json({ errors: ["Fake data not found"] });
        }

        // Remove the deleted fake data ID from the user's savedFakeData array
        await userModel.findByIdAndUpdate(userId, { $pull: { savedFakeData: fakeDataId } });

        res.status(200).json({ message: "Fake data deleted successfully" });

    } catch (error) {
        console.error("Delete Fake Data Error:", error);
        res.status(500).json({ errors: ["Failed to delete fake data"] });
    }
} 