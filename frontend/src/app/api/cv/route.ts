import { NextRequest, NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite/client';
import { appwriteConfig } from '@/lib/appwrite/config';
import { ID, Query } from 'appwrite';
import { z } from 'zod';
import { apiRateLimiter, cvCreationRateLimiter } from '@/lib/security/rateLimiter';
import { InputSanitizer } from '@/lib/security/sanitizer';

// Add proper error logging
const logError = (message: string, error: unknown) => {
	// In production, use a proper logging service
	if (process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line no-console
		console.error(message, error);
	}
};

// Enhanced validation schemas with better error messages
const createCVSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
	firstName: z
		.string()
		.min(1, 'First name is required')
		.max(100, 'First name must be less than 100 characters'),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.max(100, 'Last name must be less than 100 characters'),
	email: z
		.string()
		.email('Valid email is required')
		.max(255, 'Email must be less than 255 characters'),
	phoneNumber: z.string().max(20, 'Phone number must be less than 20 characters').optional(),
	address: z.string().max(500, 'Address must be less than 500 characters').optional(),
	summary: z.string().max(2000, 'Summary must be less than 2000 characters').optional(),
	skills: z.string().max(1000, 'Skills must be less than 1000 characters').optional(),
	hobbies: z.string().max(500, 'Hobbies must be less than 500 characters').optional(),
});

const updateCVSchema = createCVSchema.partial();

// Helper function to get client IP
const getClientIP = (request: NextRequest): string => {
	return (
		request.headers.get('x-forwarded-for')?.split(',')[0] ||
		request.headers.get('x-real-ip') ||
		'unknown'
	);
};

// Helper function to apply rate limiting
const applyRateLimit = (request: NextRequest, limiter: typeof apiRateLimiter) => {
	const clientIP = getClientIP(request);
	const result = limiter.isRateLimited(clientIP);
	const headers = limiter.getHeaders(clientIP);

	return { result, headers };
};

export async function GET(request: NextRequest) {
	try {
		// Apply rate limiting
		const { result, headers } = applyRateLimit(request, apiRateLimiter);

		if (result.limited) {
			return NextResponse.json(
				{ error: 'Too many requests. Please try again later.' },
				{
					status: 429,
					headers: {
						...headers,
						'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
					},
				},
			);
		}

		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const id = searchParams.get('id');

		// Validate pagination parameters
		if (page < 1 || limit < 1 || limit > 100) {
			return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
		}

		if (id) {
			// Get single CV
			const doc = await databases.getDocument(
				appwriteConfig.databaseId,
				appwriteConfig.cvsCollectionId,
				id,
			);

			const sanitizedDoc = InputSanitizer.sanitizeCVData({
				id: doc.$id,
				title: doc.title || 'Untitled CV',
				firstName: doc.firstName || '',
				lastName: doc.lastName || '',
				email: doc.email || '',
				phoneNumber: doc.phoneNumber || '',
				address: doc.address || '',
				summary: doc.summary || '',
				skills: doc.skills || '',
				hobbies: doc.hobbies || '',
				createdAt: doc.$createdAt,
				updatedAt: doc.$updatedAt,
			});

			return NextResponse.json(sanitizedDoc, { headers });
		}

		// Get CVs with pagination
		const offset = (page - 1) * limit;
		const response = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.cvsCollectionId,
			[Query.orderDesc('$updatedAt'), Query.limit(limit), Query.offset(offset)],
		);

		const documents = response.documents.map((doc) =>
			InputSanitizer.sanitizeCVData({
				id: doc.$id,
				title: doc.title || 'Untitled CV',
				firstName: doc.firstName || '',
				lastName: doc.lastName || '',
				email: doc.email || '',
				phoneNumber: doc.phoneNumber || '',
				address: doc.address || '',
				summary: doc.summary || '',
				skills: doc.skills || '',
				hobbies: doc.hobbies || '',
				createdAt: doc.$createdAt,
				updatedAt: doc.$updatedAt,
			}),
		);

		return NextResponse.json(
			{
				documents,
				total: response.total,
			},
			{ headers },
		);
	} catch (error) {
		logError('API Error:', error);
		return NextResponse.json({ error: 'Failed to fetch CVs' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		// Apply CV creation rate limiting
		const { result, headers } = applyRateLimit(request, cvCreationRateLimiter);

		if (result.limited) {
			return NextResponse.json(
				{ error: 'Too many CV creation attempts. Please try again later.' },
				{
					status: 429,
					headers: {
						...headers,
						'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
					},
				},
			);
		}

		const body = await request.json();

		// Validate input
		const validatedData = createCVSchema.parse(body);

		// Sanitize input
		const sanitizedData = InputSanitizer.sanitizeFormData(validatedData);

		const doc = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cvsCollectionId,
			ID.unique(),
			sanitizedData,
		);

		return NextResponse.json(
			{
				id: doc.$id,
				...sanitizedData,
				createdAt: doc.$createdAt,
				updatedAt: doc.$updatedAt,
			},
			{ headers },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: 'Validation failed',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
					})),
				},
				{ status: 400 },
			);
		}
		logError('API Error:', error);
		return NextResponse.json({ error: 'Failed to create CV' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	try {
		// Apply rate limiting
		const { result, headers } = applyRateLimit(request, apiRateLimiter);

		if (result.limited) {
			return NextResponse.json(
				{ error: 'Too many requests. Please try again later.' },
				{
					status: 429,
					headers: {
						...headers,
						'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
					},
				},
			);
		}

		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'CV ID is required' }, { status: 400 });
		}

		const body = await request.json();

		// Validate input
		const validatedData = updateCVSchema.parse(body);

		// Sanitize input
		const sanitizedData = InputSanitizer.sanitizeFormData(validatedData);

		const doc = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cvsCollectionId,
			id,
			sanitizedData,
		);

		return NextResponse.json(
			{
				id: doc.$id,
				...sanitizedData,
				createdAt: doc.$createdAt,
				updatedAt: doc.$updatedAt,
			},
			{ headers },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					error: 'Validation failed',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
					})),
				},
				{ status: 400 },
			);
		}
		logError('API Error:', error);
		return NextResponse.json({ error: 'Failed to update CV' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		// Apply rate limiting
		const { result, headers } = applyRateLimit(request, apiRateLimiter);

		if (result.limited) {
			return NextResponse.json(
				{ error: 'Too many requests. Please try again later.' },
				{
					status: 429,
					headers: {
						...headers,
						'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
					},
				},
			);
		}

		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'CV ID is required' }, { status: 400 });
		}

		await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.cvsCollectionId, id);

		return NextResponse.json({ success: true }, { headers });
	} catch (error) {
		logError('API Error:', error);
		return NextResponse.json({ error: 'Failed to delete CV' }, { status: 500 });
	}
}
