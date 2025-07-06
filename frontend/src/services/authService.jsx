
export const loginWithGoogle = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error('Login failed');
        return await response.json();
    } catch (error) {
        console.error('Error in loginWithGoogle:', error);
        throw error;
    }
};
