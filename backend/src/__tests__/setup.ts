import mongoose from 'mongoose';

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/aieducation-test');
});

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}); 