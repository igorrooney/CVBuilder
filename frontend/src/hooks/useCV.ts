'use client';

import { CVService } from '@/services/cvService';
import { CV } from '@/types/cv';
import { useQuery } from '@tanstack/react-query';

export interface CVData extends CV {}

export function useCV(id: string) {
	return useQuery<CVData>({
		queryKey: ['cv', id],
		queryFn: async () => {
			try {
				return await CVService.getCVById(id);
			} catch (error) {
				if (error instanceof Error) {
					throw error;
				}
				throw new Error('Failed to fetch CV');
			}
		},
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function transformCVToFormData(cv: CVData) {
	return {
		title: cv.title || '',
		firstName: cv.firstName || '',
		lastName: cv.lastName || '',
		email: cv.email || '',
		phoneNumber: cv.phoneNumber || '',
		address: cv.address || '',
		summary: cv.summary || '',
		experience: cv.experience?.map((exp) => ({
			jobTitle: exp.jobTitle || '',
			company: exp.company || '',
			startDate: exp.startDate || '',
			endDate: exp.endDate || '',
			responsibilities: exp.responsibilities || '',
			achievements: exp.achievements || '',
			isCurrent: exp.isCurrent || false,
		})) || [
			{
				jobTitle: '',
				company: '',
				startDate: '',
				endDate: '',
				responsibilities: '',
				achievements: '',
				isCurrent: false,
			},
		],
		education: cv.education?.map((edu) => ({
			institution: edu.institution || '',
			degree: edu.degree || '',
			graduationYear: edu.graduationYear || '',
		})) || [{ institution: '', degree: '', graduationYear: '' }],
		certifications: cv.certifications?.map((cert) => ({
			name: cert.name || '',
			issuingOrganization: cert.issuingOrganization || '',
			issueDate: cert.issueDate || '',
			expiryDate: cert.expiryDate || '',
			credentialId: cert.credentialId || '',
			credentialUrl: cert.credentialUrl || '',
		})) || [
			{
				name: '',
				issuingOrganization: '',
				issueDate: '',
				expiryDate: '',
				credentialId: '',
				credentialUrl: '',
			},
		],
		skills: Array.isArray(cv.skills) ? cv.skills : cv.skills ? cv.skills.split(', ') : [],
		hobbies: cv.hobbies || '',
	};
}
