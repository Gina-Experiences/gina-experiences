'use server';

import { prisma } from './prisma';
import { Role } from '@prisma/client';

// Fetch user by ID and update last_active_date
export async function getUserById(userId: string) {
    try {
      // Update last_active_date to current date
      const now = new Date();
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { last_active_date: now },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          gender: true,
          birthdate: true,
          phone: true,
          address: true,
          registration_date: true,
          last_active_date: true, // This will now return the updated value
          image: true,
          is_active: true,
          role: true,
          ltv: true, // Lifetime value
          is_complete_information: true, // Check if information is complete
        },
      });
  
      return { user: updatedUser };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
// Create a new user
// Create a new user
export async function createUser(data: {
    email?: string;
    role: Role;
    firstname?: string;
    lastname?: string;
    gender?: string;
    birthdate?: Date;
    phone?: string;
    address?: string;
    image?: string;
  }) {
    try {
      const {
        email,
        role,
        firstname,
        lastname,
        gender,
        birthdate,
        phone,
        address,
        image,
      } = data;
  
      // Check for unique constraints on email and phone
      if (email && (await prisma.user.findUnique({ where: { email } }))) {
        return { error: 'Email already in use' };
      }
      if (phone && (await prisma.user.findUnique({ where: { phone } }))) {
        return { error: 'Phone number already in use' };
      }
  
      // Determine if information is complete
      const isComplete = firstname && lastname && gender && birthdate && phone && address;
  
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          role,
          firstname,
          lastname,
          gender,
          birthdate,
          phone,
          address,
          image,
          registration_date: new Date(),
          is_active: true,
          last_active_date: new Date(),
          ltv: 0.0, // Lifetime value starts at 0
          is_complete_information: Boolean(isComplete),
        },
      });
  
      return { user };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  

// Deactivate a user
export async function deactivateUser(userId: string) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { is_active: false },
    });

    return { message: 'User deactivated successfully', user };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get all active users
export async function getAllActiveUsers() {
  try {
    const users = await prisma.user.findMany({
      where: { is_active: true },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        gender: true,
        birthdate: true,
        phone: true,
        address: true,
        registration_date: true,
        last_active_date: true,
        image: true,
        is_active: true,
        role: true,
        ltv: true, // Lifetime value
        is_complete_information: true, // Check if information is complete
      },
    });

    return { users };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Update user details
export async function updateUser(
    userId: string,
    data: {
      firstname?: string;
      lastname?: string;
      gender?: string;
      birthdate?: Date;
      phone?: string;
      address?: string;
      image?: string;
    }
  ) {
    try {
      // Validate unique phone
      if (
        data.phone &&
        (await prisma.user.findUnique({ where: { phone: data.phone } }))
      ) {
        return { error: 'Phone number already in use' };
      }
  
      // Validate birthdate is in the past
      if (data.birthdate && data.birthdate >= new Date()) {
        return { error: 'Birthdate must be a past date' };
      }
  
      // Check if updated data completes the information
      const isComplete =
        data.firstname &&
        data.lastname &&
        data.gender &&
        data.birthdate &&
        data.phone &&
        data.address;
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...data,
          is_complete_information: Boolean(isComplete),
        },
      });
  
      return { updatedUser };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  

// Fetch user transactions
export async function getUserTransactions(userId: string) {
  try {
    const transactions = await prisma.transactions.findMany({
      where: { userId },
      include: {
        Product: true,
      },
    });

    return { transactions };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function changeUserRole(userId: string, newRole: Role) {
    try {
      // Validate if the new role is different from the current role
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
  
      if (!user) {
        return { error: 'User not found' };
      }
  
      if (user.role === newRole) {
        return { error: `User already has the role '${newRole}'` };
      }
  
      // Update the user's role
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          role: newRole,
        },
      });
  
      return {
        message: `User role updated to '${newRole}' successfully`,
        user: updatedUser,
      };
    } catch (error) {
      // Handle errors gracefully
      return {
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
