import { UserModel, IUser } from './../../../database';
import { createUser, sendMessage } from './../../../common/kafka/node.kafka.service';
import { Message } from './../../../common/types';

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) 
    return {message: 'user not fouund'};
  return {message: 'user found', data: user};
};

export const createUserAction = createUser('user-events', async (message: any) => {
  const { event, user } = JSON.parse(message.value);
  switch (event) {
    case 'user-registered':
      // Constructing a Message object
      const registeredMessage: Message = {
        value: JSON.stringify({ event: 'user-registered', user })
      };
      
      sendMessage('user-events', registeredMessage);
      
      const userProfile = new UserModel({ userId: user._id, name: '', address: '' });
      await userProfile.save();
      console.log(`User profile created for userId: ${user._id}`);
      break;
      
    case 'user-logged-in':
      // Constructing a Message object
      const loggedInMessage: Message = {
        value: JSON.stringify({ event: 'user-logged-in', user })
      };
      sendMessage('user-events', loggedInMessage);
      
      console.log(`User logged in with email: ${user.email}`);
      break;
      
    default:
      console.log('Unknown event');
  }
});

