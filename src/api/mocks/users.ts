import type { User } from '@/types/auth'
import { UserRole } from '@/types/auth'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'patient@calllabs.in',
    phone: '+919876543210',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.PATIENT,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'doctor@calllabs.in',
    phone: '+919876543211',
    firstName: 'Dr. Sarah',
    lastName: 'Smith',
    role: UserRole.DOCTOR,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'nurse@calllabs.in',
    phone: '+919876543212',
    firstName: 'Mary',
    lastName: 'Johnson',
    role: UserRole.NURSE,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'admin@calllabs.in',
    phone: '+919876543213',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock passwords (in real app, these would be hashed)
export const mockPasswords: Record<string, string> = {
  'patient@calllabs.in': 'patient123',
  'doctor@calllabs.in': 'doctor123',
  'nurse@calllabs.in': 'nurse123',
  'admin@calllabs.in': 'admin123',
}

// Mock OTPs (in real app, these would be generated and sent)
export const mockOTPs: Record<string, string> = {
  '+919876543210': '123456',
  '+919876543211': '123456',
  '+919876543212': '123456',
  '+919876543213': '123456',
}
