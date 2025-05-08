'use client';

import { CV } from '@/types/cv';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedIcon from '@mui/icons-material/Verified';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Typography } from '@mui/material';

interface CVPreviewButtonProps {
	cv: CV;
}

function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	} catch (error) {
		return dateString;
	}
}

export function CVPreviewButton({ cv }: CVPreviewButtonProps) {
	return (
		<div className="flex w-full flex-col gap-6 overflow-hidden p-4">
			{/* Header */}
			<div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="min-w-0">
					<h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
						<PersonIcon className="flex-shrink-0 text-blue-500" />
						<span className="truncate">
							{cv.firstName && cv.lastName ? `${cv.firstName} ${cv.lastName}` : 'No Name'}
						</span>
					</h1>
					<div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
						{cv.email && (
							<span className="flex items-center gap-1 break-all">
								<EmailIcon fontSize="small" className="flex-shrink-0" /> {cv.email}
							</span>
						)}
						{cv.phoneNumber && (
							<span className="flex items-center gap-1">
								<PhoneIcon fontSize="small" className="flex-shrink-0" /> {cv.phoneNumber}
							</span>
						)}
						{cv.address && (
							<span className="flex items-center gap-1">
								<LanguageIcon fontSize="small" className="flex-shrink-0" />
								<span className="break-words">{cv.address}</span>
							</span>
						)}
					</div>
				</div>
				<div className="mt-2 whitespace-nowrap text-xs text-gray-400 sm:mt-0">
					Last updated: {formatDate(cv.updatedAt)}
				</div>
			</div>

			{/* Summary */}
			{cv.summary && (
				<div className="flex items-start gap-2">
					<InfoIcon className="mt-1 flex-shrink-0 text-blue-400" />
					<div className="min-w-0">
						<h2 className="mb-1 font-semibold text-gray-800">Summary</h2>
						<p className="break-words text-gray-700">{cv.summary}</p>
					</div>
				</div>
			)}

			{/* Experience */}
			<div>
				<div className="mb-2 flex items-center gap-2">
					<WorkIcon className="flex-shrink-0 text-blue-400" />
					<h2 className="font-semibold text-gray-800">Experience</h2>
				</div>
				<div className="flex flex-col gap-4">
					{cv.experience && cv.experience.length > 0 ? (
						cv.experience.map((exp, idx) => (
							<div key={idx} className="border-l-4 border-blue-100 pl-4">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
									<div className="min-w-0">
										<div className="truncate font-medium text-gray-900">{exp.jobTitle}</div>
										<div className="truncate text-sm text-gray-700">{exp.company}</div>
									</div>
									<div className="mt-1 whitespace-nowrap text-xs text-gray-500 sm:ml-4 sm:mt-0">
										{formatDate(exp.startDate)} -{' '}
										{exp.endDate ? formatDate(exp.endDate) : 'Present'}
									</div>
								</div>
								{exp.responsibilities && (
									<div className="mt-1 break-words text-sm text-gray-600">
										{exp.responsibilities}
									</div>
								)}
								{exp.achievements && (
									<ul className="ml-5 mt-1 list-disc text-xs text-gray-500">
										{typeof exp.achievements === 'string' ? (
											<li className="break-words">{exp.achievements}</li>
										) : (
											exp.achievements.map((ach, i) => (
												<li key={i} className="break-words">
													{ach}
												</li>
											))
										)}
									</ul>
								)}
							</div>
						))
					) : (
						<div className="text-sm text-gray-400">No experience listed.</div>
					)}
				</div>
			</div>

			{/* Education */}
			<div>
				<div className="mb-2 flex items-center gap-2">
					<SchoolIcon className="flex-shrink-0 text-blue-400" />
					<h2 className="font-semibold text-gray-800">Education</h2>
				</div>
				<div className="flex flex-col gap-4">
					{cv.education && cv.education.length > 0 ? (
						cv.education.map((edu, idx) => (
							<div key={idx} className="border-l-4 border-blue-100 pl-4">
								<div className="min-w-0">
									<div className="truncate font-medium text-gray-900">{edu.degree}</div>
									<div className="truncate text-sm text-gray-700">{edu.institution}</div>
									<div className="text-xs text-gray-500">Graduation Year: {edu.graduationYear}</div>
								</div>
							</div>
						))
					) : (
						<div className="text-sm text-gray-400">No education listed.</div>
					)}
				</div>
			</div>

			{/* Skills */}
			<div>
				<div className="mb-2 flex items-center gap-2">
					<StarIcon className="flex-shrink-0 text-yellow-400" />
					<h2 className="font-semibold text-gray-800">Skills</h2>
				</div>
				{cv.skills ? (
					<div className="flex flex-wrap gap-2">
						{typeof cv.skills === 'string'
							? cv.skills.split(',').map((skill, idx) => (
									<span
										key={idx}
										className="break-words rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
									>
										{skill.trim()}
									</span>
								))
							: cv.skills.map((skill, idx) => (
									<span
										key={idx}
										className="break-words rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
									>
										{skill}
									</span>
								))}
					</div>
				) : (
					<div className="text-sm text-gray-400">No skills listed.</div>
				)}
			</div>

			{/* Languages */}
			{cv.languages && cv.languages.length > 0 && (
				<div>
					<div className="mb-2 flex items-center gap-2">
						<LanguageIcon className="flex-shrink-0 text-green-400" />
						<h2 className="font-semibold text-gray-800">Languages</h2>
					</div>
					<div className="flex flex-wrap gap-2">
						{cv.languages.map((lang, idx) => (
							<span
								key={idx}
								className="break-words rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
							>
								{lang}
							</span>
						))}
					</div>
				</div>
			)}

			{/* Certifications */}
			{cv.certifications && cv.certifications.length > 0 && (
				<div>
					<div className="mb-2 flex items-center gap-2">
						<VerifiedIcon className="flex-shrink-0 text-purple-400" />
						<h2 className="font-semibold text-gray-800">Certifications</h2>
					</div>
					<div className="flex flex-col gap-2">
						{cv.certifications.map((cert, idx) => (
							<div key={idx} className="flex items-start gap-2">
								<VerifiedIcon className="mt-1 flex-shrink-0 text-purple-400" fontSize="small" />
								<div className="min-w-0">
									<div className="truncate font-medium text-gray-900">{cert.name}</div>
									<div className="truncate text-sm text-gray-600">{cert.issuingOrganization}</div>
									<div className="text-xs text-gray-500">
										Issued: {formatDate(cert.issueDate)}
										{cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
									</div>
									{cert.credentialId && (
										<div className="truncate text-xs text-gray-500">ID: {cert.credentialId}</div>
									)}
									{cert.credentialUrl && (
										<a
											href={cert.credentialUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="block truncate text-xs text-blue-600 hover:underline"
										>
											View Credential
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Hobbies */}
			{cv.hobbies && (
				<div>
					<div className="mb-2 flex items-center gap-2">
						<StarIcon className="flex-shrink-0 text-purple-400" />
						<h2 className="font-semibold text-gray-800">Hobbies</h2>
					</div>
					<div className="flex flex-wrap gap-2">
						{typeof cv.hobbies === 'string'
							? cv.hobbies.split(',').map((hobby, idx) => (
									<span
										key={idx}
										className="break-words rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700"
									>
										{hobby.trim()}
									</span>
								))
							: cv.hobbies.map((hobby, idx) => (
									<span
										key={idx}
										className="break-words rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700"
									>
										{hobby}
									</span>
								))}
					</div>
				</div>
			)}
		</div>
	);
}
