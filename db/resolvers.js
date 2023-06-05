const User = require("./schema")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getToken = (user, expiresIn) => {
  const { id, email, name, surname } = user;

  return jwt.sign({ id, email, name, surname }, process.env.SECRET, { expiresIn });
}


const resolvers = {
  Query: {
    getCourse: () => "Something"
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;
      const existingUser = await User.findOne({email});

      if (existingUser) {
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
    },
    authenticateUser: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({email});

      if (!user) {
        throw new Error("Not existing user");
      }

      const isACorrectPassword = await bcryptjs.compare(password, user.password);
      if (!isACorrectPassword) {
        throw new Error("Incorrect password");
      }

      return {
        token: getToken(user, '24h')
      }
    }
  }
};

module.exports = resolvers;
