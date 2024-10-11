interface Env {
	AUTH_SERVICE: Service<any>;
}
export default {
	async fetch(req, env): Promise<Response> {
		switch (new URL(req.url).pathname) {
			case '/new':
				return new Response(await env.AUTH_SERVICE.seed());
			default:
				let { authorized, user } = await env.AUTH_SERVICE.checkCookie(req.headers.get('Cookie'));
				if (!authorized) return new Response('Not authorized', { status: 403 });
				let profile = await user.getProfile();
				return new Response(`Hello, ${profile.name}!`);
		}
	},
} satisfies ExportedHandler<Env>;
