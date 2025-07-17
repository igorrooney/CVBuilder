import { CV } from '@/types/cv';

interface APIResponse<T> {
	documents?: T[];
	total?: number;
	error?: string;
	details?: unknown;
}

interface SingleCVResponse extends CV {
	error?: string;
}

export class CVService {
	static async getCVs(
		page: number = 1,
		limit: number = 10,
	): Promise<{ documents: CV[]; total: number }> {
		try {
			const isServer = typeof window === 'undefined';
			const baseUrl = isServer ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' : '';
			const response = await fetch(`${baseUrl}/api/cv?page=${page}&limit=${limit}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Please log in to view your CVs');
				}
				throw new Error('Failed to fetch CVs');
			}

			const data: APIResponse<CV> = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			return {
				documents: data.documents || [],
				total: data.total || 0,
			};
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Failed to fetch CVs. Please try again later.');
		}
	}

	static async getCVById(id: string): Promise<CV> {
		try {
			const isServer = typeof window === 'undefined';
			const baseUrl = isServer ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' : '';
			const response = await fetch(`${baseUrl}/api/cv?id=${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Please log in to view this CV');
				}
				if (response.status === 404) {
					throw new Error('CV not found');
				}
				throw new Error('Failed to fetch CV');
			}

			const data: SingleCVResponse = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Failed to fetch CV. Please try again later.');
		}
	}

	static async createCV(cvData: Partial<CV>): Promise<CV> {
		try {
			const isServer = typeof window === 'undefined';
			const baseUrl = isServer ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' : '';
			const response = await fetch(`${baseUrl}/api/cv`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(cvData),
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Please log in to create a CV');
				}
				if (response.status === 400) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Invalid CV data');
				}
				throw new Error('Failed to create CV');
			}

			const data: SingleCVResponse = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Failed to create CV. Please try again later.');
		}
	}

	static async updateCV(id: string, cvData: Partial<CV>): Promise<CV> {
		try {
			const isServer = typeof window === 'undefined';
			const baseUrl = isServer ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' : '';
			const response = await fetch(`${baseUrl}/api/cv?id=${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(cvData),
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Please log in to update this CV');
				}
				if (response.status === 404) {
					throw new Error('CV not found');
				}
				if (response.status === 400) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Invalid CV data');
				}
				throw new Error('Failed to update CV');
			}

			const data: SingleCVResponse = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Failed to update CV. Please try again later.');
		}
	}

	static async deleteCV(id: string): Promise<void> {
		try {
			const isServer = typeof window === 'undefined';
			const baseUrl = isServer ? process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' : '';
			const response = await fetch(`${baseUrl}/api/cv?id=${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Please log in to delete this CV');
				}
				if (response.status === 404) {
					throw new Error('CV not found');
				}
				throw new Error('Failed to delete CV');
			}

			const data = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Failed to delete CV. Please try again later.');
		}
	}

	static async generatePDF(id: string): Promise<Blob> {
		try {
			// First get the CV data
			const cv = await this.getCVById(id);

			// Import the PDF service dynamically to avoid SSR issues
			const { generateBritishCVPDF } = await import('./pdfService');

			// Convert CV to AppwriteCV format for PDF generation
			const appwriteCV = {
				$id: cv.id,
				$collectionId: '',
				$databaseId: '',
				$createdAt: cv.createdAt,
				$updatedAt: cv.updatedAt,
				$permissions: [],
				title: cv.title,
				firstName: cv.firstName || '',
				lastName: cv.lastName || '',
				email: cv.email || '',
				phoneNumber: cv.phoneNumber || '',
				address: cv.address || '',
				summary: cv.summary || '',
				skills: Array.isArray(cv.skills)
					? cv.skills
					: typeof cv.skills === 'string'
						? cv.skills.split(',').map((s) => s.trim())
						: [],
				hobbies: cv.hobbies,
				experience: (cv.experience || []).map((exp) => ({
					$id: '',
					$collectionId: '',
					$databaseId: '',
					$createdAt: '',
					$updatedAt: '',
					$permissions: [],
					jobTitle: exp.jobTitle,
					company: exp.company,
					location: exp.location || '',
					startDate: exp.startDate,
					endDate: exp.endDate || '',
					responsibilities: exp.responsibilities || '',
					achievements: exp.achievements || '',
					isCurrent: exp.isCurrent || false,
				})),
				education: (cv.education || []).map((edu) => ({
					$id: '',
					$collectionId: '',
					$databaseId: '',
					$createdAt: '',
					$updatedAt: '',
					$permissions: [],
					degree: edu.degree,
					institution: edu.institution,
					location: edu.location || '',
					graduationYear: edu.graduationYear,
					gpa: edu.gpa || '',
				})),
				certifications: (cv.certifications || []).map((cert) => ({
					$id: '',
					$collectionId: '',
					$databaseId: '',
					$createdAt: '',
					$updatedAt: '',
					$permissions: [],
					certificationName: cert.name,
					issuedBy: cert.issuingOrganization,
					issueDate: cert.issueDate,
					expiryDate: cert.expiryDate || '',
					credentialId: cert.credentialId || '',
					credentialUrl: cert.credentialUrl || '',
				})),
			};

			// Generate the PDF using the PDF service
			return await generateBritishCVPDF(appwriteCV);
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Failed to generate PDF');
		}
	}
}
