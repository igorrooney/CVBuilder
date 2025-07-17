'use client';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { BritishCV } from '@/types/british-cv';

// Register fonts
Font.register({
	family: 'Arial',
	fonts: [{ src: '/fonts/Arial.ttf' }, { src: '/fonts/Arial-Bold.ttf', fontWeight: 'bold' }],
});

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: 'Arial',
		fontSize: 11,
		lineHeight: 1.5,
		color: '#222',
	},
	header: {
		marginBottom: 18,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 2,
	},
	title: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 2,
	},
	contactInfo: {
		marginBottom: 8,
	},
	contactText: {
		fontSize: 10,
		marginBottom: 1,
	},
	section: {
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 6,
	},
	personalStatement: {
		marginBottom: 8,
	},
	jobBlock: {
		marginBottom: 10,
	},
	jobTitle: {
		fontWeight: 'bold',
	},
	company: {
		fontWeight: 'normal',
	},
	jobDates: {
		fontSize: 10,
		marginBottom: 2,
	},
	subheading: {
		fontWeight: 'bold',
		marginTop: 2,
		marginBottom: 2,
	},
	bullet: {
		marginLeft: 12,
		marginBottom: 2,
	},
	educationBlock: {
		marginBottom: 8,
	},
	eduInstitution: {
		fontWeight: 'bold',
	},
	eduDates: {
		fontSize: 10,
	},
	eduDegree: {
		fontStyle: 'italic',
	},
	skillCategory: {
		fontWeight: 'bold',
	},
	skillText: {
		marginLeft: 4,
	},
	certBlock: {
		marginBottom: 4,
	},
	assocBlock: {
		marginBottom: 4,
	},
});

interface BritishCVTemplateProps {
	data: BritishCV;
}

export function BritishCVTemplate({ data }: BritishCVTemplateProps) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.name}>{data.personalDetails.fullName}</Text>
					<View style={styles.contactInfo}>
						{data.personalDetails.phone && (
							<Text style={styles.contactText}>{data.personalDetails.phone}</Text>
						)}
						{data.personalDetails.email && (
							<Text style={styles.contactText}>{data.personalDetails.email}</Text>
						)}
						{data.personalDetails.location && (
							<Text style={styles.contactText}>{data.personalDetails.location}</Text>
						)}
						{data.personalDetails.linkedIn && (
							<Text style={styles.contactText}>{data.personalDetails.linkedIn}</Text>
						)}
						{data.personalDetails.website && (
							<Text style={styles.contactText}>{data.personalDetails.website}</Text>
						)}
					</View>
				</View>

				{/* Personal Statement */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Personal statement</Text>
					<Text style={styles.personalStatement}>{data.personalStatement}</Text>
				</View>

				{/* Work Experience */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Work experience</Text>
					{Array.isArray(data.workExperience) && data.workExperience.length > 0 ? (
						data.workExperience.map((exp, index) => (
							<View key={index} style={styles.jobBlock}>
								<Text style={styles.jobTitle}>{exp.position}</Text>
								<Text style={styles.company}>
									{exp.company}, {exp.location}
								</Text>
								<Text style={styles.jobDates}>
									{exp.startDate} – {exp.endDate}
								</Text>
								<Text style={styles.subheading}>Key responsibilities</Text>
								{Array.isArray(exp.responsibilities) &&
									exp.responsibilities.map((resp, idx) => (
										<Text key={idx} style={styles.bullet}>
											• {resp}
										</Text>
									))}
								{Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
									<View>
										<Text style={styles.subheading}>Key achievement</Text>
										{exp.achievements.map((ach, idx) => (
											<Text key={idx} style={styles.bullet}>
												• {ach}
											</Text>
										))}
									</View>
								)}
							</View>
						))
					) : (
						<Text>No work experience listed.</Text>
					)}
				</View>

				{/* Education */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Education</Text>
					{Array.isArray(data.education) && data.education.length > 0 ? (
						data.education.map((edu, index) => (
							<View key={index} style={styles.educationBlock}>
								<Text style={styles.eduInstitution}>
									{edu.institution}, {edu.location}
								</Text>
								<Text style={styles.eduDegree}>{edu.qualification}</Text>
								<Text style={styles.eduDates}>
									{edu.startDate} – {edu.endDate}
								</Text>
								{edu.grade && <Text style={styles.bullet}>• {edu.grade}</Text>}
							</View>
						))
					) : (
						<Text>No education listed.</Text>
					)}
				</View>

				{/* Skills */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Skills</Text>
					{Array.isArray(data.keySkills) && data.keySkills.length > 0 ? (
						data.keySkills.map((skill, idx) => (
							<Text key={idx} style={styles.bullet}>
								• {skill}
							</Text>
						))
					) : (
						<Text>No skills listed.</Text>
					)}
				</View>

				{/* Certifications */}
				{Array.isArray(data.professionalQualifications) &&
					data.professionalQualifications.length > 0 && (
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Certifications</Text>
							{data.professionalQualifications.map((qual, idx) => (
								<Text key={idx} style={styles.certBlock}>
									{qual.name} - {qual.issuer} ({qual.date})
								</Text>
							))}
						</View>
					)}
			</Page>
		</Document>
	);
}
