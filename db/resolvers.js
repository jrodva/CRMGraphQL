require('dotenv').config({ path: '.env.local'});

const User = require("../models/User");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getToken = (user, expiresIn) => {
  const { id, email, name, surname } = user;

  return jwt.sign({ id, email, name, surname }, process.env.SECRET, { expiresIn });
}


const resolvers = {
  Query: {
    getUser: async  (_, { token }) => {
      const userId = await jwt.verify(token, process.env.SECRET);

      return userId;
    },
    getProduct: async (_, { id }) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    },
    getProducts: async (_) => {
      try {
        const products = await Product.find({});

        return products;
      } catch (error) {
        console.log(error);
      }
    },
    getCustomers: async () => {
      try {
        const customers = await Customer.find({});

        return customers;
      } catch (error) {
        console.log("Fail requesting clients : ", error);
      }
    },
    getCustomersByVendor: async (_, {}, ctx) => {
      const { user: { id } }  = ctx;
      const vendor = id.toString();

      try {
        const customers = await Customer.find({ vendor });

        return customers;
      } catch (error) {
        console.log("Fail requesting clients : ", error);
      }
    },
    getCustomer: async (_, { id }, ctx ) => {
      const customer = await Customer.findById(id);

      if (!customer) {
        throw new Error("Customer not found");
      }

      if (customer.vendor.toString() !== ctx.user.id) {
        throw new Error("Not authorized customer to get customer");
      }

      return customer;
    }
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({email});

      if (user) {
        throw new Error("Existing user");
      }

      const salt = bcryptjs.getSalt(process.env.HASH);
      input.password = await bcryptjs.hash(password, salt);

      try {
        const user = new User(input);
        const result = await user.save();

        return result;
      } catch (error) {
        console.log(error);
      }

      console.log(`Creating new user ${input.name}`);
    },
    authenticateUser: async (_, { input }) => {
      const { email, password } = input;
      console.log(`INPUT ${email} :: ${password}`);
      console.log(User);

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
    },
    newProduct: async (_, { input }) => {
      try {
        const product = new Product(input);
        const result = await product.save();

        return result;
      } catch (error) {
        console.log(error);
      }

      console.log(`Creating new product ${input.name}`);
    },
    updateProduct: async (_, { id, input }) => {
      const { name, stock, price } = input;
      let product = await Product.findById(id);

      if (!product) {
        throw new Error("This product does not exist")
      }
      product = await Product.findOneAndUpdate({ _id: id }, input, { new: true});

      return product;
    },
    deleteProduct: async (_, { id }) => {
      let product = await Product.findById(id);

      if (!product) {
        throw new Error("This product does not exist")
      }

      await Product.findByIdAndDelete({_id: id});

      return "Deleted product"
    },
    newCustomer: async (_, { input }, ctx) => {
      const { email } = input;
      const customer = await Customer.findOne({ email });

      if (customer) {
        throw new Error("Existing customer");
      }

      const newCustomer = new Customer(input);
      newCustomer.vendor = ctx.user.id;

      try {
        const result = await newCustomer.save();

        return result;
      } catch (error) {
        console.log("Error creating new customer : ", error);
      }
    },
    updateCustomer: async (_, { id, input }, ctx) => {
      const customer = await Customer.findById(id);

      if (!customer) {
        throw new Error("Customer not found");
      }

      if (customer.vendor.toString() !== ctx.user.id) {
        throw new Error("Not authorized customer to get customer");
      }

      const newCustomer = await Customer.findOneAndUpdate({ _id: id }, input, { new: true});

      return newCustomer;
    }
  }
};

module.exports = resolvers;
