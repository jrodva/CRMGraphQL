const User = require("./schema")

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
