import { WorkerEntrypoint, RpcTarget } from 'cloudflare:workers';
import jwt, { JwtPayload } from 'jsonwebtoken';

class User extends RpcTarget {
	uid: string;
	env: Env;
	constructor(uid: string, env: Env) {
		super();
		this.uid = uid;
		this.env = env;
	}
	async getProfile() {
		return await this.env.PROFILES.get(this.uid, 'json');
	}
	async setProfile(profile: object) {
		await this.env.PROFILES.put(this.uid, JSON.stringify(profile));
	}
}

export class AuthService extends WorkerEntrypoint {
	env: Env;
	constructor(ctx: ExecutionContext, env: Env) {
		super(ctx, env);
		this.env = env;
	}
	async checkCookie(cookie: string) {
		const { uid } = jwt.verify(cookie, 'key') as JwtPayload;
		const ucookie: Cookie = await this.env.COOKIE_MAP.get(uid);

		if (!ucookie) return { authorized: false };

		return {
			authorized: true,
			user: new User(ucookie, this.env),
		};
	}
	async seed() {
		const user = { uid: 'abc', name: 'john' };
		await this.env.COOKIE_MAP.put(user.uid, user.uid);
		await this.env.PROFILES.put(user.uid, JSON.stringify(user));
		return jwt.sign({ uid: user.uid }, 'key');
	}
}

export default {};
