type User = {
	id?: number;
	email: string;
	password: string;
	username?: string;
	firstname?: string;
	lastname?: string;
	is_admin?: boolean;
	created_at?: Date;
};

export type { User };
