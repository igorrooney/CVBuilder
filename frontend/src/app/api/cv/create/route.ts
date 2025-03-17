import { createSessionClient } from '@/lib/appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { NextResponse } from 'next/server';
import { ID } from 'node-appwrite';

export async function POST(req: Request) {
	try {
		// Get user session
		const { databases, account } = await createSessionClient();
		const userId = (await account.get()).$id;
		if (!userId) {
			return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
		}

		const body = await req.json();
		const {
			firstName,
			lastName,
			email,
			phoneNumber,
			summary,
			skills,
			hobbies,
			experience,
			education,
			certifications,
		} = body;

		// Validate input
		if (!firstName || !lastName || !email || !experience || !education) {
			return NextResponse.json(
				{ success: false, error: 'Missing required fields' },
				{ status: 400 },
			);
		}

		// Create CV
		const cv = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cvsCollectionId,
			ID.unique(),
			{
				userId,
				firstName,
				lastName,
				email,
				phoneNumber,
				summary,
				skills,
				hobbies,
			},
		);

		// Add Work Experience
		for (const job of experience) {
			await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.workExperiencesCollectionId,
				ID.unique(),
				{
					cvId: cv.$id,
					jobTitle: job.jobTitle,
					company: job.company,
					startDate: job.startDate,
					endDate: job.endDate,
					responsibilities: job.responsibilities,
					achievements: job.achievements,
				},
			);
		}

		// Add Education
		for (const edu of education) {
			await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.educationsCollectionId,
				ID.unique(),
				{
					cvId: cv.$id,
					degree: edu.degree,
					institution: edu.institution,
					graduationYear: edu.graduationYear,
				},
			);
		}

		// Add Certifications
		for (const cert of certifications || []) {
			await databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.certificationsCollectionId,
				ID.unique(),
				{
					cvId: cv.$id,
					certificationName: cert.certificationName,
					issuedBy: cert.issuedBy,
					issueDate: cert.issueDate,
				},
			);
		}

		return NextResponse.json({ success: true, cv });
	} catch (e) {
		console.error('CV Creation Error:', e);
		return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 });
	}
}
