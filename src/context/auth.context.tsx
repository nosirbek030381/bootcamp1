import { User } from 'firebase/auth';
import { ReactNode, createContext, useMemo } from 'react';
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
	const { isLoading, error, signIn, signUp, logout, user } = useAuth();

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

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
