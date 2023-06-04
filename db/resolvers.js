const User = require("./schema")
const bcryptjs = require("bcryptjs");

const resolvers = {
  Query: {
    getCourse: () => "Something"
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;
      const isAnExistingUser = await User.findOne({email});

      if (isAnExistingUser) {
        throw new Error("Existing user");
      }

      const salt = bcryptjs.getSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        const user = new User(input);

        user.save();

        return user;
      } catch (error) {
        console.log(error);
      }

      console.log(`Creating new user ${input.name}`);
    }
  }
};

module.exports = resolvers;
