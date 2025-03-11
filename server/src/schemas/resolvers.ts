import User from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';

// Define TypeScript interfaces
interface Context {
  user?: {
    _id: string;
    username?: string;
    email?: string;
  };
}

interface BookInput {
  bookId: string;
  authors: string[];
  description: string;
  title: string;
  image?: string;
  link?: string;
}

const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      
      const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate('savedBooks');
        
      return userData;
    },
  },
  
  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Error logging in');
      }
    },
    
    addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user.username, user.email, user._id);
        
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error('Error creating user');
      }
    },
    
    saveBook: async (_: any, { bookData }: { bookData: BookInput }, context: Context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators: true }
          ).populate('savedBooks');
          
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        console.error(err);
        throw new Error('Error saving book');
      }
    },
    
    removeBook: async (_: any, { bookId }: { bookId: string }, context: Context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        console.error(err);
        throw new Error('Error removing book');
      }
    },
  },
};

export default resolvers;