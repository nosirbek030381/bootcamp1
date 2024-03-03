import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { auth } from 'src/firebase';
import { useAuth } from 'src/hooks/useAuth';

interface AuthContextState {
	user: User | null;
	error: string | null;
	isLoading: boolean;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
	user: null,
	error: '',
	isLoading: false,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [intialLoader, setInitialLoader] = useState<boolean>(true);
	const { isLoading, error, signIn, signUp, logout, user, setUser, setIsLoading } = useAuth();

	const router = useRouter();

	const value = useMemo(
		() => ({
			user,
			error,
			isLoading,
			signUp,
			signIn,
			logout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isLoading, error, user]
	);

	useEffect(
		() =>
			onAuthStateChanged(auth, user => {
				if (user) {
					//Sign up
					setIsLoading(false);
					setUser(user);
				} else {
					// Sign In
					setUser(null);
					setIsLoading(true);
					router.push('/auth');
				}

				setIsLoading(false);
				setInitialLoader(false);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<AuthContext.Provider value={value}>
			{!intialLoader ? children : 'Loading...'}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
