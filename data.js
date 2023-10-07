const dummydata = [];

for (let i = 0; i < 100; i++) {
  dummydata.push({
    title: `Scholarship ${i + 1}`,
    description: `Description for Scholarship ${i + 1}`,
    eligibilityCriteria: `Eligibility Criteria for Scholarship ${i + 1}`,
    category: `Category ${(i % 5) + 1}`, // Assigning categories in a cyclic manner
    location: {
      type: "Point",
      coordinates: [getRandomInRange(-180, 180), getRandomInRange(-90, 90)],
    },
  });
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

console.log(dummydata);

module.exports = dummydata;
