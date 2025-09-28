# **App Name**: Inquisity

## Core Features:

- User Authentication: Secure user authentication via email/password and Google login using Firebase Auth. Registration of new accounts using signup form
- PDF Upload: Allow users to upload PDF documents.
- PDF Storage: Store user-uploaded PDFs in separate sections within Firestore database, as per provided Firebase configuration.
- AI-Powered Q&A: Utilize the Gemini AI 2.5 Flash model (API key: AIzaSyCngs4xOo_SBzKmY-OlAYEGYkPW-T6C8Mk) to provide answers based on the content of user-uploaded PDFs.
- Test Generation: Allow users to generate tests from their uploaded PDFs, utilizing the gemini model to generate multiple-choice questions and answers. Act as tool and return output only when information is availble to the LLM
- Dashboard: The main panel where users can see their account information and uploaded PDF Documents.
- Responsive Design: Ensure the application is responsive and functions smoothly on various devices.

## Style Guidelines:

- Primary color: Saturated blue (#3498DB) to evoke trust and intelligence.
- Background color: Light desaturated blue (#EBF5FB) for a clean, uncluttered feel.
- Accent color: Vivid orange (#E67E22) to highlight key actions and information.
- Headline font: 'Space Grotesk' sans-serif for titles. Body text: 'Inter' sans-serif.
- Use minimalist, clear icons to represent document types and actions.
- Maintain a clean, intuitive layout with clear hierarchy for easy navigation.
- Subtle animations for transitions and feedback to enhance user experience.